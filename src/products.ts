import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { prisma } from "./libs/prisma";

const app = new Hono();

app.get("/", async (c) => {
  try {
    // const searchQuery = c.req.query("q");

    // if (!searchQuery) {
    //   const allBooks = await prisma.book.findMany({
    //     where: {},
    //     orderBy: [{ created_at: "desc" }],
    //   });

    //   return c.json(allBooks);
    // }

    // const searchBook = await prisma.book.findMany({
    //   where: {
    //     title: {
    //       contains: searchQuery,
    //       mode: "insensitive",
    //     },
    //   },
    // });

    // return c.json(searchBook);
    const products = [
      {
        id: 1,
        name: "BORUSSIA DORTMUND HOME JERSEY 2024-2025",
        image: "dortmund-jersey-home-2024-2025.png",
        price: 157000,
        description:
          "From kit supplier PUMA\nPuma cat and BVB emblem on the chest\n100% polyester\n95 % recycled polyester thanks to Puma's RE:FIBRE process\nFlocked jerseys are delivered with GLS logo.",
        createdAt: "2024-11-28 15:33:12",
        updatedAt: "2024-11-28 15:33:12",
      },
      {
        id: 2,
        name: "BORUSSIA DORTMUND HOME JERSEY 2023-2024",
        image: "dortmund-jersey-home-2023-2024.png",
        price: 150000,
        description:
          "From kit supplier PUMA\nPuma cat and BVB emblem on the chest\n100% polyester\n95 % recycled polyester thanks to Puma's RE:FIBRE process\nFlocked jerseys are delivered with GLS logo.",
        createdAt: "2024-11-28 15:33:12",
        updatedAt: "2024-11-28 15:33:12",
      },
      {
        id: 3,
        name: "BORUSSIA DORTMUND AWAY JERSEY 2024-2025",
        image: "dortmund-jersey-away-2024-2025.png",
        price: 127000,
        description:
          "From kit supplier PUMA\nPuma cat and BVB emblem on the chest\n100% polyester\n95 % recycled polyester thanks to Puma's RE:FIBRE process\nFlocked jerseys are delivered with GLS logo.",
        createdAt: "2024-11-28 15:33:12",
        updatedAt: "2024-11-28 15:33:12",
      },
      {
        id: 4,
        name: "BORUSSIA DORTMUND SHORT JERSEY 2023-2024",
        image: "dortmund-short-2023-2024.png",
        price: 107000,
        description:
          "From kit supplier PUMA\nPuma cat and BVB emblem on the chest\n100% polyester\n95 % recycled polyester thanks to Puma's RE:FIBRE process\nFlocked jerseys are delivered with GLS logo.",
        createdAt: "2024-11-28 15:33:12",
        updatedAt: "2024-11-28 15:33:12",
      },
      {
        id: 5,
        name: "BORUSSIA DORTMUND GOALKEEPER JERSEY 2024-2025",
        image: "goalkeeper-jersey-2024-2025.png",
        price: 137000,
        description:
          "From kit supplier PUMA\nPuma cat and BVB emblem on the chest\n100% polyester\n95 % recycled polyester thanks to Puma's RE:FIBRE process\nFlocked jerseys are delivered with GLS logo.",
        createdAt: "2024-11-28 15:33:12",
        updatedAt: "2024-11-28 15:33:12",
      },
      {
        id: 6,
        name: "BORUSSIA DORTMUND SHORT JERSEY 2024-2025",
        image: "dortmund-short-2024-2025.png",
        price: 127000,
        description:
          "From kit supplier PUMA\nPuma cat and BVB emblem on the chest\n100% polyester\n95 % recycled polyester thanks to Puma's RE:FIBRE process\nFlocked jerseys are delivered with GLS logo.",
        createdAt: "2024-11-28 15:33:12",
        updatedAt: "2024-11-28 15:33:12",
      },
    ];

    return c.json(products);
  } catch (err: any) {
    console.log(err.message);
  }
});

app.get("/:id", async (c) => {
  try {
    const paramId = c.req.param("id");

    if (!paramId) {
      c.status(204);
      return c.json({ message: "Book ID needed" });
    }

    const book = await prisma.book.findUnique({
      where: { id: paramId },
    });

    if (book == null) {
      c.status(204);
      return c.json({ message: "Book doesn't exists!" });
    }

    return c.json(book);
  } catch (err: any) {
    console.log(err.message);
    throw new HTTPException(401, { message: err.message });
  }
});

app.post("/", async (c) => {
  const body = await c.req.json();
  try {
    const book = await prisma.book.create({
      data: {
        title: body.title,
        description: body.description,
        published: body.published,
        cover: body.title + ".png",
      },
    });

    return c.json(book);
  } catch (err: any) {
    console.log(err.message);
    throw new HTTPException(401, { message: err.message });
  }
});

app.delete("/:id", async (c) => {
  const paramId = c.req.param("id");

  try {
    if (!paramId) {
      c.status(204);
      return c.json({ message: "Book ID needed" });
    }

    const deletedBook = await prisma.book.deleteMany({
      where: { id: paramId },
    });

    if (deletedBook == null) {
      c.status(204);
      return c.json({ message: "Book doesn't exists!" });
    }

    return c.json({
      message: `Book with ID: '${paramId}' has been deleted!`,
      deletedBook: deletedBook,
    });
  } catch (err: any) {
    console.log(err.message);
    throw new HTTPException(401, { message: err.message });
  }
});

app.put("/:id", async (c) => {
  const paramId = c.req.param("id");
  const body = await c.req.json();

  if (!paramId) {
    return c.json({ message: "Book ID param needed before update!" });
  }

  const book = await prisma.book.findUnique({
    where: { id: paramId },
  });

  if (book == null) {
    c.status(204);
    return c.json({ message: "Book doesn't exists!" });
  }

  const updatedBook = await prisma.book.update({
    where: {
      id: paramId,
    },
    data: {
      title: body.title,
      description: body.description,
      published: body.published,
      cover: body.cover,
    },
  });

  return c.json({
    message: `Book with ID: ${paramId} has been updated!`,
    updatedBook: updatedBook,
  });
});

export const products = app;
