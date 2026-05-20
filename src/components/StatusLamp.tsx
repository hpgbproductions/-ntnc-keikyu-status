import { Box, Stack, SxProps, Typography, useTheme } from "@mui/material";
import { ReactNode, useMemo } from "react";

export const StatusLampCircle = ({
  currentColor,
}: {
  currentColor: string;
}) => {
  return (
    <Box
      sx={{
        width: 16,
        height: 16,
        borderRadius: 9999,
        backgroundColor: currentColor,
      }}
    />
  );
};

export const StatusLamp = ({
  label,
  color,
  active,
  variant = "horizontal",
  labelUseColor,
  textSx,
}: {
  label: string | ReactNode;
  color: "green" | "red" | "yellow";
  active: boolean;
  variant?: "horizontal" | "vertical";
  labelUseColor?: boolean;
  textSx?: SxProps;
}) => {
  const theme = useTheme();
  const currentColor = useMemo(() => {
    if (!active) {
      return "grey.800";
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
    return "grey.800";
  }, [active, color]);

  return (
    <Stack
      direction={variant === "vertical" ? "column" : "row"}
      spacing={2}
      sx={{
        height:
          variant === "vertical"
            ? "100%"
            : `calc(${theme.typography.h3.fontSize} + 1.5rem)`,
        alignItems: "center",
        color: currentColor,
      }}
    >
      <Stack>
        {variant === "horizontal" ? (
          <Stack spacing={1.5}>
            <StatusLampCircle currentColor={currentColor} />
            <StatusLampCircle currentColor={currentColor} />
          </Stack>
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
      <Box
        sx={{
          flexGrow: 1,
          ...textSx,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 400,
            writingMode: variant === "vertical" ? "vertical-lr" : undefined,
            textOrientation: variant === "vertical" ? "upright" : undefined,

            textAlign: "justify",
            // textJustify: variant === "vertical" ? "distribute" : undefined,

            height: variant === "vertical" ? "170px" : "auto",

            textAlignLast: "justify",
            color: labelUseColor ? currentColor : "common.white",
          }}
        >
          {label}
        </Typography>
      </Box>
    </Stack>
  );
};
