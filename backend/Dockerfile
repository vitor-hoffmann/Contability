# Usa a imagem Node.js versão 18 como base (Alpine é uma versão mais leve)
FROM node:22-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de dependências (package.json e package-lock.json)
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Instala o Prisma globalmente
RUN npm install -g prisma

# Copia o restante dos arquivos da aplicação para o contêiner
COPY . .

# Copia o diretório prisma (que contém schema.prisma)
COPY prisma ./prisma

# Gera o cliente Prisma
RUN npx prisma generate

# Exponha a porta que a aplicação vai usar
EXPOSE 5000

# Comando para rodar as migrações do Prisma e iniciar o servidor
CMD ["npm run start:dev"]
