# Sistema de Avaliação Pré-Anestésica

Este é um sistema desenvolvido com [Next.js](https://nextjs.org) para gerenciamento de avaliações pré-anestésicas.

## Documentação AWS
Para configuração dos recursos AWS, consulte o arquivo [aws-config.md](aws-config.md)

## Getting Started

Primeiro, inicie o servidor de desenvolvimento:

```bash
npm run dev
```

## Configuração de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```bash
DB_HOST=endpoint-do-rds
DB_USER=usuario
DB_PASSWORD=senha
DB_NAME=nome-do-banco
DB_PORT=5432
```

## Solução para problemas com Git

Se você encontrar erros ao renomear branches como:
```
Rename from '.git/logs/refs/heads/main' to '.git/logs/refs/.tmp-renamed-log' failed.
```

Tente os seguintes passos:

1. Verifique se você já está na branch correta:
   ```bash
   # Verifique a branch atual - se mostrar "* main", você já está na branch correta
   git branch
   ```

2. Se o problema persistir, pode ser relacionado a permissões ou arquivos bloqueados:
   - Feche todos os programas que possam estar acessando arquivos Git (VSCode, terminais, GitHub Desktop)
   - Execute o Git Bash ou PowerShell como administrador
   - Tente criar um commit e enviar ao repositório remoto:
   ```bash
   git add .
   git commit -m "Primeiro commit"
   git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
   git push -u origin main
   ```

3. Caso continue tendo problemas, tente usar o GitHub Desktop para fazer o push inicial, que geralmente resolve problemas de permissão automaticamente

## Gerenciamento de branches Git

### Criando uma nova branch

Para criar e mudar para uma nova branch:

```bash
# Criar e mudar para uma nova branch de uma só vez
git checkout -b nome-da-nova-branch

# OU criar a branch e depois mudar para ela
git branch nome-da-nova-branch
git checkout nome-da-nova-branch
```

Para enviar a nova branch para o repositório remoto:

```bash
git push -u origin nome-da-nova-branch
```

### Listando branches

Para listar todas as branches locais:
```bash
git branch
```

Para listar todas as branches (locais e remotas):
```bash
git branch -a
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
