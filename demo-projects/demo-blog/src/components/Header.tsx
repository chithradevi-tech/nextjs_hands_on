export default function Header() {
  return (
    <header className="bg-white shadow-md py-4 px-8">
      <h1 className="text-2xl font-bold text-blue-600">My Portfolio</h1>
      <nav className="mt-2">
        <ul className="flex space-x-4">
          <li><a className="hover:text-blue-800" href="#">Home</a></li>
          <li><a className="hover:text-blue-800" href="#">About</a></li>
          <li><a className="hover:text-blue-800" href="#">Projects</a></li>
          <li><a className="hover:text-blue-800" href="#">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}