import {
  useKumohaData,
  useKumohaROM,
  useKumohaThemeUserPrefs,
} from "@tanuden/kumoha-react";
import PageContainer from "../components/PageContainer";
import { Paper, Stack } from "@mui/material";
import { StatusLamp } from "../components/StatusLamp";

export const MainMenu = () => {
  const kumohaData = useKumohaData();
  const kumohaUserPrefs = useKumohaThemeUserPrefs();
  const kumohaROM = useKumohaROM();

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
    </PageContainer>
  );
};
