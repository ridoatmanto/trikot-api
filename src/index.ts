import { Hono } from "hono";
import { cors } from "hono/cors";
import { products } from "./products";
// import { authors } from "./authors";
// import { bookAuthors } from "./book-authors";

const app = new Hono();

app.use("/*", cors());

app.get("/", (c) => {
  return c.json({
    // message: "Bücherliste (Book List)",
    products: "/products",
    // authors: "/authors",
    // "book-authors": "/book-authors",
  });
});

app.route("/products", products);
// app.route("/authors", authors);
// app.route("/book-authors", bookAuthors);

export default app;
