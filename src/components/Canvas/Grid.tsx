import React from "react";
import { Pixel } from "./Pixel";

export type GridProps = {
  grid: string[];
  size: number;
  activeEmoji: string;
  zoomToElement: Function;
};

function Grid({ grid, size, activeEmoji, zoomToElement }: GridProps) {
  return (
    <React.Fragment>
      {grid.map((e, i) => {
        console.log("here");
        return (
          <Pixel
            key={i}
            size={size}
            activeEmoji={activeEmoji}
            zoomToElement={zoomToElement}
          ></Pixel>
        );
      })}
    </React.Fragment>
  );
}

export const GridMemo = React.memo(Grid);
