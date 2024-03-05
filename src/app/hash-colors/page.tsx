'use client'
import { useEffect, useState } from "react";

interface HashVariables {
  css: string;
  className: string;
  values: {position: number, color: string};
}
interface HashVariablesState {
  prev: HashVariables;
  current: HashVariables;
}
let cssKey = 0;
const hashToVariables = (hash: string = '#blue-1', currentValues?: HashVariables['values']): HashVariables | void => {
  if (currentValues && (hash === '#' || hash === '')) {
    return;
  }
  const isClockwise = hash === '#cw';
  const isCounterClockwise = hash === '#ccw';
  const isColorChange = hash === '#cc';

  // reset hash so the value can be used again
  if (isClockwise || isCounterClockwise || isColorChange) {
    window.location.hash = '';
  }

  const positions = [
    'height: 16vw; width: 16vw; transform: translate(0vw, 0vh);', // 1
    'height: 16vw; width: 16vw; transform: translate(calc(40vw - 50%), 0vh);', // 2
    'height: 16vw; width: 16vw; transform: translate(calc(80vw - 100%), 0vh);', // 3
    'height: 16vw; width: 16vw; transform: translate(calc(80vw - 100%), calc(40vh - 50%));', // 4
    'height: 100%; width: 100%; transform: translate(0vw, 0vh);', // 5
    'height: 16vw; width: 16vw; transform: translate(calc(80vw - 100%), calc(80vh - 100%));', // 6
    'height: 16vw; width: 16vw; transform: translate(calc(40vw - 50%), calc(80vh - 100%));', // 7
    'height: 16vw; width: 16vw; transform: translate(0vw, calc(80vh - 100%));', // 8
    'height: 16vw; width: 16vw; transform: translate(0vw, calc(40vh - 50%));', // 9
  ];

  let clr = 'blue';
  let pos: string | number = 1;

  if (isColorChange) {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    const clrIndex = Math.max(colors.indexOf(currentValues?.color ?? colors[0]), 0);
    
    if (clrIndex === colors.length - 1) {
      clr = colors[0];
    } else {
      clr = colors[clrIndex + 1];
    }
    pos = currentValues?.position ?? 1;
  } else if (isClockwise) {
    clr = currentValues?.color ?? 'blue';
    pos = typeof currentValues?.position !== 'undefined' ? currentValues.position + 1 : 1;
    if (pos === 5) {
      pos = 6;
    }
    if (pos > positions.length) {
      pos = 1;
    }
  } else if (isCounterClockwise) {
    clr = currentValues?.color ?? 'blue';
    pos = typeof currentValues?.position !== 'undefined' ? currentValues.position - 1 : 1;
    if (pos === 5) {
      pos = 4;
    }
    if (pos === 0) {
      pos = positions.length;
    }
  } else {
    [clr, pos] = hash.replace('#', '').split('-');
  }

  const position = pos ?? 1;
  const color = clr && clr.length > 0 ? clr : 'blue';
  const positionOrder = Math.max(0, Math.min(positions.length - 1, Number(position) - 1));
  const positionStr = positions[positionOrder];

  cssKey++;

  const className = `style-class${cssKey}`;

  const css = `.${className} {top: 0; left: 0;${positionStr} background-color: ${color};}`;

  return {css, className, values: {position: positionOrder + 1, color}};
}

export default function HoverColor() {

  const [hashVariables, setHashVariables] = useState<HashVariablesState>();
  useEffect(() => {
    function hashChangeHandler() {

      const nextVariables = hashToVariables(window.location.hash, hashVariables?.current?.values)
      if (!nextVariables) return;
      if (nextVariables.className === hashVariables?.prev.className) return;
      const nextVariablesState: HashVariablesState = {
        prev: hashVariables?.current ?? nextVariables,
        current: nextVariables,
      };
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
