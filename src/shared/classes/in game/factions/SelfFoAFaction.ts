import { FactionTitleKeys } from "../../../consts/Strings";
import { FoAPlayer } from "../players/FoAPlayer";
import { SelfFoAPlayer } from "../players/SelfFoAPlayer";
import { FoAFaction } from "./Faction";

export class SelfFoAFaction implements FoAFaction
{
    constructor (Player: SelfFoAPlayer, UserId: number, Name: string, SpawnLoc: Vector3, Title: FactionTitleKeys, Color: Color3)
    {
        this.Player = Player;
        this.UserId = UserId;
        this.Name = Name;
        this.SpawnLocation = SpawnLoc;
        this.Title = Title;
        this.Color = Color;
    }

    Player?: SelfFoAPlayer;

    UserId: number;

    Name: string;

    SpawnLocation: Vector3;

    Title: FactionTitleKeys;

    Color: Color3;
}