import { zValidator } from "@hono/zod-validator";

import { z } from "zod";
import { HTTPException } from "hono/http-exception";
import { prisma } from "../libs/prisma";
import { Hono } from "hono";
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
      include: {
        items: {
          include: { product: true },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
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

    const emptyPrice = await prisma.cart.update({
      where: {
        id: existingCart.id,
      },
      data: {
        totalCartPrice: 0,
      },
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

app.delete("/:cartItemId", checkUserToken(), async (c) => {
  const cartItemId = c.req.param("cartItemId");

  try {
    const cartItem = await prisma.cartItem.findFirst({
      where: { id: cartItemId },
    });

    const deleteCartItems = await prisma.cartItem.deleteMany({
      where: { id: cartItemId },
    });

    let latestTotal = 0;

    const cartItems = await prisma.cartItem.findMany({
      where: { cartId: cartItem?.cartId },
    });
    cartItems.forEach((item) => {
      latestTotal += item.totalItemPrice;
    });

    const updatePrice = await prisma.cart.update({
      where: {
        id: cartItem?.cartId,
      },
      data: {
        totalCartPrice: latestTotal,
      },
    });
    console.log(updatePrice);

    return c.json({
      message: "Product deleted from carts!",
      cart: deleteCartItems,
    });
  } catch (err: any) {
    console.log(err.message);
    throw new HTTPException(401, { message: err.message });
  }
});

app.post(
  "/",
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

    const product = await prisma.product.findFirst({
      where: { id: body.productId },
    });

    if (checkCartItem) {
      const totalItemPrice =
        (checkCartItem.quantity + parseInt(body.quantity)) * product?.price;
      const updatedCart = await prisma.cartItem.update({
        where: {
          id: checkCartItem.id,
        },
        data: {
          quantity: checkCartItem.quantity + body.quantity,
          totalItemPrice: totalItemPrice,
        },
      });

      let latestItemTotal = 0;

      const cartItems = await prisma.cartItem.findMany({
        where: { cartId: existingCart.id },
      });
      cartItems.forEach((item) => {
        latestItemTotal += item.totalItemPrice;
      });

      const updatePrice = await prisma.cart.update({
        where: {
          id: existingCart.id,
        },
        data: {
          totalCartPrice: latestItemTotal,
        },
      });
      console.log(updatePrice);

      return c.json({
        message: "Cart updated!",
        cart: updatedCart,
      });
    } else {
      let latestItemTotal = body.quantity * product?.price;
      const updatedCart = await prisma.cart.update({
        where: { id: existingCart.id },
        data: {
          items: {
            create: {
              productId: body.productId,
              quantity: body.quantity,
              totalItemPrice: latestItemTotal,
            },
          },
        },
        include: {
          items: true,
        },
      });

      let latestTotal = 0;

      const cartItems = await prisma.cartItem.findMany({
        where: { cartId: existingCart.id },
      });
      cartItems.forEach((item) => {
        latestTotal += item.totalItemPrice;
      });

      const updatePrice = await prisma.cart.update({
        where: {
          id: existingCart.id,
        },
        data: {
          totalCartPrice: latestTotal,
        },
      });
      console.log(updatePrice);

      return c.json({
        message: "Product added to the cart!",
        cart: updatedCart,
      });
    }
  }
);

export const carts = app;
