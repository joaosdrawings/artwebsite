'use client';

import { forwardRef } from 'react';

const Birds = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} className="birds-wrapper" style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '120vh',
      pointerEvents: 'none',
      zIndex: 1,
      willChange: 'transform'
    }}>
      <div className="bird-container bird-container--one">
        <div className="bird bird--one"></div>
      </div>
      
      <div className="bird-container bird-container--two">
        <div className="bird bird--two"></div>
      </div>
      
      <div className="bird-container bird-container--three">
        <div className="bird bird--three"></div>
      </div>
      
      <div className="bird-container bird-container--four">
        <div className="bird bird--four"></div>
      </div>
      
      <div className="bird-container bird-container--five">
        <div className="bird bird--five"></div>
      </div>

      <style jsx>{`
        .bird {
          background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/174479/bird-cells-new.svg);
          background-size: auto 100%;
          width: 88px;
          height: 125px;
          will-change: background-position;
          filter: brightness(0.4) saturate(2) hue-rotate(200deg) blur(4.5px);
          
          animation-name: fly-cycle;
          animation-timing-function: steps(10);
          animation-iteration-count: infinite;
        }

        .bird--one {
          animation-duration: 1.3s;
          animation-delay: -0.2s;
        }
        
        .bird--two {
          animation-duration: 1.15s;
          animation-delay: -0.6s;
        }
        
        .bird--three {
          animation-duration: 1s;
          animation-delay: -0.5s;
        }
        
        .bird--four {
          animation-duration: 1.25s;
          animation-delay: -0.25s;
        }
        
        .bird--five {
          animation-duration: 1.1s;
          animation-delay: -0.4s;
        }

        .bird-container {
          position: absolute;
          top: 10%;
          left: -10%;
          transform: scale(0) translateX(-10vw);
          will-change: transform;
          
          animation-name: fly-right-one;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        
        .bird-container--one {
          top: -18%;
          animation-duration: 35s;
          animation-delay: 5s;
          animation-name: fly-right-tiny;
        }
        
        .bird-container--two {
          top: -15%;
          animation-duration: 40s;
          animation-delay: 15s;
          animation-name: fly-right-tiny;
        }
        
        .bird-container--three {
          top: 2%;
          animation-duration: 15s;
          animation-delay: 0;
          animation-name: fly-right-small;
        }
        
        .bird-container--four {
          top: 5%;
          animation-duration: 20s;
          animation-delay: 9.5s;
          animation-name: fly-right-small;
        }
        
        .bird-container--five {
          top: -6%;
          animation-duration: 27s;
          animation-delay: 7s;
          animation-name: fly-right-medium-small;
        }

        @keyframes fly-cycle {
          100% {
            background-position: -900px 0;
          }
        }

        @keyframes fly-right-small {
          0% {
            transform: scale(0.15) translateX(-10vw) translateY(-5vh) rotate(15deg);
          }
          
          10% {
            transform: translateY(0vh) translateX(10vw) scale(0.2) rotate(15deg);
          }
          
          20% {
            transform: translateY(5vh) translateX(30vw) scale(0.25) rotate(15deg);
          }
          
          30% {
            transform: translateY(10vh) translateX(50vw) scale(0.3) rotate(15deg);
          }
          
          40% {
            transform: translateY(15vh) translateX(70vw) scale(0.3) rotate(15deg);
          }
          
          50% {
            transform: translateY(20vh) translateX(90vw) scale(0.3) rotate(15deg);
          }
          
          60% {
            transform: translateY(25vh) translateX(110vw) scale(0.3) rotate(15deg);
          }
          
          100% {
            transform: translateY(30vh) translateX(110vw) scale(0.3) rotate(15deg);
          }
        }

        @keyframes fly-right-medium {
          0% {
            transform: scale(0.225) translateX(-10vw) translateY(-5vh) rotate(15deg);
          }
          
          10% {
            transform: translateY(0vh) translateX(10vw) scale(0.3) rotate(15deg);
          }
          
          20% {
            transform: translateY(5vh) translateX(30vw) scale(0.375) rotate(15deg);
          }
          
          30% {
            transform: translateY(10vh) translateX(50vw) scale(0.45) rotate(15deg);
          }
          
          40% {
            transform: translateY(15vh) translateX(70vw) scale(0.45) rotate(15deg);
          }
          
          50% {
            transform: translateY(20vh) translateX(90vw) scale(0.45) rotate(15deg);
          }
          
          60% {
            transform: translateY(25vh) translateX(110vw) scale(0.45) rotate(15deg);
          }
          
          100% {
            transform: translateY(30vh) translateX(110vw) scale(0.45) rotate(15deg);
          }
        }

        @keyframes fly-right-tiny {
          0% {
            transform: scale(0.075) translateX(-10vw) translateY(-5vh) rotate(15deg);
          }
          
          10% {
            transform: translateY(0vh) translateX(10vw) scale(0.1) rotate(15deg);
          }
          
          20% {
            transform: translateY(5vh) translateX(30vw) scale(0.125) rotate(15deg);
          }
          
          30% {
            transform: translateY(10vh) translateX(50vw) scale(0.15) rotate(15deg);
          }
          
          40% {
            transform: translateY(15vh) translateX(70vw) scale(0.15) rotate(15deg);
          }
          
          50% {
            transform: translateY(20vh) translateX(90vw) scale(0.15) rotate(15deg);
          }
          
          60% {
            transform: translateY(25vh) translateX(110vw) scale(0.15) rotate(15deg);
          }
          
          100% {
            transform: translateY(30vh) translateX(110vw) scale(0.15) rotate(15deg);
          }
        }

        @keyframes fly-right-medium-small {
          0% {
            transform: scale(0.11) translateX(-10vw) translateY(-5vh) rotate(15deg);
          }
          
          10% {
            transform: translateY(0vh) translateX(10vw) scale(0.15) rotate(15deg);
          }
          
          20% {
            transform: translateY(5vh) translateX(30vw) scale(0.19) rotate(15deg);
          }
          
          30% {
            transform: translateY(10vh) translateX(50vw) scale(0.225) rotate(15deg);
          }
          
          40% {
            transform: translateY(15vh) translateX(70vw) scale(0.225) rotate(15deg);
          }
          
          50% {
            transform: translateY(20vh) translateX(90vw) scale(0.225) rotate(15deg);
          }
          
          60% {
            transform: translateY(25vh) translateX(110vw) scale(0.225) rotate(15deg);
          }
          
          100% {
            transform: translateY(30vh) translateX(110vw) scale(0.225) rotate(15deg);
          }
        }
      `}</style>
    </div>
  );
});

Birds.displayName = 'Birds';

export default Birds;

