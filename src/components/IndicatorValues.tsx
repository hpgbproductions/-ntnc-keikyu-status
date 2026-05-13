import {
    useKumohaData,
    useKumohaROM,
    useKumohaThemeUserPrefs,
} from "@tanuden/kumoha-react";

export function getDefaultIndicatorValues() {
    const indicatorValues = {
        masconN: false,
        slip: false,
        regen: false,
        highBeams: false,
        snowproofBrake: false,
        emergencyBrake: false,
        doorsClosed: false
    };

    return indicatorValues;
}

{/*
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
*/}

export function updateIndicatorValues(currents: number[][], BCs: number[][], powers: number[], brakes: number[]) {
    const kumohaData = useKumohaData();
    const kumohaUserPrefs = useKumohaThemeUserPrefs();
    const kumohaROM = useKumohaROM();

    const indicatorValues = getDefaultIndicatorValues();

    const leadCar = {
        series: "",
        number: -1,
        motor: false,
        twoHandle: false
    }

    //#region Check game state

    var inGame = kumohaData.gameState.screen === "MainGame" || kumohaData.gameState.screen === "MainGame_Pause";
    if (!inGame) {
        // Invalid state
        return null;
    }

    //#endregion

    //#region Set train parameters and check train

    if (kumohaData.gameData.diagram.direction === "Outbound") {
        // Towards Tatehama
        leadCar.number = 1;
    }
    else if (kumohaData.gameData.diagram.direction === "Inbound"){
        // Away from Tatehama, lead car number is equal to number of cars
        leadCar.number = kumohaData.gameData.train.consist;
    }
    
    if (leadCar.number < 1 || leadCar.number > kumohaData.gameData.train.consist) {
        // Invalid state
        return null;
    }

    leadCar.series = kumohaData.gameData.train.cars[leadCar.number - 1].model;
    leadCar.motor = kumohaData.gameData.train.cars[leadCar.number - 1].properties.motor;
    leadCar.twoHandle = !kumohaROM.rollingstock[leadCar.series].hasHoldBrake;

    //#endregion

    // masconN
    if (leadCar.twoHandle) {
        indicatorValues.masconN = (kumohaData.gameData.controllerState.pNotch == 0);
    }
    else {
        indicatorValues.masconN = (kumohaData.gameData.controllerState.notch == 0);
    }

    // TODO slip

    // regen
    indicatorValues.regen = false;
    kumohaData.gameData.train.cars.forEach(element => {
        if (element.amperage < 0) {
            indicatorValues.regen = true;
        }
    });

    // TODO snowproofBrake

    // Simple light indicators
    indicatorValues.highBeams = kumohaData.gameData.train.switches.highBeam;
    indicatorValues.emergencyBrake = kumohaData.gameData.train.lamps.eBrake;
    indicatorValues.doorsClosed = kumohaData.gameData.train.lamps.pilot;

    return indicatorValues;
};