import fs from "fs/promises";
import path from "path";
import React from "react";

const ProductDetailsPage = ({ product }) => {
  console.log("pr", product);
  if (!product) {
    return <p>Loading</p>;
  }
  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </div>
  );
};

export async function getStaticProps(context) {
  // console.log("context", context);
  const { params } = context;
  const prodId = params.productId;
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  const filteredProduct = data?.products?.find((prod) => prod?.id === prodId);
  if (!filteredProduct) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      product: filteredProduct,
    },
  };
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  const ids = data?.products?.map((product) => product?.id);
  const pathsWithParams = ids?.map((id) => ({ params: { productId: id } }));
  return {
    // paths: [
    // {
    //   params: { productId: "p1" },
    // },
    // {
    //   params: { productId: "p2" },
    // },
    // {
    //   params: { productId: "p3" },
    // },
    // ],
    paths: [...pathsWithParams],
    fallback: true, //"blocking", // true, // false,
  };
}

export default ProductDetailsPage;
