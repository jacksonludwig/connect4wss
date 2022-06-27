import * as Server from '../types/Server';
import * as Client from '../types/Client';

class WSResponseUtil {
  public static error(name: Client.Actions, reason: Server.Error): string {
    const response = {
      name,
      type: 'response',
      status: 'rejected',
      reason: reason,
    } as Server.RejectedResponseMessage;

    return JSON.stringify(response);
  }

  public static success(
    name: Client.Actions,
    body: Server.JoinResponse | Server.CreateResponse,
  ): string {
    const response = {
      name,
      type: 'response',
      status: 'accepted',
      body,
    } as Server.AcceptedResponseMessage;

    return JSON.stringify(response);
  }

  public static status(notification: Server.StatusNotification): string {
    const response = {
      type: 'status',
      message: notification,
    } as Server.StatusMessage;

    return JSON.stringify(response);
  }
}

export default WSResponseUtil;
