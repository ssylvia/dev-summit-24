'use client'
import { useEffect, useRef, useState } from "react";

export default function IframeTest() {

  return (
    // @ts-ignore
    <main className="p-4 flex justify-center">
      <iframe src="https://storymaps.arcgis.com/stories/7243ab64aafa4f7c821cc872085fec0e"></iframe>
      <style jsx>{`
        iframe {
          width: 100%;
          height: 80vh;
        }
      `}</style>
    </main>
  );
}
