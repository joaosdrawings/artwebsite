'use client';

interface Event {
  name: string;
  dates: string;
}

interface MonthEvents {
  month: string;
  events: Event[];
}

export default function EventsSchedule() {
  const schedule: MonthEvents[] = [
    {
      month: 'January',
      events: [
        { name: 'Anime Expo 2026', dates: 'Jan 15-18' }
      ]
    },
    {
      month: 'February',
      events: []
    },
    {
      month: 'March',
      events: [
        { name: 'Sakura Con 2026', dates: 'March 21-23' }
      ]
    },
    {
      month: 'April',
      events: []
    },
    {
      month: 'May',
      events: [
        { name: 'FanExpo Boston 2026', dates: 'May 9-11' }
      ]
    },
    {
      month: 'June',
      events: []
    },
    {
      month: 'July',
      events: [
        { name: 'Comic-Con International', dates: 'July 23-26' }
      ]
    },
    {
      month: 'August',
      events: [
        { name: 'Otakon 2026', dates: 'Aug 7-9' }
      ]
    },
    {
      month: 'September',
      events: []
    },
    {
      month: 'October',
      events: [
        { name: 'New York Comic Con', dates: 'Oct 8-11' }
      ]
    },
    {
      month: 'November',
      events: []
    },
    {
      month: 'December',
      events: [
        { name: 'Holiday Art Market', dates: 'Dec 19-21' }
      ]
    }
  ];

  return (
    <section className="py-16 px-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 flex items-center">
        <span className="mr-2" style={{color: '#FF7E70'}}>•</span> Events Schedule
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schedule.map((monthData) => (
          <div key={monthData.month} className="rounded-lg p-6" style={{backgroundColor: '#F0EAD6'}}>
            <h3 className="text-xl font-bold mb-4" style={{color: '#FF7E70'}}>{monthData.month}</h3>
            {monthData.events.length > 0 ? (
              <div className="space-y-3">
                {monthData.events.map((event, index) => (
                  <div key={index} className="pb-3 border-b last:border-b-0" style={{borderColor: '#E8DCC4'}}>
                    <p className="font-semibold mb-1">{event.name}</p>
                    <p className="text-sm" style={{color: '#666'}}>{event.dates}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm italic" style={{color: '#999'}}>No events scheduled</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
