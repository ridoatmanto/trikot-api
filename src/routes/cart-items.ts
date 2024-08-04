import { prisma } from "../libs/prisma";
import { Hono } from "hono";
import { checkUserToken } from "../middlewares/check-user-token";

const app = new Hono();

app.get("/:cartItemId", checkUserToken(), async (c) => {
  const cartItemId = c.req.param("cartItemId");

  const cartItem = await prisma.cartItem.findFirst({
    where: { id: cartItemId },
  });

  return c.json({
    message: "Shopping cart data",
    cartItem: cartItem,
  });
});

export const cartItems = app;
