import { Avatar, Card, CardHeader } from "@mui/material";

export type UserCardProps = {
  user: string;
};

export function UserCard({ user }: UserCardProps) {
  return (
    <Card
      className="UserCard"
      component="div"
      sx={{ borderRadius: "10px", mb: "10px" }}
    >
      <CardHeader
        avatar={<Avatar alt="user icon" sx={{ width: 30, height: 30 }} />}
        title={user}
        titleTypographyProps={{ fontSize: 16 }}
        sx={{ p: "10px" }}
      />
    </Card>
  );
}
