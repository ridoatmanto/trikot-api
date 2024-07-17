import { Hono } from "hono";
import { cors } from "hono/cors";
import { products } from "./products";

const app = new Hono();

app.use("/*", cors());

app.get("/", (c) => {
  return c.json({
    message: "Trikot (Jersey)",
    products: "/products",
  });
});

app.route("/products", products);

export default app;
