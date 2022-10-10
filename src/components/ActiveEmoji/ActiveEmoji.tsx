import { IconButton, Typography } from "@mui/material";

export function ActiveEmoji() {
  return (
    <IconButton
      size="large"
      sx={{ position: "absolute", bottom: 0, p: 0, m: "12px" }}
    >
      <Typography variant="h2">😃</Typography>
    </IconButton>
  );
}
