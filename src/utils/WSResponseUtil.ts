import * as Server from '../types/Server';

class WSResponseUtil {
  public static error(reason: Server.Reason): string {
    const response = {
      status: 'rejected',
      reason: reason,
    } as Server.Message;

    return JSON.stringify(response);
  }

  public static success(body: Server.JoinResponse | Server.CreateResponse): string {
    const response = {
      status: 'accepted',
      body,
    } as Server.Message;

    return JSON.stringify(response);
  }
}

export default WSResponseUtil;
