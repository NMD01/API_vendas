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

  const {token} = await UserTokenRepository.generate(user.id);

    EtherealEmail.SendEmail({
      to:{
        name: user.name,
        email: user.email,
      },

      subject: "[API Vendas] Recuperação de senha",

      templateData: {
        template: `Olá <%= name %>, Esse é o seu token de recuperação de senha: <%= token %>`,
        variables:{
          name: user.name,
          token
      },
    },
  })
  }
}

export default SendForgotPasswordEmailService;
