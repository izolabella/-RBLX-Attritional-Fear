import { FoAFaction } from "shared/classes/in game/factions/Faction";
import { Server } from "../server/classes/server communication/Server";
import { FoAPlayerSettings } from "../shared/classes/in game/players/personalizations/FoAPlayerSettings";
import { Hotkeys } from "../shared/classes/in game/players/personalizations/specifics/Hotkeys";
import { ServerTerrainRequest } from "../shared/classes/in game/terrain/specifics/regions/ServerTerrainRequest";
import { TerrainFollower } from "../shared/classes/in game/terrain/TerrainFollower";
import { FactionTitleKeys } from "../shared/consts/Strings";
import { FoACamera } from "./classes/camera/FoACamera";
import { LevelOfZoom } from "./classes/camera/LevelOfZoom";
import { FoAClient } from "./classes/clients/FoAClient";
import { RenderTerrainResult } from "./classes/processor results/RenderTerrainResult";

const SizeStartingArea = 4000;

print("Waiting for server to be ready . .");
print("Server is accepting requests.");
print("Constructing client . .");
const Client = new FoAClient();
print("Client constructed.");
let Self = Client.PlayerProcessor.GetCurrentPlayer();
if (Self.Success && Self.Returned !== undefined)
{
	Client.PlayerProcessor.SaveFoAPlayerSettings(new FoAPlayerSettings(new Hotkeys()));
	print("Registering faction . .");
	let Faction = Client.PlayerProcessor.RegisterFactionToGame(new FoAFaction(Self.Returned, Self.Returned.RobloxPlayerInstance.UserId, "Abc", new Vector3(), FactionTitleKeys.Dreadful, Color3.fromRGB(255, 180, 255)));
	if (Faction.Success && Faction.Returned !== undefined)
	{
		print("Faction registered.");
		let SpawnLoc = Faction.Returned.SpawnLocation;

		Client.Camera.MoveCamera(new CFrame(SpawnLoc, Client.Camera.CurrentCamera.CFrame.LookVector));

		print("Loading spawn . .");
		let ChunkSize = 1;
		let FrameSkips = 120;
		let Time = os.clock();
		let StartingArea = Client.TerrainProcessor.RenderTerrain(new ServerTerrainRequest(-(SpawnLoc.X * 2), -(SpawnLoc.X * 2), SpawnLoc.Z * 2, SpawnLoc.Z * 2), FrameSkips, ChunkSize);
		StartingArea.WaitUntilDone();
		print("[" + (os.clock() - Time) + "] seconds to load [" + SizeStartingArea * 2 + "x" + SizeStartingArea * 2 + "] studs. Upscaled by [x" + Client.TerrainProcessor.MapData.SizePerCell + "]. [" + FrameSkips + "] frames skipped every [" + ChunkSize + "] studs.");
		print("Spawn loaded.");
	}
	else
	{
		print("Faction could not be registered.");
	}
}
else
{
	print("No self player.");
}


//print("Connecting camera chunker . .");
//Client.TerrainChunker.Connect();
//print("Camera chunker connected.");

export {};