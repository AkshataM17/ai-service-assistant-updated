// app/page.tsx
export default function Home() {
  return (
    <main>
      <nav className="bg-black text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">AI Assistant</h1>
          
        </div>
      </nav>

      <section className="container mx-auto py-20 text-center">
        <h2 className="text-5xl font-bold mb-6">Elevate Your Customer Service</h2>
        <p className="text-xl text-gray-700 mb-8">AI-powered assistant that learns and adapts to your business</p>
      </section>

      <section id="features" className="bg-white py-10">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-500">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-500">One-Time Learning</h3>
              <p className="text-gray-700">Initial setup allows for comprehensive data input, creating a knowledge base tailored to your business.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-500">24/7 Availability</h3>
              <p className="text-gray-700">Provide instant support to your customers around the clock with our AI assistant.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-500">Easy to Use</h3>
              <p className="text-gray-700">Extremely simple user interface for customers to interact</p>
            </div>
              <p className="text-gray-700"></p>
              <p className="text-gray-700"></p>
              <p className="text-gray-700"></p>
          </div>
        </div>
      </section>
    </main>
  )
}