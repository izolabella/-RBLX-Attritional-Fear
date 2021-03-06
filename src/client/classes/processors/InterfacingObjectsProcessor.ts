import { FoAPlayerSettings } from "../../../shared/classes/in game/players/personalizations/FoAPlayerSettings";
import { ISettingsInvolved } from "../clients/ISettingsInvolved";
import { Processor } from "./Processor";

export class InterfacingObjectsProcessor extends Processor
{
    constructor (APIInstance: RemoteFunction)
    {
        super(APIInstance);
    }

    Entangled: ISettingsInvolved[] = [];

    NewClientObject (Entangled: ISettingsInvolved)
    {
        this.Entangled.push(Entangled);
	}

    ChangedSettings (Settings: FoAPlayerSettings)
    {
        this.Entangled.forEach(E =>
        {
            E.LoadNewSettings(Settings);
        });
	}
}