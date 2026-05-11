import {
  useKumohaData,
  useKumohaROM,
  useKumohaThemeUserPrefs,
} from "@tanuden/kumoha-react";
import PageContainer from "../components/PageContainer";
import { Box, Grid, ListItem, Stack, Typography } from "@mui/material";
import { GREY } from "../theme";

function LightText({text, state, activeColor = "#ffffff"}) {

}

export const MainMenu = () => {
  const kumohaData = useKumohaData();
  const kumohaUserPrefs = useKumohaThemeUserPrefs();
  const kumohaROM = useKumohaROM();

  return (
    <PageContainer>
      <Grid container padding={2} spacing={2} justifyContent={"center"} alignItems={"center"} bgcolor={GREY[700]}>
        <Grid size={4} bgcolor={GREY[900]}>
          {/* Left large panel */}
          <Stack>
            <Typography variant="body1" padding={2}>A1</Typography>
            <ListItem>A2</ListItem>
            <ListItem>A3</ListItem>
            <ListItem>A4</ListItem>
            <ListItem>A5</ListItem>
            <ListItem>A6</ListItem>
            <ListItem>A7</ListItem>
          </Stack>
        </Grid>
        <Grid size={4} bgcolor={GREY[900]}>
          {/* Middle large panel */}
          <Stack>
            <ListItem>B1</ListItem>
            <ListItem>B2</ListItem>
            <ListItem>B3</ListItem>
            <ListItem>B4</ListItem>
            <ListItem>B5</ListItem>
            <ListItem>B6</ListItem>
            <ListItem>B7</ListItem>
          </Stack>
        </Grid>
        <Grid size={4}>
          {/* ATS and door panel */}
          <Grid container spacing={2} justifyContent={"center"} alignItems={"stretch"}>
            <Grid size={5} bgcolor={GREY[900]}>
              <Typography variant="body1" padding={2} sx={{writingMode: "vertical-rl", textOrientation: "upright"}}>
                ATS
              </Typography>
            </Grid>
            <Grid size={7} bgcolor={GREY[900]}>
              <ListItem>D</ListItem>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};
