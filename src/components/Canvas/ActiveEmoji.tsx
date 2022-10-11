import React, { useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import EmojiPicker, { EmojiClickData, Emoji } from "emoji-picker-react";

export function ActiveEmoji() {
  const [selectedEmoji, setSelectedEmoji] = useState<string>("1f600");
  const [emojiName, setEmojiName] = useState<string>("Grinning");
  const [selectActive, setSelectActive] = useState<boolean>(false);

  function setEmoji(emojiData: EmojiClickData, event: MouseEvent) {
    setEmojiName(
      emojiData.names[0].replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
        letter.toUpperCase()
      )
    );
    setSelectedEmoji(emojiData.unified);
  }

  function setSelecting(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setSelectActive(!selectActive);
  }

  return (
    <Box position="absolute" bottom={0} p={0} m="12px">
      {selectActive ? <EmojiPicker onEmojiClick={setEmoji} /> : null}
      <Tooltip title={emojiName} placement="right" onClick={setSelecting}>
        <IconButton size="large">
          <Emoji unified={selectedEmoji} size={64} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
