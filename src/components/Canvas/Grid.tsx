import React, { useState } from "react";
import { Pixel } from "./Pixel";

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
        <Pixel
          key={i}
          size={size}
          activeEmoji={activeEmoji}
          setActiveElement={setActiveElement}
          index={i}
        ></Pixel>
      ))}
    </React.Fragment>
  );
}

export const GridMemo = React.memo(Grid);
