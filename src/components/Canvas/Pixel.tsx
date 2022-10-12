import { useState } from "react";
import { Box } from "@mui/material";
import { Emoji } from "emoji-picker-react";

const container = {
  "&:hover": {
    border: "1px solid grey",
  },
};

export type PixelProps = {
  size: number;
  activeEmoji: string;
  zoomToElement: Function;
};

export function Pixel({ size, activeEmoji, zoomToElement }: PixelProps) {
  const [emoji, setEmoji] = useState("");

  function update(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    zoomToElement(event.currentTarget);
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width={size}
      height={size}
      onClick={update}
      sx={container}
    >
      <Emoji unified={emoji} size={size * 0.8} />
    </Box>
  );
}
