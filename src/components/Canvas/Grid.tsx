import React, { createRef, useRef } from "react";
import { Pixel } from "./Pixel";
import { Box } from "@mui/system";

export type GridProps = {
  grid: string[];
  size: number;
  activeEmoji: string;
  setActiveElement: Function;
};

function Grid({ grid, size, activeEmoji, setActiveElement }: GridProps) {
  return (
    <React.Fragment>
      {grid.map((e, i) => {
        return (
          <Pixel
            key={i}
            index={i}
            initEmoji=""
            initUser=""
            size={size}
            setActiveElement={setActiveElement}
          ></Pixel>
        );
      })}
    </React.Fragment>
  );
}

export const GridMemo = React.memo(Grid);
