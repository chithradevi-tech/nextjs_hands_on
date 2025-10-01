import { Metadata } from "next";

type Props = {
  params: Promise<{ productid: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const productId = (await params).productid;
  const title = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(`iPhone ${productId}`);
    }, 100);
  });
  return {
    title: `Product - ${title}`,
  };
};

export default async function ProductDetails({ params }: Props) {
  const productId = (await params).productid;
  return <h1>Details about product {productId}</h1>;
}