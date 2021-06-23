import { Product } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import ProductCard from '../../components/ProductCard';
import prisma from '../../db';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  const product = await prisma.product.findFirst({
    where: {
      id: {
        equals: id as string
      }
    }
  });

  return {
    props: { product }
  };
};

interface ProductsProps {
  product: Product;
}

const Products = (props: ProductsProps) => {
  return (
    <div>
      <Head>
        <title>{props.product.name} | Threadz</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ProductCard product={props.product} />
    </div>
  );
};

export default Products;