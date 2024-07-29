import { Hono } from "hono";
import { cors } from "hono/cors";
import { products } from "./routes/products";
import { carts } from "./routes/carts";
import { auth } from "./routes/auth";

const app = new Hono();

app.use("/*", cors());

app.get("/", (c) => {
  return c.json({
    message: "Trikot (Jersey)",
    products: "/products",
    auth: "/auth",
    carts: "/carts",
  });
});

app.route("/products", products);
app.route("/auth", auth);
app.route("/carts", carts);

export default app;
