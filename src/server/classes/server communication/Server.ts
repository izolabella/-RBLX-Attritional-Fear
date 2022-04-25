import { ServerRequest } from "shared/classes/server helpers/ServerRequest";
import { ServerResponse } from "shared/classes/server helpers/ServerResponse";
import { Handler } from "./Handler";
import { ServerData } from "./ServerData";

export class Server
{
    static ServerData: ServerData;

    static APIListener: RemoteFunction;

    static Handlers: Handler[] = new Array<Handler>();

    static Main()
    {
        Server.ServerData = new ServerData();
        Server.APIListener = new Instance("RemoteFunction");
        Server.APIListener.Name = "API";
        Server.APIListener.OnServerInvoke = this.OnInvoke;
        wait(1);
        Server.APIListener.Parent = game.GetService("ReplicatedStorage");
    }

    static OnInvoke(this: Player, ControllerRequested: unknown, EndpointRequested: unknown, Args: unknown)
    {
        if(typeIs(ControllerRequested, "string") && typeIs(EndpointRequested, "string"))
        {
            const Request = new ServerRequest<any>(ControllerRequested as string, EndpointRequested as string, Args);
            let Result: ServerResponse<any> | undefined;
            Server.Handlers.forEach(Handler =>
            {
                if(Handler.Name === Request.ControllerRequested)
                {
                    Handler.Endpoints.forEach(Endpoint =>
                    {
                        if(Endpoint.Route === Request.EndpointRequested)
                        {
                            Result = Endpoint.Invoke(this, Request.Arguments);
                        }
                    });
                }
            });
            return Result === undefined ? new ServerResponse<string>(false, "404") : Result;
        }
        else
        {
            return new ServerResponse<string>(false, "Malformed client data was sent. Fix it.");
        }
    }

    static RegisterHandler(Handler: Handler)
    {
        Server.Handlers.push(Handler);
    }
}