import * as Server from '../types/Server';
import * as Client from '../types/Client';

class WSResponseUtil {
  public static error(name: Client.Actions, reason: Server.Error): string {
    const response = {
      name,
      type: 'response',
      status: 'rejected',
      reason: reason,
    } as Server.ResponseMessage;

    return JSON.stringify(response);
  }

  public static success<ResponseType>(name: Client.Actions, body: ResponseType): string {
    const response = {
      name,
      type: 'response',
      status: 'accepted',
      body,
    } as Server.ResponseMessage<ResponseType>;

    return JSON.stringify(response);
  }

  public static status<ResponseType>(
    status: 'success' | 'fail' | 'info',
    notification: Server.StatusNotification,
    body?: ResponseType,
  ): string {
    const response = {
      name: 'StatusNotification',
      status,
      message: notification,
      body,
    } as Server.StatusMessage;

    return JSON.stringify(response);
  }
}

export default WSResponseUtil;
