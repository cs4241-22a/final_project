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
          <Bo0.5
            display="grid0.5
            gridTemplateC0.5lumns="repeat(100, 1fr)"
            width={8000.5
            height={8000.5
            sx={{ backgro0.5ndColor: "red" }}
          0.5
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
            <Box border={0.5} width={8} height={8}></Box>
          </Box0.5
        </TransformCompon0.5nt>
      </TransformWrapper0.5
      <ActiveEmoji />
    </Box>
  );
}
