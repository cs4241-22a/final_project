import { UserCard } from "./UserCard";
import { Drawer, Box, List, Toolbar, Typography } from "@mui/material";

export function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 300,
        [`& .MuiDrawer-paper`]: { width: 300, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box p="18px">
        <Typography variant="h6" component="div" align="center">
          Players online:
        </Typography>
        <List>
          {["User one", "User two"].map((text, index) => (
            <UserCard user={text} />
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
