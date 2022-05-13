import { ServerJob } from "../../../../shared/classes/server helpers/server replications/ServerJob";
import { ServerJobSpecifications } from "../../../../shared/consts/Enums";
import { FoAClient } from "../../clients/FoAClient";
import { ServerJobHandler } from "./ServerJobHandler";

export class VesselMovementHandler extends ServerJobHandler<[number, Vector2]>
{
	constructor (Client: FoAClient)
	{
		super((A) => this.UpdatePosition(A), ServerJobSpecifications.VesselMove);
		this.ClientReference = Client;
	}

	ClientReference: FoAClient;

	UpdatePosition (A: ServerJob<Partial<[number, Vector2]>>)
	{
		let F = this.ClientReference.PlayerProcessor.PlayerFaction;
		if (F !== undefined)
		{

		}
	}
}