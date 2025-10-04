export default function Footer() {
  return (
    <footer className="bg-white shadow-inner py-4 px-8 mt-10 text-center text-gray-500">
      © {new Date().getFullYear()} My Portfolio. All rights reserved.
    </footer>
  );
}