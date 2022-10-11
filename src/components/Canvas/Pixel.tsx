import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { Emoji } from "emoji-picker-react";

const boxSX = {
  textAlign: "left",
  "&:hover": {
    border: "1px solid grey",
    color: "gray",
  },
};

export type PixelProps = {
  size: number;
  activeEmoji: string;
};

export function Pixel({ size, activeEmoji }: PixelProps) {
  const [emoji, setEmoji] = useState("");

  function update(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    // check for update here
    setEmoji(activeEmoji);
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width={size}
      height={size}
      onClick={update}
      sx={boxSX}
    >
      <Emoji unified={emoji} size={size * 0.8} />
    </Box>
  );
}
