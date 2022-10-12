import React from "react";
import { PixelMemo } from "./Pixel";

export type GridProps = {
  grid: string[];
  size: number;
  activeEmoji: string;
  setActiveElement: Function;
};

function Grid({ grid, size, activeEmoji, setActiveElement }: GridProps) {
  return (
    <React.Fragment>
      {grid.map((e, i) => (
        <PixelMemo
          key={i}
          index={i}
          initEmoji=""
          initUser=""
          size={size}
          setActiveElement={setActiveElement}
        ></PixelMemo>
      ))}
    </React.Fragment>
  );
}

export const GridMemo = React.memo(Grid);
