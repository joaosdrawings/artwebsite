'use client';
import AnimatedButton from './AnimatedButton';

export default function InstagramFeed() {
  const posts = [
    'DTHZlX0FKwm',
    'DSWzwCuFChk',
    'DRyXFDaFGpa',
    'DRVjx0kklG4',
    'DOxXkkGFOQ-',
    'DNvcDdZ2krm'
  ];

  return (
    <section id="instagram" className="py-16 px-8" style={{scrollMarginTop: '120px'}}>
      <h2 className="text-3xl font-bold text-center mb-8">
        <a href="https://www.instagram.com/moitaartwork/" target="_blank" rel="noopener noreferrer" style={{color: '#FF7E70'}}>
          @moitaartwork
        </a>
      </h2>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((postId, index) => {
            const colors = ['#FFE8D6', '#F0E6D2', '#FFF0E6', '#F5E6D3', '#FFE5CC', '#F8E4D0'];
            const bgColor = colors[index % colors.length];
            return (
              <div key={postId} className="rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105" style={{backgroundColor: bgColor, height: '600px', display: 'flex', flexDirection: 'column'}}>
                <iframe
                  src={`https://www.instagram.com/p/${postId}/embed`}
                  className="w-full"
                  style={{ height: '100%', border: 'none', overflow: 'hidden' }}
                  allowFullScreen
                  scrolling="no"
                />
              </div>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <AnimatedButton 
            href="https://www.instagram.com/moitaartwork/"
            text="View on Instagram"
          />
        </div>
      </div>
    </section>
  );
}
