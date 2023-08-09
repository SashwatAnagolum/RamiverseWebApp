'use client'

import { useEffect } from "react";

export default function Explore() {
  useEffect(
    () => {
      document.body.setAttribute('style', 'text-align: center; padding: 0; border: 0; margin: 0;');
    }
  );

  return (
    <div className="flex flex-col items-center">
      <canvas
        id="unity-canvas"
        className="w-full"
        height={720}
        width={1280}
        style={{ width: 1280, height: 720 }}
      ></canvas>
      <script type="text/javascript" src="/Build/Build.loader.js" defer></script>
      <script type="text/javascript" src="/scripts/script.js" defer></script>
    </div>
  );
}