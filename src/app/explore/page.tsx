'use client'

import { useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

const buildFiles = 'https://cdn.ramiverse.xyz/Public/Build'


function Explore() {
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: `${buildFiles}/Build.loader.js`,
    dataUrl: `${buildFiles}/Build.data`,
    frameworkUrl: `${buildFiles}/Build.framework.js`,
    codeUrl: `${buildFiles}/Build.wasm`,
  });

  // // We'll use a state to store the device pixel ratio.
  var [devicePixelRatio, setDevicePixelRatio] = useState(
    window.devicePixelRatio
  );

  useEffect(
    function () {
      document.body.style.overflow = "hidden"
      // A function which will update the device pixel ratio of the Unity
      // Application to match the device pixel ratio of the browser.
      const updateDevicePixelRatio = function () {
        setDevicePixelRatio(window.devicePixelRatio);
      };
      // A media matcher which watches for changes in the device pixel ratio.
      const mediaMatcher = window.matchMedia(
        `screen and (resolution: ${devicePixelRatio}dppx)`
      );
      // Adding an event listener to the media matcher which will update the
      // device pixel ratio of the Unity Application when the device pixel
      // ratio changes.
      mediaMatcher.addEventListener("change", updateDevicePixelRatio);
      return function () {
        // Removing the event listener when the component unmounts.
        mediaMatcher.removeEventListener("change", updateDevicePixelRatio);
      };
    },
    [devicePixelRatio]


  );

  const x = document.getElementById('_outer');
  var WIDTH = 1280;
  var HEIGHT = 720;

  if (x) {
    WIDTH = x.clientWidth;
    HEIGHT = x.clientHeight;
  }

  return (


    <div id="explorer" className="flex flex-col items-center">
      <div>
        <Unity
          unityProvider={unityProvider}
          style={{ width: WIDTH, height: HEIGHT }}
          devicePixelRatio={devicePixelRatio}
        />
      </div>
    </div>
  );
}

export default Explore;