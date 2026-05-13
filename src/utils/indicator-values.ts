import { useKumohaInternalStore } from "@tanuden/kumoha-react";
import { CarHistory } from "../screens/MainMenu";
import { CarState, Direction, Lamps, Switches } from "opentetsu";

export function getDefaultIndicatorValues() {
  const indicatorValues = {
    masconN: false,
    slip: false,
    regen: false,
    highBeams: false,
    snowproofBrake: false,
    emergencyBrake: false,
    doorsClosed: false,
  };

  return indicatorValues;
}

{
  /*
    updateIndicatorValues

    Generate an object with boolean parameters for supported indicators
        masconN         Mascon (one-handle trains) or power (two-handle trains) on neutral position.
        slip            Wheel slip detected as a sudden change in amps or BC pressure when notch does not change.
        regen           Regenerative brake detected as negative current.
        highBeams
        snowproofBrake  Snowproof brake detected as stable BC without brake input.
        emergencyBrake
        doorsClosed
    Or returns null in an invalid state, such as when not in game.
*/
}

export function updateIndicatorValues({
  history,
  direction,
  cars,
  pNotch,
  bNotch,
  combinedNotch,
  switches,
  lamps,
}: {
  history: CarHistory;
  direction: Direction;
  cars: CarState[];
  pNotch: number;
  bNotch: number;
  combinedNotch: number;
  switches: Switches;
  lamps: Lamps;
}) {
  const kumohaROM = useKumohaInternalStore.getState().romData;

  const indicatorValues = getDefaultIndicatorValues();

  const leadCar = {
    series: "",
    number: -1,
    motor: false,
    twoHandle: false,
  };

  //#region Set train parameters and check train

  if (direction === "Outbound") {
    // Towards Tatehama
    leadCar.number = 1;
  } else if (direction === "Inbound") {
    // Away from Tatehama, lead car number is equal to number of cars
    leadCar.number = cars.length;
  }

  if (leadCar.number < 1 || leadCar.number > cars.length) {
    // Invalid state
    return null;
  }

  leadCar.series = cars[leadCar.number - 1].model;
  leadCar.motor = cars[leadCar.number - 1].properties.motor;
  leadCar.twoHandle = !kumohaROM.rollingstock[leadCar.series].hasHoldBrake;

  //#endregion

  // masconN
  if (leadCar.twoHandle) {
    indicatorValues.masconN = pNotch == 0;
  } else {
    indicatorValues.masconN = combinedNotch == 0;
  }

  // TODO slip

  // regen
  indicatorValues.regen = false;
  cars.forEach((element) => {
    if (element.amperage < 0) {
      indicatorValues.regen = true;
    }
  });

  // TODO snowproofBrake

  // Simple light indicators
  indicatorValues.highBeams = switches.highBeam;
  indicatorValues.emergencyBrake = lamps.eBrake;
  indicatorValues.doorsClosed = lamps.pilot;

  return indicatorValues;
}
