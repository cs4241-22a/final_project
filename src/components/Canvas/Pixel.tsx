import React, { useRef, useState } from "react";
import { Box } from "@mui/material";
import { Emoji } from "emoji-picker-react";

const container = {
  "&:hover": {
    border: "1px solid grey",
  },
};

export type PixelProps = {
  initEmoji: string;
  size: number;
  setActiveElement: Function;
  index: number;
};

export function Pixel({
  initEmoji,
  size,
  setActiveElement,
  index,
}: PixelProps) {
  function update(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setActiveElement(event.currentTarget);
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      component="div"
      justifyContent="center"
      width={size}
      height={size}
      onClick={update}
      sx={container}
      id={`${index}`}
    >
      {initEmoji === " " ? null : (
        <Emoji unified={initEmoji} size={0.8 * size} />
      )}
    </Box>
  );
}
