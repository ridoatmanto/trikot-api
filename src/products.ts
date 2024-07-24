import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { prisma } from "./libs/prisma";
import { escapeBigInt } from "./libs/escapeBigInt";

const app = new Hono();

// app.get("/", async (c) => {
//   try {
//     const searchQuery = c.req.query("q");

//     if (!searchQuery) {
//       const allProducts = await prisma.product.findMany({
//         where: {},
//         orderBy: [{ createdAt: "desc" }],
//       });

//       return c.json(escapeBigInt(allProducts));
//     }

//     const searchProduct = await prisma.product.findMany({
//       where: {
//         name: {
//           contains: searchQuery,
//           mode: "insensitive",
//         },
//       },
//     });

//     return c.json(escapeBigInt(searchProduct));
//   } catch (err: any) {
//     console.log(err.message);
//     throw new HTTPException(401, { message: err.message });
//   }
// });
app.get("/", async (c) => {
  const products = await prisma.product.findMany();

  return c.json(escapeBigInt(products));
});

app.get("/:slug", async (c) => {
  try {
    const slugParam = c.req.param("slug");

    if (!slugParam) {
      c.status(204);
      return c.json({ message: "Product ID needed" });
    }

    const product = await prisma.product.findFirst({
      where: { slug: slugParam },
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
