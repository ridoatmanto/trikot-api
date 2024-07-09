# trikot-api
_Backend API for Trikot (Jersey)_ for Trikot Front End App [https://github.com/ridoatmanto/trikot](https://github.com/ridoatmanto/trikot).

## REST API Specification

- Production: `https://api.trikot.ridoatmanto.com`
- Local: `http://localhost:3000`

### Orders API

| Endpoint  | HTTP   | Description    |
| --------- | ------ | -------------- |
| `/orders` | `GET`  | Get all orders |
| `/orders` | `POST` | Add new order  |

### Carts API

| Endpoint     | HTTP     | Description       |
| ------------ | -------- | ----------------- |
| `/carts`     | `GET`    | Get all carts     |
| `/carts`     | `POST`   | Add new cart      |
| `/carts/:id` | `DELETE` | Delete cart by id |
| `/carts/:id` | `PUT`    | Update cart by id |

### Products API

| Endpoint        | HTTP  | Description       |
| --------------- | ----- | ----------------- |
| `/products`     | `GET` | Get all products  |
| `/products/:id` | `GET` | Get product by id |

### Users API

| Endpoint  | HTTP   | Description                                           |
| --------- | ------ | ----------------------------------------------------- |
| `/login`  | `POST` | Logged in into application <br/> with email& password |
| `/logout` | `GET`  | Loggged out from application                          |

## ERD

![ERD](./assets/trikot-erd.svg)

## Tech Stack

- Hono
- Bun
- TypeScript
- Docker
- PostgreSQL
- Prisma
- Render
- Neon.tech
- Doppler Env
- CloudFlare
- VSCode

## How to run this project (with `bun`)

To install dependencies:

```sh
bun install
```

To run App:

- Start project `bun dev`. Then open `http://localhost:3000`
- Create migration from existing schema `bun db:migrate:dev`.
- Applying migration just created `bun db:migrate:deploy`.
- Generate prisma client needed with `bun db:generate`.
- Running migration to init table `bun db:seed`.

## Runing App With Dockerfile

Build image for whole backend API

```sh
docker build -t demo-backend .
```

Run `docker-compose.yml` with:

```sh
docker compose up -d
```

## Sample JSON output preview:

### Product List

```json
[
  {
    "id": "book-1",
    "title": "80/20 Sales and Marketing: The Definitive Guide to Working Less and Making More",
    "description": "Stop \"Just Getting By\"... Master the 80/20 Rule. Apply the Pareto Principle to Business And Make More Money Without More Work. When you know how to walk into any situation and see the 80/20's, the 80/20 Principle can solve almost ANY conversion problem. Any traffic problem. Any money problem. Perry Marshall has something original and extremely useful to say,because he has thought profoundly about the 80/20 Principle. He has come up with some original insights that are literally priceless. You really can change your business and your life.",
    "published": "Aug 13, 2013",
    "cover": "80-20-sales-and-marketing.png",
    "createdAt": "2024-06-26T09:36:40.681Z",
    "updatedAt": "2024-06-26T09:36:40.681Z"
  },
  {
    "id": "book-2",
    "title": "Sales Funnel Sabotage: Are These 10 Common Mistakes Holding Your Business Back? (The Internet Marketing Starter Pack Book 3)",
    "description": "Are your sales funnels underperforming? Are you struggling to identify what's holding your business back? Uncover the secrets to maximizing your sales funnel effectiveness with \"Sales Funnel Sabotage\". This insightful book shines a spotlight on the pitfalls that could be costing your business BIG, and reveals how you can turn the tables on the common mistakes entrepreneurs often make.",
    "published": "July 24, 2023",
    "cover": "sales-funnel-sabotage.png",
    "createdAt": "2024-06-26T09:36:40.681Z",
    "updatedAt": "2024-06-26T09:36:40.681Z"
  }
]
```

## Futhermore Information

Another detail or something to discuss please contact me on Telegram on [t.me/ridoatmanto](https://t.me/ridoatmanto).

---

Created © 2024 by [Rido Atmanto](https://ridoatmanto.com)
