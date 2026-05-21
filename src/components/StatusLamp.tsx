import {
  Box,
  darken,
  Stack,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { ReactNode, useMemo } from "react";

export const StatusLampCircle = ({
  active,
  currentColor,
}: {
  active: boolean;
  currentColor: string;
}) => {
  return (
    <Box
      sx={{
        width: 16,
        height: 16,
        borderRadius: 9999,
        backgroundColor: currentColor,

        transition: "background-color 0.1s ease, box-shadow 0.1s ease",

        boxShadow: active
          ? `0 0 5px ${currentColor}, 0 0 10px ${currentColor}`
          : undefined,
      }}
    />
  );
};

type StatusLampColor = "green" | "red" | "yellow" | "blue" | "white";

const getColor = ({
  active,
  text,
  color,
  theme,
}: {
  active: boolean;
  text: boolean;
  color: StatusLampColor | undefined;
  theme: Theme;
}) => {
  if (!active) {
    // return text ? "common.white" : "grey.800";
    return text
      ? theme.palette.grey[400]
      : darken(theme.palette.grey[800], 0.3);
  }
  if (color === "white") {
    return theme.palette.common.white;
  }
  if (color === "green") {
    return theme.palette.success.main;
  }
  if (color === "red") {
    return theme.palette.error.main;
  }
  if (color === "yellow") {
    return theme.palette.warning.main;
  }
  if (color === "blue") {
    return theme.palette.info.main;
  }
  return theme.palette.common.white;
};

export const StatusLamp = ({
  label,
  color,
  secondaryColor = "white",
  active,
  variant = "horizontal",
  textSx,
}: {
  label: string | ReactNode;
  color?: StatusLampColor;
  secondaryColor?: StatusLampColor;
  active: boolean;
  variant?: "horizontal" | "vertical";
  textSx?: SxProps;
}) => {
  const theme = useTheme();

  const currentColor = useMemo(() => {
    return getColor({
      active,
      text: false,
      color,
      theme,
    });
  }, [active, color, theme]);
  const currentSecondaryColor = useMemo(() => {
    return getColor({
      active,
      text: true,
      color: secondaryColor,
      theme,
    });
  }, [active, secondaryColor, theme]);

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
            <StatusLampCircle currentColor={currentColor} active={active} />
            <StatusLampCircle currentColor={currentColor} active={active} />
          </Stack>
        ) : (
          <>
            <Box
              sx={{
                width: "40px",
                height: "15px",
                backgroundColor: currentColor,
                transition: "background-color 0.1s ease, box-shadow 0.1s ease",
                boxShadow: active
                  ? `0 0 5px ${currentColor}, 0 0 10px ${currentColor}`
                  : undefined,
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
            color: secondaryColor ? currentSecondaryColor : currentColor,

            transition: "color 0.1s ease, text-shadow 0.1s ease",
            textShadow: active
              ? `0 0 8px ${secondaryColor ? currentSecondaryColor : currentColor}`
              : undefined,
          }}
        >
          {label}
        </Typography>
      </Box>
    </Stack>
  );
};
