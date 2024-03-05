'use client'
import { useEffect, useRef, useState } from "react";

export default function EmbedResize() {

  const [rows, setRows] = useState<number>(1);
  const mainRef = useRef<HTMLDivElement>();
  useEffect(() => {
    if (top === self) {
      return;
    }
    if (mainRef.current) {
      window.parent.postMessage(JSON.stringify({ 
        src: window.location.toString(), 
        context: 'iframe.resize', 
        height: mainRef.current.clientHeight
      }), '*');
    }
  }, [rows])

  return (
    // @ts-ignore
    <main ref={mainRef} className="p-2">
      <div className="flex justify-center">
        <button className="rounded-md p-2" onClick={() => {setRows(rows + 1)}}>Add</button>
        <button className="rounded-md p-2" onClick={() => {setRows(rows > 0 ? rows - 1 : 0)}}>Remove</button>
      </div>
      {Array.from(Array(rows).keys()).map((row, i) => (
        <div className="block rounded-lg m-2" key={i}></div>
      ))}
      <style jsx>{`
        .block {
          height: 100px;
          background-color: red
        }

        .block:nth-child(3n - 1) {
          background-color: #0077BD;
        }
        .block:nth-child(3n) {
          background-color: #F36916;
        }
        .block:nth-child(3n + 1) {
          background-color: #00807C;
        }

        button {
          background-color: #41A54F;
          margin: 6px;
        }
        `}</style>
    </main>
  );
}
