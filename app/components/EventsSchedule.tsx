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
    <div className="calendar-bg-wrapper">
      <div aria-hidden="true" className="calendar-bg-gradient" />
      <section id="events" className="py-16 px-8 max-w-6xl mx-auto calendar-content-wrapper">
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

              {/* Ring decorations */}
              <div className="ring-left calendar-ring-deco calendar-ring-left">
                  <span className="calendar-ring-span"></span>
                  <span className="calendar-ring-span"></span>
              </div>

              <div className="ring-right calendar-ring-deco calendar-ring-right">
                  <span className="calendar-ring-span"></span>
                  <span className="calendar-ring-span"></span>
              </div>
            </div>
          ))}

        </div>
      </div>
      </section>
    </div>

  );
}
