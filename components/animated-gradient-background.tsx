"use client"

import { useEffect, useRef } from "react"

export function AnimatedGradientBackground() {
  const interBubbleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interBubble = interBubbleRef.current
    if (!interBubble) return

    let curX = 0
    let curY = 0
    let tgX = 0
    let tgY = 0

    function move() {
      curX += (tgX - curX) / 20
      curY += (tgY - curY) / 20
      if (interBubble) {
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`
      }
      requestAnimationFrame(move)
    }

    window.addEventListener("mousemove", (event) => {
      tgX = event.clientX
      tgY = event.clientY
    })

    move()

    return () => {
      window.removeEventListener("mousemove", () => {})
    }
  }, [])

  return (
    <div className="gradient-bg fixed inset-0 -z-10">
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -15"
              result="goo"
            />
          </filter>
        </defs>
      </svg>
      <div className="gradients-container">
        <div className="g1"></div>
        <div className="g2"></div>
        <div className="g3"></div>
        <div className="g4"></div>
        <div className="g5"></div>
        <div className="interactive" ref={interBubbleRef}></div>
      </div>
      <style jsx>{`
:root {
  --color-bg1: #ffffff;
  --color-bg2: #FFFEF9;
  --color1: 255, 255, 255;
  --color2: 255, 192, 203;
  --color3: 255, 182, 193;
  --color4: 255, 228, 225;
  --color5: 255, 240, 245;
  --color-interactive: 255, 192, 203;
  --circle-size: 80%;
  --blending: hard-light;
}

        @keyframes moveInCircle {
          0% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(180deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes moveVertical {
          0% {
            transform: translateY(-50%);
          }
          50% {
            transform: translateY(50%);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        @keyframes moveHorizontal {
          0% {
            transform: translateX(-50%) translateY(-10%);
          }
          50% {
            transform: translateX(50%) translateY(10%);
          }
          100% {
            transform: translateX(-50%) translateY(-10%);
          }
        }

        .gradient-bg {
          width: 100vw;
          height: 100vh;
          position: fixed;
          overflow: hidden;
          background: linear-gradient(40deg, var(--color-bg1), var(--color-bg2));
          top: 0;
          left: 0;
          opacity: 1; /* Zmieniona przezroczystość na 10% */
        }

        .gradients-container {
          filter: url(#goo) blur(40px);
          width: 100%;
          height: 100%;
        }

        .g1 {
          position: absolute;
          background: radial-gradient(circle at center, rgba(var(--color1), 0.8) 0, rgba(var(--color1), 0) 50%) no-repeat;
          mix-blend-mode: var(--blending);
          width: var(--circle-size);
          height: var(--circle-size);
          top: calc(50% - var(--circle-size) / 2);
          left: calc(50% - var(--circle-size) / 2);
          transform-origin: center center;
          animation: moveVertical 30s ease infinite;
          opacity: 1;
        }

        .g2 {
          position: absolute;
          background: radial-gradient(circle at center, rgba(var(--color2), 0.8) 0, rgba(var(--color2), 0) 50%) no-repeat;
          mix-blend-mode: var(--blending);
          width: var(--circle-size);
          height: var(--circle-size);
          top: calc(50% - var(--circle-size) / 2);
          left: calc(50% - var(--circle-size) / 2);
          transform-origin: calc(50% - 400px);
          animation: moveInCircle 20s reverse infinite;
          opacity: 1;
        }

        .g3 {
          position: absolute;
          background: radial-gradient(circle at center, rgba(var(--color3), 0.8) 0, rgba(var(--color3), 0) 50%) no-repeat;
          mix-blend-mode: var(--blending);
          width: var(--circle-size);
          height: var(--circle-size);
          top: calc(50% - var(--circle-size) / 2 + 200px);
          left: calc(50% - var(--circle-size) / 2 - 500px);
          transform-origin: calc(50% + 400px);
          animation: moveInCircle 40s linear infinite;
          opacity: 1;
        }

        .g4 {
          position: absolute;
          background: radial-gradient(circle at center, rgba(var(--color4), 0.8) 0, rgba(var(--color4), 0) 50%) no-repeat;
          mix-blend-mode: var(--blending);
          width: var(--circle-size);
          height: var(--circle-size);
          top: calc(50% - var(--circle-size) / 2);
          left: calc(50% - var(--circle-size) / 2);
          transform-origin: calc(50% - 200px);
          animation: moveHorizontal 40s ease infinite;
          opacity: 0.7;
        }

        .g5 {
          position: absolute;
          background: radial-gradient(circle at center, rgba(var(--color5), 0.8) 0, rgba(var(--color5), 0) 50%) no-repeat;
          mix-blend-mode: var(--blending);
          width: calc(var(--circle-size) * 2);
          height: calc(var(--circle-size) * 2);
          top: calc(50% - var(--circle-size));
          left: calc(50% - var(--circle-size));
          transform-origin: calc(50% - 800px) calc(50% + 200px);
          animation: moveInCircle 20s ease infinite;
          opacity: 1;
        }

        .interactive {
          position: absolute;
          background: radial-gradient(circle at center, rgba(var(--color-interactive), 0.8) 0, rgba(var(--color-interactive), 0) 50%) no-repeat;
          mix-blend-mode: var(--blending);
          width: 100%;
          height: 100%;
          top: -50%;
          left: -50%;
          opacity: 0.7;
        }
      `}</style>
    </div>
  )
}
