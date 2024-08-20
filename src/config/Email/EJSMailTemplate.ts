import ejs from 'ejs';

interface IvariableTemplate {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  template: string;
  variables: IvariableTemplate
}

export default class EJSMailTemplate {
  public async parser({template, variables} : IParseMailTemplate): Promise<string> {
    const parseTemplate = ejs.render(template, variables);
    return parseTemplate;
  }
}
