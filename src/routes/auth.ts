import { zValidator } from "@hono/zod-validator";

import { z } from "zod";
import { prisma } from "../libs/prisma";
import { Hono } from "hono";
import { createToken } from "../libs/jwt";
import { checkUserToken } from "../middlewares/check-user-token";
import { verifyPassword } from "../libs/password";

const app = new Hono();

app.post(
  "/login",
  zValidator(
    "json",
    z.object({
      email: z.string(),
      password: z.string(),
    })
  ),
  async (c) => {
    const body = c.req.valid("json");

    const foundUser = await prisma.user.findUnique({
      where: { email: body.email },
      include: { password: { select: { hash: true } } },
    });

    if (!foundUser) {
      c.status(404);
      return c.json({ message: "Cannot login because user not found" });
    }

    if (!foundUser?.password?.hash) {
      c.status(400);
      return c.json({
        message: "Cannot login because user doesn't have a password",
      });
    }

    const validPassword = await verifyPassword(
      foundUser.password.hash,
      body.password
    );

    if (!validPassword) {
      c.status(400);
      return c.json({
        message: "Password incorrect",
      });
    }

    const token = await createToken(foundUser.id);

    if (!token) {
      c.status(400);
      return c.json({ message: "Token failed to create" });
    }

    return c.json({
      message: "Login successful",
      token,
    });
  }
);

app.get("/me", checkUserToken(), async (c) => {
  const user = c.get("user");

  const userData = await prisma.user.findUnique({
    where: { id: user.id },
  });

  return c.json({
    message: "User data",
    user: userData,
  });
});

app.get("/logout", checkUserToken(), async (c) => {
  // Note: might be unnecessary since this is token-based auth
  // We can just remove the token on the client or frontend
  return c.json({
    message: "Logout",
  });
});

export const auth = app;
