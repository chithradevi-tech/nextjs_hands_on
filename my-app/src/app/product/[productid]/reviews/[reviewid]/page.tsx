// "use client"
// import Image from "next/image";
// import { usePathname } from "next/navigation";

// export default function reviewpage({ params }) {
//   //const { productid, reviewid } = (await params)
//   const pathname = usePathname()
//   const productid = pathname.split("/")[2];
//   const reviewid = pathname.split("/")[4];
//   return (
//     <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
//       review Details page {productid} - {reviewid}
//     </div>
//   );
// }


import { notFound } from "next/navigation";

// function getRandomInt(count: number) {
//   return Math.floor(Math.random() * count);
// }

export default async function ProductReview({
  params,
}: {
  params: Promise<{ productid: string; reviewid: string }>;
}) {
  // const random = getRandomInt(2);
  // if (random === 1) {
  //   throw new Error("Error loading review");
  // }

  const { productid, reviewid } = await params;

  if (parseInt(reviewid) > 1000) {
    notFound();
  }
  return (
    <h1>
      Review {reviewid} for product {productid}
    </h1>
  );
}

