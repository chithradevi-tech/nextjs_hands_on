import Image from "next/image";

export default async function ProductDetails({ params }) {
  const productId = (await params).productid
  return (
    <div>
      Product Details page {productId}
    </div>
  );
}


