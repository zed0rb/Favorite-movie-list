// @ts-nocheck
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/auth/auth.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { ForbiddenException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: jest.Mocked<PrismaService>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: { signAsync: jest.fn().mockResolvedValue('mockToken') },
        },
        {
          provide: ConfigService,
          useValue: { get: jest.fn().mockReturnValue('mockSecret') },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(
      PrismaService,
    ) as jest.Mocked<PrismaService>;
    jwtService = module.get<JwtService>(JwtService) as jest.Mocked<JwtService>;
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should hash password and create user', async () => {
    const hashSpy = jest
      .spyOn(argon, 'hash')
      .mockResolvedValue('hashedPassword');
    prismaService.user.create.mockResolvedValue({
      id: 1,
      email: 'test@example.com',
    });

    const result = await authService.signup({
      email: 'test@example.com',
      password: 'password',
    });

    expect(hashSpy).toHaveBeenCalled();
    expect(prismaService.user.create).toHaveBeenCalledWith({
      data: { email: 'test@example.com', password: 'hashedPassword' },
    });
    expect(result).toHaveProperty('access_token', 'mockToken');
  });

  it('should throw an error if user already exists', async () => {
    prismaService.user.create.mockRejectedValue({
      code: 'P2002',
    });

    await expect(
      authService.signup({ email: 'test@example.com', password: 'password' }),
    ).rejects.toThrow(ForbiddenException);
  });

  it('should return token for valid user in signin', async () => {
    jest.spyOn(argon, 'verify').mockResolvedValue(true);
    prismaService.user.findUnique.mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: 'hashedPassword',
    });

    const result = await authService.signin({
      email: 'test@example.com',
      password: 'password',
    });

    expect(result).toHaveProperty('access_token', 'mockToken');
  });

  it('should throw error if password is incorrect', async () => {
    jest.spyOn(argon, 'verify').mockResolvedValue(false);
    prismaService.user.findUnique.mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: 'hashedPassword',
    });

    await expect(
      authService.signin({ email: 'test@example.com', password: 'wrong' }),
    ).rejects.toThrow(ForbiddenException);
  });

  it('should throw error if user does not exist', async () => {
    prismaService.user.findUnique.mockResolvedValue(null);

    await expect(
      authService.signin({
        email: 'notfound@example.com',
        password: 'password',
      }),
    ).rejects.toThrow(ForbiddenException);
  });
});
