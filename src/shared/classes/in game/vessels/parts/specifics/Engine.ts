import { PartType } from "../../../../../consts/Enums";
import { Geometry } from "../../../../util/measurements/Geometry";
import { Rate } from "../../../../util/measurements/Rate";
import { EntityDamageEvent } from "../../../entities/EntityDamageEvent";
import { IEntityPart } from "../../../entities/IEntityPart";
import { Storable } from "../../../resources/specifics/Resource";
import { StorageContainer } from "../../../resources/StorageContainer";
import { VesselPart } from "../VesselPart";

export class Engine extends VesselPart
{
	constructor (Name: string, Description: string, EntityDamageEvents: EntityDamageEvent[], Geometry: Geometry, Type: PartType, ModelToCloneName: string, StorageOfPart: StorageContainer, ResourcesConsumedByPart: Storable[], Speed: Rate)
	{
		super(Name, Description, EntityDamageEvents, Geometry, Type, ModelToCloneName, StorageOfPart, ResourcesConsumedByPart);
		this.Speed = Speed;
	}

	Speed: Rate;
}