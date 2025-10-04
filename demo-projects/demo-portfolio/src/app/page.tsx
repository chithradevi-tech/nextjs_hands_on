export default function HomePage() {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h2>
      <p className="text-lg text-gray-600">
        This is a simple Next.js 15 project using Tailwind CSS with a Header and Footer.
      </p>
      <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Explore Projects
      </button>
    </div>
  );
}