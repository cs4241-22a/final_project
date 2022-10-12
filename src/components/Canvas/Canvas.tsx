import { useState, useRef } from "react";
import { ActiveEmoji } from "./ActiveEmoji";
import { GridMemo } from "./Grid";
import { Box, Toolbar } from "@mui/material";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "@pronestor/react-zoom-pan-pinch";

export type CanvasProps = {
  canvasSize?: number;
  size: number;
};

export function Canvas({ size, canvasSize = 800 }: CanvasProps) {
  const [activeEmoji, setActiveEmoji] = useState<string>("1f600");
  const [zoom, setZoom] = useState<number>(0);
  const grid = useRef([...Array(size * size)].map(() => ""));

  function setZoomScale(
    ref: ReactZoomPanPinchRef,
    event: TouchEvent | MouseEvent
  ) {
    setZoom(ref.state.scale);
  }

  return (
    <Box
      component="main"
      display="flex"
      flexDirection="column"
      flexGrow={1}
      height="100vh"
    >
      <Toolbar />
      <TransformWrapper
        initialScale={3}
        minScale={0.75}
        maxScale={7}
        onZoomStop={setZoomScale}
      >
        {({ zoomIn, zoomToElement }: any) => (
          <TransformComponent
            wrapperStyle={{
              height: "100%",
              width: "100%",
              backgroundColor: "#333333",
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
                zoomToElement={zoomToElement}
              />
            </Box>
          </TransformComponent>
        )}
      </TransformWrapper>
      <ActiveEmoji setActiveEmoji={setActiveEmoji} activeEmoji={activeEmoji} />
    </Box>
  );
}
