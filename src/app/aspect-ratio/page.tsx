'use client'
import { useEffect, useRef, useState } from "react";

export default function AspectRatio() {

  const [aspectRatio, setAspectRatio] = useState<string>('');
  useEffect(() => {
    function updateAspectRatio() {
      const width = window.innerWidth;
      const height = window.innerHeight; 
      const aspectRatio = width/height;

      function gcd (a: number, b: number) {
        if (b < 0.0000001) return a;
        return gcd(b, Math.floor(a % b));
      };

      const len = aspectRatio.toString().length - 2;
      let denominator = Math.pow(10, len);
      let numerator = aspectRatio * denominator;
      const divisor = gcd(numerator, denominator);

      numerator /= divisor;
      denominator /= divisor;

      setAspectRatio(Math.floor(numerator) + ' / ' + Math.floor(denominator))

    }
    updateAspectRatio();
    window.addEventListener('resize', updateAspectRatio);
    return () => {
      window.removeEventListener('resize', updateAspectRatio);
    }
  }, [setAspectRatio])

  return (
    // @ts-ignore
    <main className="p-4 flex justify-center">
      <div className="rounded-lg flex place-items-center justify-center">Aspect Ratio:<br />{aspectRatio}</div>
      <style jsx>{`
        main {
          height: 100vh;
          width: 100vw;
        }
        div {
          height: 100%;
          width: 100%;
          background-color: #0077BD;
          font-size: 28px;
        }
      `}</style>
    </main>
  );
}
