import { Geometry } from "../../../util/measurements/Geometry";
import { Mass } from "../../../util/measurements/Mass";
import { Rate } from "../../../util/measurements/Rate";

export class VesselStats
{
	constructor (MaxSpeedPotential: Rate, MaxRotationPotential: Rate, CurrentForwardSpeed: Rate, CurrentRotationSpeed: Rate, IdleFuelConsumption: Rate, CurrentFuelConsumption: Rate)
	{
		this.MaxSpeedPotential = MaxSpeedPotential;
		this.MaxRotationPotential = MaxRotationPotential;
		this.CurrentForwardSpeed = CurrentForwardSpeed;
		this.CurrentRotationSpeed = CurrentRotationSpeed;
		this.IdleFuelConsumption = IdleFuelConsumption;
		this.CurrentFuelConsumption = CurrentFuelConsumption;
	}

	MaxSpeedPotential: Rate;

	MaxRotationPotential: Rate;

	CurrentForwardSpeed: Rate;

	CurrentRotationSpeed: Rate;

	IdleFuelConsumption: Rate;

	CurrentFuelConsumption: Rate;
}