# Bücherliste (Book List)

Backend API which showing best seller book recommendations to feed your thirsty brain.

## REST API Specification

- Production: `https://api.bucherliste.ridoatmanto.com`
- Local: `http://localhost:3000`

### Books API

| Endpoint           | HTTP     | Description       |
| ------------------ | -------- | ----------------- |
| `/books`           | `GET`    | Get all books     |
| `/books?q=:search` | `GET`    | Search books      |
| `/books/:id`       | `GET`    | Get book by id    |
| `/books`           | `POST`   | Add new book      |
| `/books/:id`       | `DELETE` | Delete book by id |
| `/books/:id`       | `PUT`    | Update book by id |

### Authors API

| Endpoint             | HTTP     | Description         |
| -------------------- | -------- | ------------------- |
| `/authors`           | `GET`    | Get all books       |
| `/authors?q=:search` | `GET`    | Search authors      |
| `/authors/:id`       | `GET`    | Get author by id    |
| `/authors`           | `POST`   | Add new author      |
| `/authors/:id`       | `DELETE` | Delete author by id |
| `/authors/:id`       | `PUT`    | Update author by id |

### Book Authors API

| Endpoint                  | HTTP     | Description               |
| ------------------------- | -------- | ------------------------- |
| `/book-authors`           | `GET`    | Get all book authors      |
| `/book-authors?q=:search` | `GET`    | Search book authors       |
| `/book-authors/:id`       | `GET`    | Get book authors by id    |
| `/book-authors`           | `POST`   | Add new book authors      |
| `/book-authors/:id`       | `DELETE` | Delete book authors by id |
| `/book-authors/:id`       | `PUT`    | Update book authors by id |

## ERD

![ERD](./assets/bucherliste-erd.svg)

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

### Book List

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

### Author List

```json
[
  {
    "id": "author-1",
    "name": "Perry Marshall",
    "createdAt": "2024-06-26T09:36:40.696Z",
    "updatedAt": "2024-06-26T09:36:40.696Z"
  },
  {
    "id": "author-2",
    "name": "Richard Koch",
    "createdAt": "2024-06-26T09:36:40.696Z",
    "updatedAt": "2024-06-26T09:36:40.696Z"
  },
  {
    "id": "author-3",
    "name": "Miles Beckler",
    "createdAt": "2024-06-26T09:36:40.696Z",
    "updatedAt": "2024-06-26T09:36:40.696Z"
  }
]
```

### Book Author List

```json
[
  {
    "id": "clxvn5gqk0000b9zblboqkv4u",
    "bookId": "book-1",
    "authorId": "author-1",
    "createdAt": "2024-06-26T09:36:40.700Z",
    "updatedAt": "2024-06-26T09:36:40.700Z"
  },
  {
    "id": "clxvn5gqk0001b9zby23969p0",
    "bookId": "book-1",
    "authorId": "author-2",
    "createdAt": "2024-06-26T09:36:40.700Z",
    "updatedAt": "2024-06-26T09:36:40.700Z"
  },
  {
    "id": "clxvn5gqk0002b9zbdaid4ipx",
    "bookId": "book-2",
    "authorId": "author-3",
    "createdAt": "2024-06-26T09:36:40.700Z",
    "updatedAt": "2024-06-26T09:36:40.700Z"
  }
]
```

## Futhermore Information

Another detail or something to discuss please contact me on Telegram on [t.me/ridoatmanto](https://t.me/ridoatmanto).

---

Created © 2024 by [Rido Atmanto](https://ridoatmanto.com)
