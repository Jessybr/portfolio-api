import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import bcrypt from 'bcrypt'

const adapter = new PrismaBetterSqlite3({
   url: process.env.DATABASE_URL ?? 'file:./dev.db'
})

const prisma = new PrismaClient({ adapter })

const usuario = process.env.MEU_USUARIO
const senha = process.env.SENHA_CRIPTOGRAFADA

async function main() {

    if(!usuario || !senha) {
        throw new Error("Variáveis de ambiente MEU_USUARIO e SENHA_CRIPTOGRAFADA precisam ser definidas no .env")
    }

    const existingUser = await prisma.user.findUnique({
    where: {
        username: usuario
    }
    })

    if (existingUser) {
        console.log('Usuário já existe')
        return
    }

   // criptografar senha
   const hashedPassword = await bcrypt.hash(
      senha,
      10
   )

   // criar usuário
   const user = await prisma.user.create({
      data: {
         username: usuario,
         password: hashedPassword
      }
   })

   console.log(user)
}

main()
   .catch((error) => {
      console.error(error)
   })
   .finally(async () => {
      await prisma.$disconnect()
   })
