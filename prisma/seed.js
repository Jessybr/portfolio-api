import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import bcrypt from 'bcrypt'

const adapter = new PrismaBetterSqlite3({
   url: process.env.DATABASE_URL ?? 'file:./dev.db'
})

const prisma = new PrismaClient({ adapter })

const user = process.env.MEU_USUARIO
const senha = process.env.SENHA_CRIPTOGRAFADA

async function main() {
    await createUser()
    await createPerfil()
}

async function createUser() {
    if(!user || !senha) {
        throw new Error("Variáveis de ambiente MEU_USUARIO e SENHA_CRIPTOGRAFADA precisam ser definidas no .env")
    }

    const existingUser = await prisma.user.findUnique({
    where: {
        username: user
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
            username: user,
            password: hashedPassword
        }
    })
}

async function createPerfil() {
    const existingPerfil = await prisma.perfil.findUnique({
        where: {
            id: 1
        }
    })

    if(existingPerfil) {
        console.log('O perfil já foi criado, basta edita-lo agora')
        return
    }

    await prisma.perfil.create({
        data: {
            nome_completo: "Nome aqui",
            email: "email@exemplo.com",
            celular: "11999999999",
            linkedin_url: "https://www.linkedin.com/in/seu-perfil",
            github_url: "https://github.com/seu-usuario",
            curriculo_src: "https://link-para-seu-curriculo.com/curriculo.pdf",
            foto_src: "https://link-para-sua-foto.com/foto.jpg"
        }
    })
}

main()
   .catch((error) => {
      console.error(error)
   })
   .finally(async () => {
      await prisma.$disconnect()
   })
