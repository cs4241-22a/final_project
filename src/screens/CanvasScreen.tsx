import { Canvas, Header, Sidebar } from "../components";
import { Box, Toolbar } from "@mui/material";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export function CanvasScreen() {
  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <Sidebar />
      <Box component="main">
        <Toolbar />
        <TransformWrapper
          initialScale={1}
          initialPositionX={0}
          initialPositionY={0}
        >
          <TransformComponent>
            <Canvas />
          </TransformComponent>
        </TransformWrapper>
      </Box>
    </Box>
  );
}
