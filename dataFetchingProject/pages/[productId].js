import fs from "fs/promises";
import path from "path";
import React from "react";

const ProductDetailsPage = ({ product }) => {
  console.log("pr", product);
  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </div>
  );
};

export async function getStaticProps(context) {
  console.log("context", context);
  const { params } = context;
  const prodId = params.productId;
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  const filteredProduct = data?.products?.filter(
    (prod) => prod?.id === productId
  );
  return {
    props: {
      product: filteredProduct,
    },
  };
}

export default ProductDetailsPage;
