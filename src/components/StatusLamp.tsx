import { Box, Stack, Typography } from "@mui/material";

export const StatusLamp = ({
  label,
  color,
  active,
  variant = "horizontal",
}: {
  label: string;
  color: string;
  active: boolean;
  variant?: "horizontal" | "vertical";
}) => {
  return (
    <Stack direction="row">
      <Box></Box>
      <Box>
        <Typography>{label}</Typography>
      </Box>
    </Stack>
  );
};
