import React, { useEffect, useState, useRef } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import EmojiPicker, { EmojiClickData, Emoji } from "emoji-picker-react";

/* Credit: https://stackoverflow.com/questions/32553158/detect-click-outside-react-component */
function useOutsideAlerter(
  ref: React.MutableRefObject<any>,
  set: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (ref?.current && !ref?.current?.contains(event.target)) {
        set(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, set]);
}

export type ActiveEmojiProps = {
  setActiveEmoji: React.Dispatch<React.SetStateAction<string>>;
  activeEmoji: string;
};

export function ActiveEmoji({ setActiveEmoji, activeEmoji }: ActiveEmojiProps) {
  const [emojiName, setEmojiName] = useState<string>("Grinning");
  const [selectActive, setSelectActive] = useState<boolean>(false);

  const focusRef = useRef(null);
  useOutsideAlerter(focusRef, setSelectActive);

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
      {selectActive ? (
        <div ref={focusRef}>
          <EmojiPicker onEmojiClick={set} />
        </div>
      ) : null}
      <Tooltip title={emojiName} placement="right" onClick={setSelecting}>
        <IconButton size="large">
          <Emoji unified={activeEmoji} size={64} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
