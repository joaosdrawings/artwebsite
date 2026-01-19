'use client';

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
    <section className="py-16 px-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        <a href="https://www.instagram.com/moitaartwork/" target="_blank" rel="noopener noreferrer" style={{color: '#FF7E70'}}>
          @moitaartwork
        </a>
      </h2>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((postId) => (
            <div key={postId} className="rounded-lg overflow-hidden" style={{backgroundColor: '#F0EAD6'}}>
              <iframe
                src={`https://www.instagram.com/p/${postId}/embed`}
                className="w-full"
                style={{ minHeight: '500px', border: 'none' }}
                allowFullScreen
              />
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a 
            href="https://www.instagram.com/moitaartwork/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white px-6 py-2 rounded-full transition-colors inline-block" 
            style={{backgroundColor: '#FF7E70'}}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E64A4A'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF7E70'}
          >
            View on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
