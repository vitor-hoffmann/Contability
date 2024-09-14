# Usa a imagem Node.js versão 18 como base (Alpine é uma versão mais leve)
FROM node:18-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o arquivo de pacotes (package.json e package-lock.json)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos da aplicação para o contêiner
COPY . .

# Exponha a porta 3000
EXPOSE 3000

# Comando para iniciar o servidor de desenvolvimento
CMD ["npm", "run", "dev"]
