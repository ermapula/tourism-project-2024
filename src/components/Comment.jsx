import { Star } from "@mui/icons-material";
import { Avatar, Box, Stack, Typography } from "@mui/material";

export default function Comment(params) {
  return (
    <>
      <Stack direction="row" gap={2} alignItems="center" bgcolor={"var(--light-blue)"} p={2} borderRadius={12}>
        <Avatar />
        <Box>
          <Typography fontSize={14} variant="body" marginRight={3}>Username</Typography>
          <Typography fontSize={14} variant="body" marginRight={3}>1.10.2024</Typography>
          <Typography fontSize={14} variant="body"><Star fontSize="12" />4.7 </Typography>
          <Typography>Nice tour! I recommend it!</Typography>
        </Box>
      </Stack>
    </>
  ) 
}
