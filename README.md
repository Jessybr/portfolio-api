# 💼 Gerenciador de Portfólio

> API REST para gerenciar as informações de um portfólio de desenvolvedor, incluindo projetos, dados pessoais, contatos, tecnologias e soft skills.

<p align="center">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img alt="Express" src="https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img alt="SQLite" src="https://img.shields.io/badge/SQLite-Database-003B57?style=for-the-badge&logo=sqlite&logoColor=white" />
  <img alt="Prisma" src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img alt="JWT" src="https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
  <img alt="Swagger" src="https://img.shields.io/badge/Swagger-Docs-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" />
  <img alt="Jest" src="https://img.shields.io/badge/Jest-Tests-C21325?style=for-the-badge&logo=jest&logoColor=white" />
  <img alt="Docker" src="https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img alt="License MIT" src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
  <img alt="Status" src="https://img.shields.io/badge/Status-Em%20desenvolvimento-blue?style=for-the-badge" />
</p>

<p align="center">
  <a href="https://github.com/Jessybr/portfolio-api/actions/workflows/ci.yml">
    <img alt="CI" src="https://github.com/Jessybr/portfolio-api/actions/workflows/ci.yml/badge.svg" />
  </a>
  <a href="https://github.com/Jessybr/portfolio-api/actions/workflows/docker.yml">
    <img alt="Docker Build" src="https://github.com/Jessybr/portfolio-api/actions/workflows/docker.yml/badge.svg" />
  </a>
</p>

---

## 📌 Sobre o Projeto

O **Gerenciador de Portfólio** é uma API REST criada para centralizar e administrar os dados exibidos em um portfólio de desenvolvedor. Com ela, é possível manter projetos, informações pessoais, contatos, tecnologias, categorias e soft skills de forma organizada e consumível por uma aplicação frontend.

A ideia do projeto é separar o conteúdo do portfólio da interface visual, permitindo que as informações sejam atualizadas por uma área administrativa protegida por autenticação via token JWT. Assim, o portfólio se torna mais dinâmico, escalável e fácil de manter. 🚀

---

## ✨ Principais Funcionalidades

- 🔐 Login administrativo com autenticação via **JWT Token**.
- 👤 Consulta e atualização de informações pessoais do perfil.
- 📬 Gerenciamento de dados de contato, como e-mail, celular, LinkedIn e GitHub.
- 📁 CRUD de projetos do portfólio.
- ✅ Ativação e desativação de projetos publicados.
- 🧩 Associação de projetos com tecnologias e categorias.
- 🛠️ CRUD de tecnologias/skills técnicas.
- 🧠 CRUD de soft skills.
- 📚 Documentação interativa com **Swagger UI**.
- 🧪 Testes automatizados com **Jest** e **Supertest**.
- 🐳 Execução com **Docker** e **Docker Compose**.
- 🔄 Workflows de **CI/CD** com GitHub Actions.

---

## 🧰 Tecnologias Utilizadas

- **Node.js 22**
- **JavaScript ES Modules**
- **Express 5**
- **SQLite**
- **Prisma ORM**
- **JWT**
- **Bcrypt**
- **Swagger / OpenAPI**
- **Jest**
- **Supertest**
- **Docker**
- **GitHub Actions**

---

## ⚙️ Pré-requisitos e Como Rodar o Projeto

Antes de começar, tenha instalado na sua máquina:

- [Git](https://git-scm.com/)
- [Node.js 22+](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) e Docker Compose, caso queira rodar via container

### 🔽 1. Clone o repositório

```bash
git clone https://github.com/Jessybr/portfolio-api.git
cd portfolio-api
```

### 🔐 2. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="file:./database/dev.db"
JWT_SECRET="sua-chave-secreta"
MEU_USUARIO="admin"
SENHA_CRIPTOGRAFADA="sua-senha-admin"
PORT=3000
```

> Observação: a senha informada em `SENHA_CRIPTOGRAFADA` é usada pelo seed para criar o usuário administrador com hash via bcrypt.

### 📦 3. Instale as dependências

```bash
npm install
```

### 🗄️ 4. Prepare o Prisma e o banco de dados

```bash
npx prisma generate
npx prisma migrate dev
node prisma/seed.js
```

### ▶️ 5. Rode a API localmente

```bash
npm start
```

A API ficará disponível em:

```text
http://localhost:3000
```

A documentação Swagger estará disponível em:

```text
http://localhost:3000/api-docs
```

---

## 🐳 Rodando com Docker

Também é possível subir a aplicação com Docker Compose:

```bash
docker compose up --build
```

A aplicação será exposta na porta `3000`:

```text
http://localhost:3000
```

O `docker-compose.yml` monta a pasta `./database` como volume para manter o banco SQLite persistente entre execuções. 📦

Para parar os containers:

```bash
docker compose down
```

---

## 🧪 Rodando os Testes

Execute a suíte de testes com:

```bash
npm test
```

O projeto utiliza **Jest** com suporte a ES Modules e **Supertest** para testar os fluxos HTTP da API.

---

## 📚 Documentação da API

A API possui documentação interativa com Swagger UI:

```text
http://localhost:3000/api-docs
```

Principais recursos disponíveis:

| Recurso | Rotas principais |
| --- | --- |
| Autenticação | `POST /login` |
| Perfil | `GET /perfil`, `PATCH /perfil` |
| Projetos | `GET /project`, `POST /project`, `PATCH /project/:id`, `DELETE /project/:id` |
| Projetos ativos | `GET /project/active`, `PATCH /project/active/:id` |
| Tecnologias | `GET /technology`, `POST /technology`, `DELETE /technology/:id` |
| Categorias | `GET /category`, `POST /category`, `DELETE /category/:id` |
| Soft Skills | `GET /softSkills`, `POST /softSkill`, `DELETE /softSkill/:id` |

Rotas de criação, edição e exclusão exigem autenticação via Bearer Token. 🔒

---

## 🤝 Como Contribuir

Contribuições são muito bem-vindas! Para colaborar:

1. Faça um fork do projeto.
2. Crie uma branch para sua feature ou correção:

```bash
git checkout -b minha-feature
```

3. Faça suas alterações seguindo o padrão do projeto.
4. Rode os testes:

```bash
npm test
```

5. Faça o commit das mudanças:

```bash
git commit -m "feat: adiciona minha feature"
```

6. Envie sua branch para o GitHub:

```bash
git push origin minha-feature
```

7. Abra um Pull Request descrevendo o que foi alterado.

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<p align="center">
  Feito com 💙 para facilitar a manutenção de portfólios de desenvolvedores.
</p>
