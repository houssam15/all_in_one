import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export async function getMenu(){
      return await prisma.moduleMenu.findMany();
}