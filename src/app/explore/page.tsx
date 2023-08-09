'use client'

import { useEffect } from "react";

export default function Explore() {
  useEffect(
    () => {
      document.body.setAttribute('style', 'text-align: center; padding: 0; border: 0; margin: 0;');
    }
  );

  return (
    <div className="">
      <canvas
        id="unity-canvas"
        className="w-full"
        height={720}
        width={1280}
        style={{ width: 1280, height: 720 }}
      ></canvas>
      <script type="text/javascript" src="/Build/Build.loader.js"></script>
      <script type="text/javascript" src="/scripts/script.js"></script>
    </div>
  );
}

/*

<!DOCTYPE html>
<html lang="en-us">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Unity WebGL Player | AddressablesTesting</title>
  </head>
  <body style="text-align: center; padding: 0; border: 0; margin: 0;">
    <canvas id="unity-canvas" width=1280 height=720 style="width: 1280px; height: 720px; background: #828080"></canvas>
    <script src="Build/Build.loader.js"></script>
    <script>
      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        // Mobile device style: fill the whole browser client area with the game canvas:
        var meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
        document.getElementsByTagName('head')[0].appendChild(meta);

        var canvas = document.querySelector("#unity-canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.position = "fixed";

        document.body.style.textAlign = "left";
      }

      createUnityInstance(document.querySelector("#unity-canvas"), {
        dataUrl: "Build/Build.data",
        frameworkUrl: "Build/Build.framework.js",
        codeUrl: "Build/Build.wasm",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "DefaultCompany",
        productName: "AddressablesTesting",
        productVersion: "0.1",
        matchWebGLToCanvasSize: true, // Uncomment this to separately control WebGL canvas render size and DOM element size.
        devicePixelRatio: 1, // Uncomment this to override low DPI rendering on high DPI displays.
      });
    </script>
  </body>
</html>

*/