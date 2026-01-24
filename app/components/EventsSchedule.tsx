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
      day: '01',
      events: []
    },
    {
      month: 'February',
      day: '01',
      events: [
        { name: 'Anime Washington 2026', dates: 'Feb 6-8', url: 'https://animewashington.com' },
        { name: 'Isekai anime con', dates: 'Feb 20-22' }
      ]
    },
    {
      month: 'March',
      day: '21',
      events: [
        { name: 'Anime Las Vegas', dates: 'March 21-22' }
      ]
    },
    {
      month: 'April',
      day: '01',
      events: []
    },
    {
      month: 'May',
      day: '15',
      events: [
        { name: 'Gem state comic con', dates: 'May 15-17' }
      ]
    },
    {
      month: 'June',
      day: '01',
      events: []
    },
    {
      month: 'July',
      day: '25',
      events: [
        { name: 'Anime Matsuri', dates: 'July 25-26' }
      ]
    },
    {
      month: 'August',
      day: '08',
      events: [
        { name: 'All Minnesota Anime', dates: 'Aug 8-9' },
        { name: 'Nostalgia con SLC', dates: 'Aug 15-16' }
      ]
    },
    {
      month: 'September',
      day: '19',
      events: [
        { name: 'Anime ID', dates: 'Sep 19-20' }
      ]
    },
    {
      month: 'October',
      day: '01',
      events: []
    },
    {
      month: 'November',
      day: '01',
      events: []
    },
    {
      month: 'December',
      day: '01',
      events: []
    }
  ];

  return (
    <div className="calendar-bg-wrapper">
      <div aria-hidden="true" className="calendar-bg-gradient" />
      <section id="events" className="py-16 px-8 max-w-6xl mx-auto calendar-content-wrapper" style={{scrollMarginTop: '120px'}}>
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--salmon)', textTransform: 'uppercase' }}>Convention Schedule</h2>
        {/* Mobile/Tablet header image */}
        <div className="flex justify-center mb-8 md:hidden">
          <img
            src="/images/assets/events.png"
            alt="Events"
            className="w-auto calendar-header-img"
          />
        </div>

        <div className="grid md:grid-cols-[320px_1fr] gap-8 items-start">
          {/* Desktop left-side full-height image */}
          <div className="hidden md:flex">
            <img
              src="/images/assets/eventsfull.png"
              alt="Events"
              className="w-full calendar-side-img"
            />
          </div>

          {/* Months grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {schedule.map((monthData) => (
              <div key={monthData.month} className="calendar-card calendar-card-relative">
                {/* Calendar Header */}
                <header className="calendar-header">
                  <div className="calendar-header-title">{monthData.month}</div>
                </header>

              {/* Events List */}
              <div className="calendar-events-list">
                {monthData.events.length > 0 ? (
                  <div className="space-y-3">
                    {monthData.events.map((event, index) => (
                      <div key={index} className="pb-3 border-b last:border-b-0 calendar-event-item">
                        {event.url ? (
                          <a href={event.url} target="_blank" rel="noopener noreferrer" className="font-semibold mb-1 calendar-event-link">{event.name}</a>
                        ) : (
                          <p className="font-semibold mb-1 calendar-event-name">{event.name}</p>
                        )}
                        <p className="text-sm calendar-event-date">{event.dates}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm italic text-center calendar-no-events">No events scheduled</p>
                )}
              </div>
            </div>
          ))}

        </div>
      </div>
      </section>
    </div>

  );
}
