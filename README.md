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

Setup the `.env` inside prisma by copying the example:

```bash
cp prisma/.env.example prisma/.env
```

After making sure Postgresql is running, run the migrations to configure the database

```bash
npx prisma migrate up --experimental
```

### Setup other variables

For now you need to setup Rollout, Pagarme and Hubspot as well as other things (we shall remove some of these dependencies on development environment later, but we haven't yet).

So in order to configure your local development environment you need to setup a `.env.local` file, which you can do by copying `.env.local.example` and replacing the placeholders with actual value.


### Run server

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.
