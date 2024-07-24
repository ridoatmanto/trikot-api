import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { prisma } from "./libs/prisma";
import { escapeBigInt } from "./libs/escapeBigInt";

const app = new Hono();

app.get("/", async (c) => {
  try {
    const searchQuery = c.req.query("q");

    if (!searchQuery) {
      const allProducts = await prisma.product.findMany({
        where: {},
        orderBy: [{ createdAt: "desc" }],
      });

      return c.json(escapeBigInt(allProducts));
    }

    const searchProduct = await prisma.product.findMany({
      where: {
        name: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
    });

    return c.json(escapeBigInt(searchProduct));
  } catch (err: any) {
    console.log(err.message);
  }
});

app.get("/:id", async (c) => {
  try {
    const paramId = c.req.param("id");

    if (!paramId) {
      c.status(204);
      return c.json({ message: "Product ID needed" });
    }

    const product = await prisma.product.findUnique({
      where: { id: paramId },
    });

    if (product == null) {
      c.status(204);
      return c.json({ message: "Product doesn't exists!" });
    }

    return c.json(escapeBigInt(product));
  } catch (err: any) {
    console.log(err.message);
    throw new HTTPException(401, { message: err.message });
  }
});

export const products = app;
