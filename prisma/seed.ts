import { prisma } from "./../src/libs/prisma";

async function main() {
  const imageURLPrefix = process.env.WEB_URL + "/product-images/";

  const products = await prisma.product.createMany({
    data: [
      {
        id: "1",
        name: "BORUSSIA DORTMUND HOME JERSEY 2024-2025",
        imageURL: imageURLPrefix + "dortmund-jersey-home-2024-2025.png",
        slug: "dortmund-jersey-home-2024-2025",
        price: 157000,
        description:
          "<ul><li>From kit supplier PUMA.</li><li>Puma cat and BVB emblem on the chest.</li><li>100% polyester 95 % recycled polyester thanks to Puma's RE:FIBRE process.</li><li>Flocked jerseys are delivered with GLS logo.</li></ul>",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        name: "BORUSSIA DORTMUND HOME JERSEY 2023-2024",
        imageURL: imageURLPrefix + "dortmund-jersey-home-2023-2024.png",
        slug: "dortmund-jersey-home-2023-2024",
        price: 150000,
        description:
          "<ul><li>From kit supplier PUMA.</li><li>Puma cat and BVB emblem on the chest.</li><li>100% polyester 95 % recycled polyester thanks to Puma's RE:FIBRE process.</li><li>Flocked jerseys are delivered with GLS logo.</li></ul>",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3",
        name: "BORUSSIA DORTMUND AWAY JERSEY 2024-2025",
        imageURL: imageURLPrefix + "dortmund-jersey-away-2024-2025.png",
        slug: "dortmund-jersey-away-2024-2025",
        price: 127000,
        description:
          "<ul><li>From kit supplier PUMA.</li><li>Puma cat and BVB emblem on the chest.</li><li>100% polyester 95 % recycled polyester thanks to Puma's RE:FIBRE process.</li><li>Flocked jerseys are delivered with GLS logo.</li></ul>",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "4",
        name: "BORUSSIA DORTMUND SHORT JERSEY 2023-2024",
        imageURL: imageURLPrefix + "dortmund-short-2023-2024.png",
        slug: "dortmund-short-2023-2024",
        price: 107000,
        description:
          "<ul><li>From kit supplier PUMA.</li><li>Puma cat and BVB emblem on the chest.</li><li>100% polyester 95 % recycled polyester thanks to Puma's RE:FIBRE process.</li><li>Flocked jerseys are delivered with GLS logo.</li></ul>",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "5",
        name: "BORUSSIA DORTMUND GOALKEEPER JERSEY 2024-2025",
        imageURL: imageURLPrefix + "goalkeeper-jersey-2024-2025.png",
        slug: "goalkeeper-jersey-2024-2025",
        price: 137000,
        description:
          "<ul><li>From kit supplier PUMA.</li><li>Puma cat and BVB emblem on the chest.</li><li>100% polyester 95 % recycled polyester thanks to Puma's RE:FIBRE process.</li><li>Flocked jerseys are delivered with GLS logo.</li></ul>",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "6",
        name: "BORUSSIA DORTMUND SHORT JERSEY 2024-2025",
        imageURL: imageURLPrefix + "dortmund-short-2024-2025.png",
        slug: "dortmund-short-2024-2025",
        price: 127000,
        description:
          "<ul><li>From kit supplier PUMA.</li><li>Puma cat and BVB emblem on the chest.</li><li>100% polyester 95 % recycled polyester thanks to Puma's RE:FIBRE process.</li><li>Flocked jerseys are delivered with GLS logo.</li></ul>",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  });

  // const authors = await prisma.author.createMany({
  //   data: [
  //     {
  //       id: "author-1",
  //       name: "Perry Marshall",
  //     },
  //     {
  //       id: "author-2",
  //       name: "Richard Koch",
  //     },
  //     {
  //       id: "author-3",
  //       name: "Miles Beckler",
  //     },
  //   ],
  // });

  const productStocks = await prisma.productStock.createMany({
    data: [
      {
        productId: "1",
        stock: 100,
      },
      {
        productId: "2",
        stock: 50,
      },
      {
        productId: "3",
        stock: 150,
      },
    ],
  });
  console.log({ products, productStocks });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
