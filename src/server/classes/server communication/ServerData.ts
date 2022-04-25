import { FoAFaction } from "shared/classes/in game/factions/Faction";
import { SelfFoAPlayer } from "shared/classes/in game/players/SelfFoAPlayer";
import { NoiseHelper } from "../../../shared/classes/in game/terrain/NoiseHelper";
import { Sleep } from "../../../shared/classes/util/Sleep";
import { SNumbers } from "../../../shared/consts/SNumbers";

export class ServerData
{
    CurrentActiveFactions: FoAFaction[] = new Array<FoAFaction>();
    CurrentActivePlayers: SelfFoAPlayer[] = new Array<SelfFoAPlayer>();
    TerrainData = new ServerTerrainData();
}

class ServerTerrainData
{
    Size: number = 1200;
    Z: number = new Random().NextInteger(5, 10 ^ 26);
    EleMap: NoiseHelper = new NoiseHelper(this.Z, this.Size, this.Size, 2, 5, new Sleep(SNumbers.Terrain.NoiseHelperStepAmount));
    MoistureMap: NoiseHelper = new NoiseHelper(this.Z, this.Size, this.Size, 12, 2, new Sleep(SNumbers.Terrain.NoiseHelperStepAmount));
    Scale: number = 5;
}