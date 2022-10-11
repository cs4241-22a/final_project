import { useState, useEffect } from "react";
import { ActiveEmoji } from "./ActiveEmoji";
import { Box, Toolbar } from "@mui/material";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "@pronestor/react-zoom-pan-pinch";

export function Canvas() {
  const [zoom, setZoom] = useState<number>(1);

  function getPixel(canvas: HTMLCanvasElement, event: any) {
    const area = canvas.getBoundingClientRect();
    const x = event.clientX - area.left;
    const y = event.clientY - area.top;

    console.log(`1 This is ${event.clientX} and ${event.clientY}`);
    console.log(`2 This is ${area.left} and ${area.top}`);
    console.log(`3 This is ${x} and ${y}`);
    const ctx = canvas.getContext("2d");
    if (ctx !== null) {
      ctx.fillStyle = "red";
      ctx.fillRect(x, y, 8, 8);
    }
  }

  function enableCanvas() {
    const canvas = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement | null;
    if (canvas !== null) {
      canvas.style.border = "1px solid #000";
      canvas.addEventListener("mousedown", function (event) {
        getPixel(this, event);
      });

      const ctx = canvas.getContext("2d");
      if (ctx !== null) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }

  function setZoomScale(
    ref: ReactZoomPanPinchRef,
    event: TouchEvent | MouseEvent
  ) {
    setZoom(ref.state.scale);
  }

  useEffect(() => {
    enableCanvas();
  }, []);

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        height: "100vh",
      }}
    >
      <Toolbar />
      <TransformWrapper
        initialScale={1}
        centerOnInit={true}
        minScale={1}
        maxScale={3}
        onZoomStop={setZoomScale}
      >
        <TransformComponent
          wrapperStyle={{
            height: "100%",
            width: "100%",
          }}
        >
          <canvas id="canvas" width="800" height="800"></canvas>
        </TransformComponent>
      </TransformWrapper>
      <ActiveEmoji />
    </Box>
  );
}
