import { Paper, Stack, SxProps } from "@mui/material";
import { ReactNode } from "react";

export const StatusGroup = ({
  children,
  sx,
}: {
  children: ReactNode;
  outlined?: boolean;
  sx?: SxProps;
}) => {
  return (
    <Stack
      component={Paper}
      spacing={1}
      sx={{
        borderWidth: 2,
        borderRadius: 8,
        width: "40%",
        height: "100%",
        p: 2,
        ...sx,
      }}
    >
      {children}
    </Stack>
  );
};
