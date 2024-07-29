import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { z } from "zod";
import { HTTPException } from "hono/http-exception";
import { prisma } from "../libs/prisma";
import { escapeBigInt } from "../libs/escape-big-int";
import { checkUserToken } from "../middlewares/check-user-token";

const app = new Hono();

app.get("/", checkUserToken(), async (c) => {
  const user = c.get("user");

  const existingCart = await prisma.cart.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: { items: { include: { product: true } } },
  });

  if (!existingCart) {
    const newCart = await prisma.cart.create({
      data: { userId: user.id },
      include: { items: { include: { product: true } } },
    });

    return c.json({
      message: "Shopping cart data",
      cart: newCart,
    });
  }

  return c.json({
    message: "Shopping cart data",
    cart: escapeBigInt(existingCart),
  });
});

app.delete("/", checkUserToken(), async (c) => {
  const user = c.get("user");

  try {
    const existingCart = await prisma.cart.findFirst({
      where: { userId: user.id },
    });

    const deleteCartItems = await prisma.cartItem.deleteMany({
      where: { cartId: existingCart?.id },
    });

    return c.json({
      message: "Shopping cart has cleared!",
      cart: deleteCartItems,
    });
  } catch (err: any) {
    console.log(err.message);
    throw new HTTPException(401, { message: err.message });
  }
});

app.delete("/:productId", checkUserToken(), async (c) => {
  const productId = c.req.param("productId");

  try {
    const deleteCartItems = await prisma.cartItem.deleteMany({
      where: { productId: productId },
    });

    return c.json({
      message: "Product deleted from carts!",
      cart: deleteCartItems,
    });
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
      return c.json({ message: "Author ID needed" });
    }

    const deletedAuthor = await prisma.author.deleteMany({
      where: { id: paramId },
    });

    if (deletedAuthor == null) {
      c.status(204);
      return c.json({ message: "Book doesn't exists!" });
    }

    return c.json({
      message: `Author with ID: '${paramId}' has been deleted!`,
      deletedBook: deletedAuthor,
    });
  } catch (err: any) {
    console.log(err.message);
    throw new HTTPException(401, { message: err.message });
  }
});
app.post(
  "/add",
  checkUserToken(),
  zValidator(
    "json",
    z.object({
      productId: z.string(),
      quantity: z.number().min(1),
    })
  ),
  async (c) => {
    const user = c.get("user");
    const body = c.req.valid("json");

    const existingCart = await prisma.cart.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    if (!existingCart) {
      c.status(404);
      return c.json({ message: "Shopping cart is unavailable" });
    }

    const checkCartItem = await prisma.cartItem.findFirst({
      where: {
        productId: body.productId,
        cartId: existingCart.id,
      },
    });

    if (checkCartItem) {
      const updatedCart = await prisma.cartItem.update({
        where: {
          id: checkCartItem.id,
        },
        data: {
          quantity: checkCartItem.quantity + body.quantity,
        },
      });

      return c.json({
        message: "Cart updated!",
        cart: updatedCart,
      });
    } else {
      const updatedCart = await prisma.cart.update({
        where: { id: existingCart.id },
        data: {
          items: {
            create: {
              productId: body.productId,
              quantity: body.quantity,
            },
          },
        },
        include: {
          items: true,
        },
      });

      return c.json({
        message: "Product added to the cart!",
        cart: updatedCart,
      });
    }
  }
);

export const carts = app;
