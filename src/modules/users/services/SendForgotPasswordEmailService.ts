import AppErrors from '@shared/errors/AppError';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokenRepository } from '../typeorm/repositories/UserTokensRepository ';
import EtherealEmail from '@config/Email/EtherealEmail';
import path from "path"

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
  const forgotPasswordTemplate = path.resolve(__dirname, "..", "Views", "forgot_password.ejs")

    EtherealEmail.SendEmail({
      to:{
        name: user.name,
        email: user.email,
      },

      subject: "[API Vendas] Recuperação de senha",

      templateData: {
        file: forgotPasswordTemplate,
        variables:{
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
      },
    },
  })
  }
}

export default SendForgotPasswordEmailService;
