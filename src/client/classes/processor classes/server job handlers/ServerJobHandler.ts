import { ServerJob } from "../../../../shared/classes/server helpers/server replications/ServerJob";
import { ServerJobSpecifications } from "../../../../shared/consts/Enums";

export class ServerJobHandler<T>
{
	constructor (DoJob: (S: ServerJob<T>) => any, DispatchJobType: ServerJobSpecifications)
	{
		this.DoJob = DoJob;
		this.DispatchJobType = DispatchJobType;
	}

	private DoJob: (S: ServerJob<T>) => any;

	DispatchJobType: ServerJobSpecifications;

	InvokeJob (S: ServerJob<T>): void
	{
		this.DoJob(S);
	}
}