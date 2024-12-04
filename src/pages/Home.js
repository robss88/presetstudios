// Home.js
import ThreeMusicScene from '../components/ThreeMusicScene';

function Home() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-text-primary">Welcome Home</h2>
        <p className="text-text-secondary">
          Experience the music in a whole new dimension.
        </p>
      </div>

      {/* Three.js Music Scene */}
      <div className="w-full rounded-lg overflow-hidden shadow-2xl">
        <ThreeMusicScene />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Dynamic Visuals",
            content: "Watch as the character dances to the rhythm of the music in a vibrant digital space."
          },
          {
            title: "Particle Effects",
            content: "Immerse yourself in a sea of dynamic particles that react to the music's energy."
          },
          {
            title: "Interactive Experience",
            content: "A blend of music and visual art creating an unforgettable digital experience."
          }
        ].map((item, index) => (
          <div key={index} className="p-6 rounded-lg bg-primary-background border border-gray-800">
            <h3 className="text-lg font-semibold text-text-primary mb-2">{item.title}</h3>
            <p className="text-text-secondary">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;