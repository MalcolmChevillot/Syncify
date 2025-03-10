-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_userId_friendId_fkey" FOREIGN KEY ("userId", "friendId") REFERENCES "Point"("userId", "friendId") ON DELETE RESTRICT ON UPDATE CASCADE;
