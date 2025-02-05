/*
  Warnings:

  - A unique constraint covering the columns `[userId,title]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Movie_userId_title_key` ON `Movie`(`userId`, `title`);
