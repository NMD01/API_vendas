import { Response, Request } from 'express';
import CreateSessionService from '../services/CreateSessionService';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const CreateSession = await new CreateSessionService();

    const user = await CreateSession.execute({
      email,
      password,
    });

    return response.json(user);
  }
}

export default SessionsController;
