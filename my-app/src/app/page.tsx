import { notFound } from "next/navigation";

export default function Home({ params }: { params: { slug: string[] } }) {
  const slug = params.slug || [];

  if (slug[0] !== "allowed") {
    // This will render the 404 page
    notFound();
  }

  return <div>Valid page: {slug.join("/")}</div>;
}
