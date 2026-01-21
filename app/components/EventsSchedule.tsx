'use client';

interface Event {
  name: string;
  dates: string;
  url?: string;
}

interface MonthEvents {
  month: string;
  day: string;
  events: Event[];
}

export default function EventsSchedule() {
  const schedule: MonthEvents[] = [
    {
      month: 'January',
      day: '15',
      events: [
        { name: 'Anime Expo 2026', dates: 'Jan 15-18', url: 'https://www.anime-expo.org' },
        { name: 'Anime Expo 2026', dates: 'Jan 15-18', url: 'https://www.anime-expo.org' }
      ]
    },
    {
      month: 'February',
      day: '01',
      events: []
    },
    {
      month: 'March',
      day: '21',
      events: [
        { name: 'Sakura Con 2026', dates: 'March 21-23', url: 'https://www.sakuracon.org' }
      ]
    },
    {
      month: 'April',
      day: '01',
      events: []
    },
    {
      month: 'May',
      day: '09',
      events: [
        { name: 'FanExpo Boston 2026', dates: 'May 9-11', url: 'https://www.fanexpoboston.com' }
      ]
    },
    {
      month: 'June',
      day: '01',
      events: []
    },
    {
      month: 'July',
      day: '23',
      events: [
        { name: 'Comic-Con International', dates: 'July 23-26', url: 'https://www.comic-con.org' }
      ]
    },
    {
      month: 'August',
      day: '07',
      events: [
        { name: 'Otakon 2026', dates: 'Aug 7-9', url: 'https://www.otakon.com' }
      ]
    },
    {
      month: 'September',
      day: '01',
      events: []
    },
    {
      month: 'October',
      day: '08',
      events: [
        { name: 'New York Comic Con', dates: 'Oct 8-11', url: 'https://www.newyorkcomiccon.com' }
      ]
    },
    {
      month: 'November',
      day: '01',
      events: []
    },
    {
      month: 'December',
      day: '19',
      events: [
        { name: 'Holiday Art Market', dates: 'Dec 19-21' }
      ]
    }
  ];

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          height: '100%',
          zIndex: 0,
          padding: '32px 0', // extra vertical padding
          background: 'linear-gradient(135deg, #FAF9F6 0%, #F0EAD6 50%, #FFE8D6 100%)',
          pointerEvents: 'none',
        }}
      />
      <section id="events" className="py-16 px-8 max-w-6xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
        {/* Mobile/Tablet header image */}
        <div className="flex justify-center mb-8 md:hidden">
          <img
            src="/images/assets/events.png"
            alt="Events"
            className="w-auto"
            style={{ objectFit: 'contain', height: '400px' }}
          />
        </div>

        <div className="grid md:grid-cols-[320px_1fr] gap-8 items-start">
          {/* Desktop left-side full-height image */}
          <div className="hidden md:flex">
            <img
              src="/images/assets/eventsfull.png"
              alt="Events"
              className="w-full"
              style={{ objectFit: 'contain', maxHeight: '100%', borderRadius: '12px' }}
            />
          </div>

          {/* Months grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {schedule.map((monthData) => (
              <div key={monthData.month} className="calendar-card" style={{ position: 'relative' }}>
                {/* Calendar Header */}
                <header style={{
                  background: '#FF7E70',
                  color: '#fff',
                  padding: '1.5em 1.25em',
                  borderRadius: '1em 1em 0 0',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <div style={{
                  fontSize: '2em',
                  lineHeight: '1em',
                  textTransform: 'lowercase',
                  fontWeight: '700'
                }}>{monthData.month}</div>
              </header>

              {/* Events List */}
              <div style={{
                background: '#fff',
                borderRadius: '0 0 1em 1em',
                boxShadow: '0 2px 1px rgba(0, 0, 0, .2), 0 3px 1px #fff',
                padding: '1.5em 1.25em',
                minHeight: '120px'
              }}>
                {monthData.events.length > 0 ? (
                  <div className="space-y-3">
                    {monthData.events.map((event, index) => (
                      <div key={index} className="pb-3 border-b last:border-b-0" style={{ borderColor: '#E8DCC4' }}>
                        {event.url ? (
                          <a href={event.url} target="_blank" rel="noopener noreferrer" className="font-semibold mb-1" style={{ color: '#FF7E70', textDecoration: 'none', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}>{event.name}</a>
                        ) : (
                          <p className="font-semibold mb-1" style={{ color: '#555' }}>{event.name}</p>
                        )}
                        <p className="text-sm" style={{ color: '#999' }}>{event.dates}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm italic text-center" style={{ color: '#cacaca', paddingTop: '1em' }}>No events scheduled</p>
                )}
              </div>

              {/* Ring decorations */}
              <div className="ring-left" style={{
                position: 'absolute',
                top: '68px',
                left: '1.5em'
              }}>
                  <span style={{
                    borderRadius: '4px',
                    boxShadow: '0 3px 1px rgba(0, 0, 0, .3), 0 -1px 1px rgba(0, 0, 0, .2)',
                    display: 'inline-block',
                    margin: '0 4px',
                    height: '24px',
                    width: '6px'
                  }}></span>
                  <span style={{
                    borderRadius: '4px',
                    boxShadow: '0 3px 1px rgba(0, 0, 0, .3), 0 -1px 1px rgba(0, 0, 0, .2)',
                    display: 'inline-block',
                    margin: '0 4px',
                    height: '24px',
                    width: '6px'
                  }}></span>
              </div>

              <div className="ring-right" style={{
                position: 'absolute',
                top: '68px',
                right: '1.5em'
              }}>
                  <span style={{
                    borderRadius: '4px',
                    boxShadow: '0 3px 1px rgba(0, 0, 0, .3), 0 -1px 1px rgba(0, 0, 0, .2)',
                    display: 'inline-block',
                    margin: '0 4px',
                    height: '24px',
                    width: '6px'
                  }}></span>
                  <span style={{
                    borderRadius: '4px',
                    boxShadow: '0 3px 1px rgba(0, 0, 0, .3), 0 -1px 1px rgba(0, 0, 0, .2)',
                    display: 'inline-block',
                    margin: '0 4px',
                    height: '24px',
                    width: '6px'
                  }}></span>
              </div>
            </div>
          ))}

        </div>
      </div>
      </section>
    </div>

  );
}
