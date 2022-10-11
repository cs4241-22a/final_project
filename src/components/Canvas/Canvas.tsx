import { useState, useRef, useEffect } from "react";
import { ActiveEmoji } from "./ActiveEmoji";
import { GridMemo } from "./Grid";
import { Box, Toolbar } from "@mui/material";
import {
  TransformWrapper,
  TransformComponent,
} from "@pronestor/react-zoom-pan-pinch";

export type CanvasProps = {
  canvasSize?: number;
  size: number;
};

export function Canvas({ size, canvasSize = 800 }: CanvasProps) {
  const grid = useRef([...Array(size * size)].map(() => ""));
  const [activeEmoji, setActiveEmoji] = useState("1f600");

  return (
    <Box
      component="main"
      display="flex"
      flexDirection="column"
      flexGrow={1}
      height="100vh"
    >
      <Toolbar />
      <TransformWrapper initialScale={1} minScale={1} maxScale={8}>
        <TransformComponent
          wrapperStyle={{
            height: "100%",
            width: "100%",
          }}
        >
          <Box
            display="grid"
            gridTemplateRows={`repeat(${size}, 1fr)`}
            gridTemplateColumns={`repeat(${size}, 1fr)`}
            width={canvasSize}
            height={canvasSize}
            border="1px solid black"
            boxShadow={3}
            sx={{ backgroundColor: "white" }}
          >
            <GridMemo
              grid={grid.current}
              size={canvasSize / size}
              activeEmoji={activeEmoji}
            />
          </Box>
        </TransformComponent>
      </TransformWrapper>
      <ActiveEmoji setActiveEmoji={setActiveEmoji} activeEmoji={activeEmoji} />
    </Box>
  );
}
