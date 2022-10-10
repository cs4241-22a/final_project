import React, { useEffect } from "react";

export function Canvas() {
  useEffect(() => {
    const canvas = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement | null;

    if (canvas !== null) {
      const ctx = canvas.getContext("2d");

      var imageData = ctx?.createImageData(200, 200);
    }
  }, []);

  return <canvas id="canvas" style={{ backgroundColor: "red" }}></canvas>;
}
