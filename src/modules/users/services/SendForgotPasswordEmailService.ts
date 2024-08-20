import AppErrors from '@shared/errors/AppError';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokenRepository } from '../typeorm/repositories/UserTokensRepository ';
import EtherealEmail from '@config/Email/EtherealEmail';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new AppErrors('user not exists');
    }

    const token = await UserTokenRepository.generate(user.id);

    // console.log("Enviado:   "+token?.token);
    EtherealEmail.SendEmail({
      to: email,
      body: `token de recuperação de senha: ${token?.token}`
    })
  }
}

export default SendForgotPasswordEmailService;
