"use client"
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function reviewpage({ params }) {
  //const { productid, reviewid } = (await params)
  const pathname = usePathname()
  const productid = pathname.split("/")[2];
  const reviewid = pathname.split("/")[4];
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      review Details page {productid} - {reviewid}
    </div>
  );
}


