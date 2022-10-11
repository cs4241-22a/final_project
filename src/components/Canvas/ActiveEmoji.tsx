import React, { useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import EmojiPicker, { EmojiClickData, Emoji } from "emoji-picker-react";

export type ActiveEmojiProps = {
  setActiveEmoji: React.Dispatch<React.SetStateAction<string>>;
  activeEmoji: string;
};

export function ActiveEmoji({ setActiveEmoji, activeEmoji }: ActiveEmojiProps) {
  const [emojiName, setEmojiName] = useState<string>("Grinning");
  const [selectActive, setSelectActive] = useState<boolean>(false);

  function set(emojiData: EmojiClickData, event: MouseEvent) {
    setEmojiName(
      emojiData.names[0].replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
        letter.toUpperCase()
      )
    );
    setActiveEmoji(emojiData.unified);
  }

  function setSelecting(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setSelectActive(!selectActive);
  }

  return (
    <Box position="absolute" bottom={0} p={0} m="12px">
      {selectActive ? <EmojiPicker onEmojiClick={set} /> : null}
      <Tooltip title={emojiName} placement="right" onClick={setSelecting}>
        <IconButton size="large">
          <Emoji unified={activeEmoji} size={64} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
