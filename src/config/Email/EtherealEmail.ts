import nodeMailer from 'nodemailer';

interface IsendEmail {
  to: string;
  body: string;
}

export default class EtherealEmail {
  static async SendEmail({ to, body }: IsendEmail): Promise<void> {
    const account = await nodeMailer.createTestAccount();

    const transport = nodeMailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await transport.sendMail({
      from: 'equipe@api_vendas',
      to,
      subject: 'Recuperação de Senha',
      text: body,
    });


    //console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodeMailer.getTestMessageUrl(message));
  }
}
