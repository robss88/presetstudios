// Home.js
function Home() {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-text-primary">Welcome Home</h2>
          <p className="text-text-secondary">
            This is your beautifully designed home page content.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="p-6 rounded-lg bg-primary-background border border-gray-800">
              <h3 className="text-lg font-semibold text-text-primary mb-2">Card {item}</h3>
              <p className="text-text-secondary">Some content for this card.</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default Home;