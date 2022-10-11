import { Canvas, Header, Sidebar } from "../components";
import { Box } from "@mui/material";

export function CanvasScreen() {
  return (
    <Box display="flex">
      <Header />
      <Sidebar />
      <Canvas size={50} />
    </Box>
  );
}
