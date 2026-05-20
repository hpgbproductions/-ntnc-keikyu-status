import { Box, Stack, Typography } from "@mui/material";
import { useMemo } from "react";

export const StatusLamp = ({
  label,
  color,
  active,
  variant = "horizontal",
}: {
  label: string;
  color: "green" | "red" | "yellow";
  active: boolean;
  variant?: "horizontal" | "vertical";
}) => {
  const currentColor = useMemo(() => {
    if (!active) {
      return "text.disabled";
    }
    if (color === "green") {
      return "success.main";
    }
    if (color === "red") {
      return "error.main";
    }
    if (color === "yellow") {
      return "warning.main";
    }
    return "text.primary";
  }, [active, color]);

  return (
    <Stack
      direction={variant === "vertical" ? "column" : "row"}
      spacing={1}
      sx={{
        alignItems: "center",
        color: currentColor,
      }}
    >
      <Stack spacing={-1}>
        {variant === "horizontal" ? (
          <>
            <Box>●</Box>
            <Box>●</Box>
          </>
        ) : (
          <>
            <Box
              sx={{
                width: "40px",
                height: "15px",
                backgroundColor: currentColor,
              }}
            />
          </>
        )}
      </Stack>
      <Box>
        <Typography
          variant="h3"
          sx={{
            color: currentColor,
            fontWeight: 400,
            writingMode: variant === "vertical" ? "vertical-lr" : undefined,
            textOrientation: variant === "vertical" ? "upright" : undefined,
          }}
        >
          {label}
        </Typography>
      </Box>
    </Stack>
  );
};
