import {
  useKumohaData,
  useKumohaROM,
  useKumohaThemeUserPrefs,
} from "@tanuden/kumoha-react";
import PageContainer from "../components/PageContainer";
import { Paper, Stack } from "@mui/material";
import { StatusLamp } from "../components/StatusLamp";
import { useEffect, useMemo, useState } from "react";

import {
  getDefaultIndicatorValues,
  updateIndicatorValues,
} from "../utils/indicator-values";

export type CarHistoryRecord = {
  bc: number[];
  current: number[];
  pNotch: number;
  bNotch: number;
};
export type CarHistory = CarHistoryRecord[];

export const MainMenu = () => {
  const kumohaData = useKumohaData();
  const kumohaUserPrefs = useKumohaThemeUserPrefs();
  const kumohaROM = useKumohaROM();

  const [carHistory, setCarHistory] = useState<CarHistory>([]);

  const indicators = useMemo(() => {
    const inGame =
      kumohaData.gameState.screen === "MainGame" ||
      kumohaData.gameState.screen === "MainGame_Pause";

    if (!inGame) {
      return getDefaultIndicatorValues();
    }

    return (
      updateIndicatorValues({
        history: carHistory,
        direction: kumohaData.gameData.diagram.direction,
        cars: kumohaData.gameData.train.cars,
        pNotch: kumohaData.gameData.controllerState.pNotch,
        bNotch: kumohaData.gameData.controllerState.bNotch,
        combinedNotch: kumohaData.gameData.controllerState.notch,
        switches: kumohaData.gameData.train.switches,
        lamps: kumohaData.gameData.train.lamps,
      }) || getDefaultIndicatorValues()
    );
  }, [
    kumohaData.gameState.screen,
    kumohaData.gameData.diagram.direction,
    kumohaData.gameData.train.cars,
    kumohaData.gameData.train.switches,
    kumohaData.gameData.train.lamps,
    kumohaData.gameData.controllerState.pNotch,
    kumohaData.gameData.controllerState.bNotch,
    kumohaData.gameData.controllerState.notch,
    carHistory,
  ]);

  useEffect(() => {
    if (kumohaData.gameState.screen !== "MainGame") return;

    const newRecord: CarHistoryRecord = {
      bc: kumohaData.gameData.train.cars.map((car) => car.bcPressure),
      current: kumohaData.gameData.train.cars.map((car) => car.amperage),
      pNotch: kumohaData.gameData.controllerState.pNotch,
      bNotch: kumohaData.gameData.controllerState.bNotch,
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCarHistory((prev) => [...prev, newRecord]);

    // Ensure only last 5 records are kept
    setCarHistory((prev) => prev.slice(-5));
  }, [kumohaData]);

  return (
    <PageContainer>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          p: 2,
          flexGrow: 1,
        }}
      >
        <Stack
          component={Paper}
          sx={{
            height: "100%",
          }}
        >
          <StatusLamp label="受給電" color="green" active={true} />
          <StatusLamp label="マスコン-N" color="green" active={true} />
          <StatusLamp label="空転" color="green" active={true} />
          <StatusLamp label="EB回路開放" color="green" active={true} />
          <StatusLamp label="保護" color="green" active={true} />
          <StatusLamp label="回生" color="green" active={true} />
          <StatusLamp label="前照灯上向" color="green" active={true} />
        </Stack>
        <Stack
          component={Paper}
          sx={{
            height: "100%",
          }}
        >
          <StatusLamp label="緊急スイッチ" color="green" active={true} />
          <StatusLamp label="SIV無電圧" color="green" active={true} />
          <StatusLamp label="B-不緩解" color="green" active={true} />
          <StatusLamp label="主差回路振地電流" color="green" active={true} />
          <StatusLamp label="耐雪ブレーキ" color="green" active={true} />
          <StatusLamp label="非常通報" color="green" active={true} />
          <StatusLamp label="E B" color="green" active={true} />
        </Stack>
        <Stack
          sx={{
            height: "100%",
          }}
        >
          <StatusLamp
            label="ATS開放"
            color="green"
            active={true}
            variant="vertical"
          />
        </Stack>
        <Stack
          sx={{
            height: "100%",
          }}
        >
          <StatusLamp
            label="戸閉"
            color="green"
            active={true}
            variant="vertical"
          />
        </Stack>
      </Stack>
      <h2>{JSON.stringify(indicators, undefined, 2)}</h2>
    </PageContainer>
  );
};
