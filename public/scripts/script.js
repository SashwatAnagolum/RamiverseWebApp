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

    console.log("reachable");

    document.body.style.textAlign = "left";
}

createUnityInstance(document.querySelector("#unity-canvas"), {
    dataUrl: "/Build/Build.data",
    frameworkUrl: "/Build/Build.framework.js",
    codeUrl: "/Build/Build.wasm",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "DefaultCompany",
    productName: "AddressablesTesting",
    productVersion: "0.1",
    matchWebGLToCanvasSize: true, // Uncomment this to separately control WebGL canvas render size and DOM element size.
    devicePixelRatio: 1, // Uncomment this to override low DPI rendering on high DPI displays.
});
