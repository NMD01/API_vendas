import nodeMailer from 'nodemailer';
import EJSMailTemplate from './EJSMailTemplate';



interface IvariableTemplate {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  template: string;
  variables: IvariableTemplate
}

interface IEmailContact {
  name: string;
  email: string;
}

interface IsendEmail {
  from?: IEmailContact;
  to: IEmailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

const MailTemplate = new EJSMailTemplate()

export default class EtherealEmail {
  static async SendEmail({from, to, subject, templateData }: IsendEmail): Promise<void> {
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
      from: {
        name: from?.name || "API Vendas",
        address: from?.email || "equipe@api_vendas.com"
      },
      to:{
        name: to.name,
        address: to.email
      },
      subject,
      html: await MailTemplate.parser(templateData),
    });

    //console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodeMailer.getTestMessageUrl(message));
  }
}
