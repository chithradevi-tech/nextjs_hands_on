export default function ProductDetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        {children}
        <h2>Featured Product Layout</h2>
      </div>
  );
}