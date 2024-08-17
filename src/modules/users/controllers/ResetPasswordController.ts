import { Response, Request } from 'express';
import ResetPasswordService from '../services/ResetPassawordService';

class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    const resetPassword = await new ResetPasswordService();

    await resetPassword .execute({
      token,
      password
    });

    return response.status(204).json();
  }
}

export default ResetPasswordController;