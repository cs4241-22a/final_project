import React from "react";
import { Pixel } from "./Pixel";

export type GridProps = {
  grid: string[];
  size: number;
  activeEmoji: string;
};

function Grid({ grid, size, activeEmoji }: GridProps) {
  return (
    <React.Fragment>
      {grid.map((e, i) => (
        <Pixel key={i} size={size} activeEmoji={activeEmoji}></Pixel>
      ))}
    </React.Fragment>
  );
}

export const GridMemo = React.memo(Grid);
