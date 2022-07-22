# prisma-reproducible-example

## Run

Create a `.env` file and provide a `DATABASE_URL` environment variable

```bash
npm i
npm run prisma:generate
npm run prisma:migrate-deploy
npm start
```

## Setup Demo

1. Create a `.env` file and provide a `DATABASE_URL` environment variable
2. Create you demo prisma schema in `prisma/schema.prisma`
3. Write your code resulting in the bug you want to showcase in `src/index.ts`
