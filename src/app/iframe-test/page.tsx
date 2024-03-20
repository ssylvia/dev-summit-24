'use client'
import { useEffect, useRef, useState } from "react";

export default function IframeTest() {

  return (
    <>
    <head>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-YFFYT73DH3"></script>
      <script dangerouslySetInnerHTML={{__html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-YFFYT73DH3');
      `}}>
      </script>
    </head>
    <main className="p-4 flex justify-center">
      <iframe src="https://storymaps.arcgis.com/stories/76db18a4717f42229b227f565371a6f1"></iframe>
      <style jsx>{`
        iframe {
          width: 100%;
          height: 80vh;
        }
      `}</style>
    </main>
    </>
  );
}
