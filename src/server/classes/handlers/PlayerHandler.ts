import { Server } from "server/classes/server communication/Server";
import { FoAFaction } from "shared/classes/in game/factions/Faction";
import { SelfFoAPlayer } from "shared/classes/in game/players/SelfFoAPlayer";
import { Endpoint } from "server/classes/server communication/Endpoint";
import { Strings } from "shared/consts/Strings";
import { FoAPlayerSettings } from "../../../shared/classes/in game/players/personalizations/FoAPlayerSettings";
import { Registers } from "../../../shared/consts/Registers";
import { ServerData } from "../server communication/ServerData";
import { IHandler } from "./Handler";

export class PlayerHandler implements IHandler
{
    Name: string = Strings.PlayerStrings.PlayerHandlerRoute;

    Endpoints =
        [
            new Endpoint<any, FoAFaction[]>(Strings.PlayerStrings.GetAllActivePlayerFactions,
                (Player: Player) => this.GetAllActivePlayerFactions(Player)),
            new Endpoint<FoAFaction, FoAFaction | undefined>(Strings.PlayerStrings.RegisterPlayerFaction,
                (Player: Player, Arg: FoAFaction) => this.RegisterPlayerFaction(Player, Arg)),
            new Endpoint<any, SelfFoAPlayer>(Strings.PlayerStrings.GetFoAPlayerFromPlayer,
                (Player: Player) => this.GetFoAPlayerFromPlayer(Player))
        ]

    ServerData!: ServerData;

    GetAllActivePlayerFactions (Player: Player): FoAFaction[]
    {
        return this.ServerData.CurrentActiveFactions;
    }

    RegisterPlayerFaction (Player: Player, Arg: FoAFaction): FoAFaction | undefined
    {
        if (!this.ServerData.CurrentActiveFactions.some(Faction => Faction.Player.RobloxPlayerInstance.UserId === Player.UserId))
        {
            let SFoAPlayer = this.ServerData.CurrentActivePlayers.find(S => S.RobloxPlayerInstance.UserId === Player.UserId);
            if (SFoAPlayer !== undefined)
            {
                let TerrSize = this.ServerData.TerrainData.Size * this.ServerData.TerrainData.Scale;
                let AdjustedTerSize = TerrSize / 2;
                let RanX = new Random().NextInteger(-AdjustedTerSize, AdjustedTerSize);
                let RanZ = new Random().NextInteger(-AdjustedTerSize, AdjustedTerSize);
                let NewFac = new FoAFaction(SFoAPlayer, Player.UserId, Arg.Name, new Vector3(RanX, 50, RanZ), Arg.Title, Arg.Color);
                this.ServerData.CurrentActiveFactions.push(NewFac);
                return NewFac;
            }
        }
    }

    GetFoAPlayerFromPlayer (Player: Player): SelfFoAPlayer
    {
        let MatchingFoAPlayer = this.ServerData.CurrentActivePlayers.find(P => P.RobloxPlayerInstance.UserId === Player.UserId);
        if (MatchingFoAPlayer === undefined)
        {
            let NewPlayer: SelfFoAPlayer = new SelfFoAPlayer(Player, Registers.PlayerSettingsRegister.GetRecord<FoAPlayerSettings>(Player.UserId).Value ?? new FoAPlayerSettings(undefined));
            this.ServerData.CurrentActivePlayers.push(NewPlayer);
            return NewPlayer;
        }
        else
        {
            return MatchingFoAPlayer;
        }
    }

    ServerRegistering (Data: ServerData)
    {
        this.ServerData = Data;
    }
}