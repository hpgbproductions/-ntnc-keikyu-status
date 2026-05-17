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

  //#region Train parameters and check

  if (direction === "Outbound") {
    // Towards Tatehama
    leadCar.number = 1;
  } else if (direction === "Inbound") {
    // Away from Tatehama, lead car number is equal to number of cars
    leadCar.number = cars.length;
  }

  // State is invalid if there is no train history yet, or lead car number out of bounds
  if (history.length < 1 || leadCar.number < 1 || leadCar.number > cars.length) {
    return null;
  }

  leadCar.series = cars[leadCar.number - 1].model;
  leadCar.motor = cars[leadCar.number - 1].properties.motor;
  leadCar.twoHandle = !kumohaROM.rollingstock[leadCar.series].hasHoldBrake;

  //#endregion

  // reconstruct performance arrays: number[carNum][entry]
  const bcHistory = new Array(cars.length);
  const currentHistory = new Array(cars.length);

  for (let car = 0; car < cars.length; car++) {
    bcHistory[car] = new Array(history.length);
    currentHistory[car] = new Array(history.length);

    for (let entry = 0; entry < history.length; entry++) {
      bcHistory[car][entry] = history[entry].bc[car];
      currentHistory[car][entry] = history[entry].current[car];
    }
  }

  // reconstruct notch arrays: number[entry]
  const bNotchHistory = history.map((x) => x.bNotch);
  const pNotchHistory = history.map((x) => x.pNotch);

  // masconN
  if (leadCar.twoHandle) {
    indicatorValues.masconN = pNotch == 0;
  } else {
    indicatorValues.masconN = combinedNotch == 0;
  }

  // slip
  // When there is a constant large input, check for spikes
  // Ignore during changing input as those cause variation as well
  const largeInput = Math.min(...pNotchHistory) >= 3 || Math.min(...bNotchHistory) >= 3;
  const constantInput = Math.min(...pNotchHistory) === Math.max(...pNotchHistory) && Math.min(...bNotchHistory) === Math.max(...bNotchHistory);

  if (largeInput && constantInput) {
    // Assume slip if the per-car history fluctuates by these amounts.
    // Current variation is very small in normal acceleration (<5) except for 3000 series.
    // BC variation can be forced large by changing brake amount sharply. E.g., ~233 using EB on 4300/5300 series.
    // Realistically the BC threhold should never be hit due to Tatehama brake programming.
    const currentVariationThreshold = 250;
    const bcVariationThreshold = 250;

    for (let car = 0; car < cars.length; car++) {
      const currentVariation = Math.max(...currentHistory[car]) - Math.min(...currentHistory[car]);
      const bcVariation = Math.max(...bcHistory[car]) - Math.min(...bcHistory[car]);

      console.log(car, currentVariation, bcVariation);

      const slip = (currentVariation > currentVariationThreshold || bcVariation > bcVariationThreshold);
      if (slip) {
        indicatorValues.slip = slip;
        break;
      }
    }
  } else {
    indicatorValues.slip = false;
  }

  // snowproofBrake
  // If brake input is on, or brakes are forced, don't change value
  // Otherwise check for constant 40kPa (hacky)
  const brakeInUse = Math.min(...bNotchHistory) > 0 || lamps.ats.brakeApplication || lamps.eBrake;
  if (!brakeInUse) {
    const minBC = Math.min(...(history.map((x) => x.bc).flat()))
    const maxBC = Math.max(...(history.map((x) => x.bc).flat()))
    indicatorValues.snowproofBrake = minBC > 35 && maxBC < 45;
  }

  // Simple light indicators
  indicatorValues.regen = lamps.regenBrake;
  indicatorValues.highBeams = switches.highBeam;
  indicatorValues.emergencyBrake = lamps.eBrake;
  indicatorValues.doorsClosed = lamps.pilot;

  return indicatorValues;
}
