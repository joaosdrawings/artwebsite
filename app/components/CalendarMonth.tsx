'use client';

import Image from 'next/image';

interface Event {
  name: string;
  dates: string;
  url?: string;
}

interface CalendarMonthProps {
  monthNumber: number;
  month: string;
  events: Event[];
  imageSrc: string;
}

export default function CalendarMonth({ monthNumber, month, events, imageSrc }: CalendarMonthProps) {
  return (
    <div style={{
      position: 'relative',
      width: '360px',
      height: '360px',
      boxShadow: '0 27px 24px 0 rgba(0, 0, 0, 0.2), 0 40px 77px 0 rgba(0, 0, 0, 0.22)',
      overflow: 'hidden'
    }}>
      {/* Background Image Container */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#502e82',
        zIndex: 0
      }}>
        {imageSrc && (
          <Image 
            src={imageSrc}
            alt={month}
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              filter: 'url(#duotone)'
            }}
            priority
          />
        )}
      </div>

      {/* Calendar Content */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        marginTop: '10%',
        marginLeft: '10%',
        padding: '15% 0 0 0',
        border: '10px solid #fff',
        fontFamily: "'Josefin Sans', sans-serif",
        boxSizing: 'border-box',
        zIndex: 1
      }}>
        {/* Month Number Background */}
        <h2 style={{
          position: 'absolute',
          top: '-0.4em',
          left: '-0.3em',
          margin: 0,
          fontSize: '400px',
          lineHeight: 1,
          letterSpacing: 0,
          color: '#fff',
          opacity: 0.15,
          fontWeight: 'bold'
        }}>
          {monthNumber}
        </h2>

        {/* Calendar Table */}
        <table style={{
          position: 'absolute',
          width: '100%',
          height: '85%',
          borderCollapse: 'collapse',
          color: '#fff',
          fontSize: '16px'
        }}>
          <thead>
            <tr>
              <th style={{textAlign: 'center', fontSize: '16px'}}>日</th>
              <th style={{textAlign: 'center', fontSize: '16px'}}>月</th>
              <th style={{textAlign: 'center', fontSize: '16px'}}>火</th>
              <th style={{textAlign: 'center', fontSize: '16px'}}>水</th>
              <th style={{textAlign: 'center', fontSize: '16px'}}>木</th>
              <th style={{textAlign: 'center', fontSize: '16px'}}>金</th>
              <th style={{textAlign: 'center', fontSize: '16px'}}>土</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map((event, idx) => (
                <tr key={idx}>
                  <td colSpan={7} style={{
                    textAlign: 'center',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'opacity 0.3s ease',
                    opacity: 1,
                    backgroundColor: '#fff',
                    color: '#502e82',
                    padding: '8px',
                    fontWeight: 'bold'
                  }}>
                    <div>
                      {event.url ? (
                        <a href={event.url} target="_blank" rel="noopener noreferrer" style={{
                          color: 'inherit',
                          textDecoration: 'none'
                        }}>
                          {event.name}
                        </a>
                      ) : (
                        event.name
                      )}
                    </div>
                    <div style={{fontSize: '12px', marginTop: '4px'}}>{event.dates}</div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} style={{
                  textAlign: 'center',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'opacity 0.3s ease',
                  opacity: 0.5,
                  color: '#fff',
                  padding: '20px'
                }}>
                  No events scheduled
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
