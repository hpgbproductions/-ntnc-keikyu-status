import { useKumohaData } from "@tanuden/kumoha-react";
import PageContainer from "../components/PageContainer";
import { Stack, useTheme } from "@mui/material";
import { StatusLamp } from "../components/StatusLamp";
import { useEffect, useMemo, useState } from "react";

import {
  getDefaultIndicatorValues,
  updateIndicatorValues,
} from "../utils/indicator-values";
import { StatusGroup } from "../components/StatusGroup";

export type CarHistoryRecord = {
  bc: number[];
  current: number[];
  pNotch: number;
  bNotch: number;
};
export type CarHistory = CarHistoryRecord[];

export const MainMenu = () => {
  const kumohaData = useKumohaData();
  // const kumohaUserPrefs = useKumohaThemeUserPrefs();
  // const kumohaROM = useKumohaROM();

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
    <PageContainer
      sx={{
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        direction="row"
        spacing={4}
        sx={{
          alignItems: "center",
        }}
      >
        <Stack
          spacing={3}
          direction="row"
          sx={{
            borderWidth: 2,
            border: 2,
            borderRadius: 8,
          }}
        >
          <StatusGroup
            outlined
            sx={{
              width: "250px",
            }}
          >
            <StatusLamp label="受給電" color="green" active={false} />
            <StatusLamp
              label={<>マスコン&ndash; N</>}
              color="green"
              active={indicators.masconN}
            />
            <StatusLamp label="空転" color="green" active={false} />
            <StatusLamp label="EB回路開放" color="green" active={false} />
            <StatusLamp label="保護" color="green" active={false} />
            <StatusLamp label="回生" color="green" active={indicators.regen} />
            <StatusLamp
              label="前照灯上向"
              color="green"
              active={indicators.highBeams}
            />
          </StatusGroup>
          <StatusGroup
            outlined
            sx={{
              width: "250px",
            }}
          >
            <StatusLamp label="緊急スイッチ" color="green" active={false} />
            <StatusLamp label="SIV無電圧" color="green" active={false} />
            <StatusLamp
              label={<>B &ndash; 不緩解</>}
              color="green"
              active={false}
            />
            <StatusLamp
              label={
                <>
                  主差回路振地
                  <br />
                  差電流
                </>
              }
              color="green"
              active={false}
              textSx={{
                fontSize: "0.8rem",
              }}
            />
            <StatusLamp
              label="耐雪ブレーキ"
              color="green"
              active={indicators.snowproofBrake}
            />
            <StatusLamp label="非常通報" color="green" active={false} />
            <StatusLamp
              label="E B"
              color="green"
              active={indicators.emergencyBrake}
            />
          </StatusGroup>
        </Stack>
        <Stack direction="row" spacing={3}>
          <StatusGroup>
            <StatusLamp
              label="ATS開放"
              color="green"
              active={false}
              variant="vertical"
              labelUseColor
            />
          </StatusGroup>
          <StatusGroup>
            <StatusLamp
              label="戸閉"
              color="green"
              active={indicators.doorsClosed}
              variant="vertical"
              labelUseColor
            />
          </StatusGroup>
        </Stack>
      </Stack>
      {/* <h2>{JSON.stringify(indicators, undefined, 2)}</h2> */}
    </PageContainer>
  );
};
