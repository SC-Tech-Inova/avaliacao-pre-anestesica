# Use a imagem oficial do Node.js como base
FROM node:18-alpine

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos package.json e package-lock.json
COPY package*.json ./

# Instale as dependências de produção
RUN npm install --production

# Copie o restante dos arquivos do projeto
COPY . .

# Construa o aplicativo Next.js
RUN npm run build

# Exponha a porta 3000
EXPOSE 3000

# Comando para iniciar o aplicativo em modo de produção
CMD ["npm", "run", "start"]
