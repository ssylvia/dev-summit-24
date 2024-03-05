'use client'
import { useEffect, useRef, useState } from "react";

export default function AspectRatio() {

  const [aspectRatio, setAspectRatio] = useState<string>('');
  useEffect(() => {
    function updateAspectRatio() {
      const width = window.innerWidth;
      const height = window.innerHeight; 
      const aspectRatio = width/height;

      setAspectRatio(aspectRatio.toFixed(3));

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
      <div className="rounded-lg flex place-items-center justify-center">Aspect Ratio: {aspectRatio}<br />Height: {aspectRatio && window.innerHeight}px<br />Width: {aspectRatio && window.innerWidth}px</div>
      <style jsx>{`
        main {
          height: 100vh;
          width: 100vw;
        }
        div {
          height: 100%;
          width: 100%;
          background-color: #0077BD;
          font-size: 30px;
        }
      `}</style>
    </main>
  );
}
