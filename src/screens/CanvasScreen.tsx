import { useEffect } from "react";
import { ActiveEmoji, Header, Sidebar } from "../components";
import { Box, Toolbar } from "@mui/material";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function drawCanvas() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;

  if (canvas !== null) {
    const ctx = canvas.getContext("2d");

    if (ctx !== null) {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }
}

export function CanvasScreen() {
  useEffect(() => {
    drawCanvas();
  }, []);

  return (
    <Box className="CanvasScreen" sx={{ display: "flex" }}>
      <Header />
      <Sidebar />
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
          initialScale={4}
          centerOnInit={true}
          minScale={4}
          maxScale={10}
        >
          <TransformComponent
            wrapperStyle={{
              height: "100%",
              width: "100%",
            }}
          >
            <canvas id="canvas" width="200" height="200"></canvas>
          </TransformComponent>
        </TransformWrapper>
        <ActiveEmoji />
      </Box>
    </Box>
  );
}

// pointer-events="none"
