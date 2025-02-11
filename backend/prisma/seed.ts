import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const hashedPassword = await argon2.hash('Password123');

  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      password: hashedPassword,
    },
  });

  console.log(`✅ User created: ${user.email}`);

  // Movie titles
  const movieTitles = [
    'Inception',
    'The Dark Knight',
    'Interstellar',
    'The Matrix',
    'Titanic',
    'Avengers: Endgame',
    'The Godfather',
    'Forrest Gump',
    'The Shawshank Redemption',
    'Pulp Fiction',
    'Gladiator',
    'The Lion King',
    'Jurassic Park',
    'The Lord of the Rings',
    'Star Wars: A New Hope',
    'The Silence of the Lambs',
    "Schindler's List",
    'Saving Private Ryan',
    'The Departed',
    'Fight Club',
    'Goodfellas',
  ];

  for (const title of movieTitles) {
    try {
      await prisma.movie.create({
        data: { title, userId: user.id },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        console.log(`⚠️ Skipping duplicate movie: ${title}`);
      } else {
        throw error;
      }
    }
  }

  console.log(`🎬 21 movies added for ${user.email}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
