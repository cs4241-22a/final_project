import { useState } from "react";
import { ActiveEmoji } from "./ActiveEmoji";
import { Box, Toolbar, Typography } from "@mui/material";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "@pronestor/react-zoom-pan-pinch";

export function Canvas() {
  const [zoom, setZoom] = useState<number>(1);

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
        initialScale={1}
        centerOnInit={true}
        minScale={1}
        maxScale={5}
        onZoomStop={setZoomScale}
      >
        <TransformComponent
          wrapperStyle={{
            height: "100%",
            width: "100%",
          }}
        >
          <Box
            display="grid"
            gridTemplateColumns="repeat(100, 1fr)"
            width={800}
            height={800}
            sx={{ backgroundColor: "red" }}
          ></Box>
        </TransformComponent>
      </TransformWrapper>
      <ActiveEmoji />
    </Box>
  );
}
