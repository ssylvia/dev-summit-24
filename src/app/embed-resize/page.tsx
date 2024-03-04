'use client'
import { useEffect, useState } from "react";

interface HashVariables {
  css: string;
  className: string;
}
interface HashVariablesState {
  prev: HashVariables;
  current: HashVariables;
}
let cssKey = 0;
const hashToVariables = (hash: string = '#blue-1'): HashVariables => {
  const [clr, pos] = hash.replace('#', '').split('-');
  const positions = [
    'height: 16vw; width: 16vw; transform: translate(0vw, 0vh);', // 1
    'height: 16vw; width: 100%; transform: translate(0vw, 0vh);', // 2
    'height: 16vw; width: 16vw; transform: translate(calc(80vw - 100%), 0vh);', // 3
    'height: 100%; width: 16vw; transform: translate(0vw, 0vh);', // 4
    'height: 100%; width: 100%; transform: translate(0vw, 0vh);', // 5
    'height: 100%; width: 16vw; transform: translate(calc(80vw - 100%), 0vh);', // 6
    'height: 16vw; width: 16vw; transform: translate(0vw, calc(80vh - 100%));', // 7
    'height: 16vw; width: 100%; transform: translate(0vw, calc(80vh - 100%));', // 8
    'height: 16vw; width: 16vw; transform: translate(calc(80vw - 100%), calc(80vh - 100%));' // 9
  ];

  const position = pos ?? 1;
  const color = clr && clr.length > 0 ? clr : 'blue';
  const positionOrder = Math.max(0, Math.min(positions.length - 1, Number(position) - 1));
  const positionStr = positions[positionOrder];

  cssKey++;

  const className = `style-class${cssKey}`;

  const css = `.${className} {top: 0; left: 0;${positionStr} background-color: ${color};}`;

  return {css, className};
}

export default function HoverColor() {

  const [hashVariables, setHashVariables] = useState<HashVariablesState>();
  useEffect(() => {
    function hashChangeHandler() {
      const nextVariables = hashToVariables(window.location.hash)
      console.log(nextVariables.className, hashVariables?.prev.className)
      if (nextVariables.className === hashVariables?.prev.className) return;
      const nextVariablesState: HashVariablesState = {
        prev: hashVariables?.current ?? nextVariables,
        current: nextVariables,
      };
      console.log(nextVariables.className)
      setHashVariables(nextVariablesState)
    }
    if (!hashVariables?.current) {
      hashChangeHandler();
    }
    window.addEventListener('hashchange', hashChangeHandler);

    return () => {
      window.removeEventListener('hashchange', hashChangeHandler);
    };
  }, [hashVariables, setHashVariables]);

  return (
    <main className="fixed mt-[10vh] mb-[10vh] ml-[10vw] mr-[10vw] h-4/5 w-4/5">
      {hashVariables && 
      (<>
        <div className={`absolute rounded-lg transition-all duration-500 ${hashVariables.prev.className} ${hashVariables.current.className}`}></div>
        <style jsx>{`
          ${hashVariables.prev.css}
          ${hashVariables.current.css}
        `}</style>
      </>
      )}
      
    </main>
  );
}
