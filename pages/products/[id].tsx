import Head from "next/head";
import ProductCard from "../../components/ProductCard";
import { Product } from "@prisma/client";

import { GetServerSideProps } from "next";
import prisma from "../../db";

interface ProductsProps {
  product: Product;
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const product = await prisma.product.findFirst({
    where: {
      id: { equals: id as string },
    },
  });
  return {
    props: {
      product,
    },
  };
};

const Products = (props: ProductsProps) => {
  return (
    <div>
      <Head>
        <title>Threadz</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="grid grid-cols-3 gap-10">
        <section className="col-span-2">
          <ProductCard product={props.product} usePurchaseButton />
        </section>
        <section className="w-3/4"></section>
      </div>
    </div>
  );
};

export default Products;
