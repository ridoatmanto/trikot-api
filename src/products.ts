import { Hono } from "hono";

const app = new Hono();

const imageURLPrefix = process.env.WEB_URL + "/product-images/";

const productList = [
  {
    id: 1,
    name: "BORUSSIA DORTMUND HOME JERSEY 2024-2025",
    imageURL: imageURLPrefix + "dortmund-jersey-home-2024-2025.png",
    slug: "dortmund-jersey-home-2024-2025",
    price: 157000,
    description:
      "<ul><li>From kit supplier PUMA.</li><li>Puma cat and BVB emblem on the chest.</li><li>100% polyester 95 % recycled polyester thanks to Puma's RE:FIBRE process.</li><li>Flocked jerseys are delivered with GLS logo.</li></ul>",
    createdAt: "2024-11-28 15:33:12",
    updatedAt: "2024-11-28 15:33:12",
  },
  {
    id: 2,
    name: "BORUSSIA DORTMUND HOME JERSEY 2023-2024",
    imageURL: imageURLPrefix + "dortmund-jersey-home-2023-2024.png",
    slug: "dortmund-jersey-home-2023-2024",
    price: 150000,
    description:
      "<ul><li>From kit supplier PUMA.</li><li>Puma cat and BVB emblem on the chest.</li><li>100% polyester 95 % recycled polyester thanks to Puma's RE:FIBRE process.</li><li>Flocked jerseys are delivered with GLS logo.</li></ul>",
    createdAt: "2024-11-28 15:33:12",
    updatedAt: "2024-11-28 15:33:12",
  },
  {
    id: 3,
    name: "BORUSSIA DORTMUND AWAY JERSEY 2024-2025",
    imageURL: imageURLPrefix + "dortmund-jersey-away-2024-2025.png",
    slug: "dortmund-jersey-away-2024-2025",
    price: 127000,
    description:
      "<ul><li>From kit supplier PUMA.</li><li>Puma cat and BVB emblem on the chest.</li><li>100% polyester 95 % recycled polyester thanks to Puma's RE:FIBRE process.</li><li>Flocked jerseys are delivered with GLS logo.</li></ul>",
    createdAt: "2024-11-28 15:33:12",
    updatedAt: "2024-11-28 15:33:12",
  },
  {
    id: 4,
    name: "BORUSSIA DORTMUND SHORT JERSEY 2023-2024",
    imageURL: imageURLPrefix + "dortmund-short-2023-2024.png",
    slug: "dortmund-short-2023-2024",
    price: 107000,
    description:
      "<ul><li>From kit supplier PUMA.</li><li>Puma cat and BVB emblem on the chest.</li><li>100% polyester 95 % recycled polyester thanks to Puma's RE:FIBRE process.</li><li>Flocked jerseys are delivered with GLS logo.</li></ul>",
    createdAt: "2024-11-28 15:33:12",
    updatedAt: "2024-11-28 15:33:12",
  },
  {
    id: 5,
    name: "BORUSSIA DORTMUND GOALKEEPER JERSEY 2024-2025",
    imageURL: imageURLPrefix + "goalkeeper-jersey-2024-2025.png",
    slug: "goalkeeper-jersey-2024-2025",
    price: 137000,
    description:
      "<ul><li>From kit supplier PUMA.</li><li>Puma cat and BVB emblem on the chest.</li><li>100% polyester 95 % recycled polyester thanks to Puma's RE:FIBRE process.</li><li>Flocked jerseys are delivered with GLS logo.</li></ul>",
    createdAt: "2024-11-28 15:33:12",
    updatedAt: "2024-11-28 15:33:12",
  },
  {
    id: 6,
    name: "BORUSSIA DORTMUND SHORT JERSEY 2024-2025",
    imageURL: imageURLPrefix + "dortmund-short-2024-2025.png",
    slug: "dortmund-short-2024-2025",
    price: 127000,
    description:
      "<ul><li>From kit supplier PUMA.</li><li>Puma cat and BVB emblem on the chest.</li><li>100% polyester 95 % recycled polyester thanks to Puma's RE:FIBRE process.</li><li>Flocked jerseys are delivered with GLS logo.</li></ul>",
    createdAt: "2024-11-28 15:33:12",
    updatedAt: "2024-11-28 15:33:12",
  },
];

app.get("/", async (c) => {
  try {
    return c.json(productList);
  } catch (err: any) {
    console.log(err.message);
  }
});

app.get("/:slug", async (c) => {
  try {
    const productSlug = c.req.param("slug");
    const product = productList.find((x) => x.slug === productSlug);

    if (product) {
      return c.json(product);
    }

    c.status(404);
    return c.json({
      message: "Product doesn't exists!",
    });
  } catch (err: any) {
    c.status(401);
    return c.json({
      message: err.message,
    });
  }
});

export const products = app;
