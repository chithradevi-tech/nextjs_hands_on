import Image from "next/image";

export default async function Docs({ params }) {
 const {slug} = await params
 if (slug?.length == 2){
    return (
        <h1> {slug[0]} and {slug[1]}</h1>
    )
 }
 else if (slug?.length == 1){
    return (
        <h1> {slug[0]}</h1>
    )
 }
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      doc home page
    </div>
  );
}
