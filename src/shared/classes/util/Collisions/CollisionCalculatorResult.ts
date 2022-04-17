export class CollisionCalculatorResult
{
	constructor (Collided: boolean, Result?: RaycastResult | undefined)
	{
		this.Collided = Collided;
		this.Result = Result;
	}

	Collided: boolean;
	Result: RaycastResult | undefined;
}