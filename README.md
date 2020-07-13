This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Install dependencies
First, install the dependencies
```bash
npm install
```

### Setup database

Then, you will need to setup the database. This app uses a Postgresql database. You can use a local installation. Alternatively, you can also run Postgresql on Docker.

A docker-compose file is already configured in the case you would like to run Postgresql on Docker. In this case, just run the following command:
```bash
docker-compose up -d
```

After making sure Postgresql is running, run the migrations to configure the database

```bash
npx prisma migrate up --experimental
```

### Run server

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

If you need help installing Docker, check the following links:
- [Installing Docker](https://docs.docker.com/engine/install/)
- [Installing Docker Compose](https://docs.docker.com/compose/install/)


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
