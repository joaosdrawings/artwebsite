'use client';

import CalendarMonth from './CalendarMonth';

interface Event {
  name: string;
  dates: string;
  url?: string;
}

interface MonthEvents {
  month: string;
  monthNumber: number;
  events: Event[];
}

interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  isLandscape?: boolean;
}

interface EventsScheduleProps {
  galleryImages: GalleryImage[];
}

export default function EventsSchedule({ galleryImages }: EventsScheduleProps) {
  const schedule: MonthEvents[] = [
    {
      month: 'January',
      monthNumber: 1,
      events: []
    },
    {
      month: 'February',
      monthNumber: 2,
      events: [
        { name: 'Anime Washington 2026', dates: 'Feb 6-8', url: 'https://animewashington.com'},
        { name: 'Isekai anime con', dates: 'Feb 20-22', url: 'https://isekaianimecon.com' }
      ]
    },
    {
      month: 'March',
      monthNumber: 3,
      events: [
        { name: 'Anime Las Vegas', dates: 'March 21-22', url: 'https://animelasvegas.com'  }
      ]
    },
    {
      month: 'April',
      monthNumber: 4,
      events: []
    },
    {
      month: 'May',
      monthNumber: 5,
      events: [
        { name: 'Gem state comic con', dates: 'May 15-17', url: 'https://gemstatecomiccon.com'  }
      ]
    },
    {
      month: 'June',
      monthNumber: 6,
      events: []
    },
    {
      month: 'July',
      monthNumber: 7,
      events: [
        { name: 'Anime Matsuri', dates: 'July 25-26', url: 'https://animematsuri.com'  }
      ]
    },
    {
      month: 'August',
      monthNumber: 8,
      events: [
        { name: 'Big Minneapolis Anime', dates: 'Aug 8-9', url: 'https://bigminneapolisanime.com'  },
        { name: 'Nostalgia con SLC', dates: 'Aug 15-16', url: 'https://www.thenostalgiacon.com/saltlakehome26'  }
      ]
    },
    {
      month: 'September',
      monthNumber: 9,
      events: [
        { name: 'Anime ID', dates: 'Sep 19-20', url: 'https://animeidaho.com'  }
      ]
    },
    {
      month: 'October',
      monthNumber: 10,
      events: []
    },
    {
      month: 'November',
      monthNumber: 11,
      events: []
    },
    {
      month: 'December',
      monthNumber: 12,
      events: []
    }
  ];

  return (
    <div style={{position: 'relative', width: '100%'}}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        height: '100%',
        zIndex: 0,
        padding: '32px 0',
        background: 'linear-gradient(135deg, #FAF9F6 0%, #F0EAD6 50%, #FFE8D6 100%)',
        pointerEvents: 'none'
      }} />
      <svg style={{visibility:'hidden', width:0, height:0}} width="0" height="0">
        <filter id="duotone" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="0.3 0 0 0 0.65 0.5 0 0 0 0.25 0.7 0 0 0 0.1 0 0 0 1 0" />
        </filter>
      </svg>
      <section id="events" style={{
        position: 'relative',
        zIndex: 1,
        padding: '2rem',
        paddingBottom: 'calc(2rem + 50px)',
        scrollMarginTop: '120px',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <h2 style={{
          fontSize: '1.875rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '3rem',
          color: '#FF7E70',
          textTransform: 'uppercase'
        }}>
          Convention Schedule
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '40px',
          justifyItems: 'center',
          padding: '0 5%'
        }}>
          {schedule.map((monthData) => {
            // Find gallery image matching month number
            const imageSrc = galleryImages.find(img => {
              const filename = img.src.split('/').pop() || '';
              const num = parseInt(filename);
              return num === monthData.monthNumber;
            })?.src || galleryImages[0]?.src || '';

            return (
              <CalendarMonth
                key={monthData.month}
                monthNumber={monthData.monthNumber}
                month={monthData.month}
                events={monthData.events}
                imageSrc={imageSrc}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
