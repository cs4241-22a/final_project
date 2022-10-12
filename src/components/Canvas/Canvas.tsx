import React, { createRef, useState, useRef, useEffect } from "react";
import { Box, Toolbar, Fab } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import {
  TransformWrapper,
  TransformComponent,
} from "@pronestor/react-zoom-pan-pinch";
import { ActiveEmoji } from "./ActiveEmoji";
import { GridMemo } from "./Grid";

export type CanvasProps = {
  canvasSize?: number;
  size: number;
};

let prevActiveElement: HTMLElement | undefined = undefined;
let zoom: Function | undefined = undefined;

export function Canvas({ size, canvasSize = 800 }: CanvasProps) {
  const [activeEmoji, setActiveEmoji] = useState("1f600");
  const [activeElement, setActiveElement] = useState<HTMLElement>();

  const grid = useRef([...Array(size * size)].map(() => ""));

  function updateEmoji(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (activeElement !== undefined) {
      const idx = parseInt(activeElement.id);

      grid.current[idx] = activeEmoji;

      activeElement.innerHTML = `<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${activeEmoji}.png" alt="grinning" class="__EmojiPicker__ epr-emoji-img" loading="eager" style="font-size: 12.8px; height: 12.8px; width: 12.8px;">`;
    }
  }
  useEffect(() => {
    if (prevActiveElement === undefined) {
      prevActiveElement = activeElement;
    }

    if (activeElement !== undefined) {
      prevActiveElement!.style.border = "none";
      activeElement!.style.border = "1px solid black";
      prevActiveElement = activeElement;
    }

    if (zoom !== undefined) {
      zoom(activeElement);
    }
  }, [activeElement]);

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
        doubleClick={{ disabled: true }}
        zoomAnimation={{ animationType: "easeOutQuad" }}
      >
        {({ zoomToElement }: any) => (
          <Box
            onClick={() => {
              if (zoom === undefined) {
                zoom = zoomToElement;
              }
            }}
            height="100%"
          >
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
                  setActiveElement={setActiveElement}
                />
              </Box>
            </TransformComponent>
          </Box>
        )}
      </TransformWrapper>
      <ActiveEmoji setActiveEmoji={setActiveEmoji} activeEmoji={activeEmoji} />
      {activeElement && (
        <Fab
          color="primary"
          aria-label="add"
          variant="extended"
          sx={{
            background: "white",
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          onClick={updateEmoji}
        >
          <CheckIcon sx={{ mr: 1 }} />
          Add emoji
        </Fab>
      )}
    </Box>
  );
}
