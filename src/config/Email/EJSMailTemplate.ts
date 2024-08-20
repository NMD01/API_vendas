import ejs from 'ejs';
import fs from 'fs';

interface IvariableTemplate {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: IvariableTemplate;
}

export default class EJSMailTemplate {
  public async parser({
    file,
    variables,
  }: IParseMailTemplate): Promise<string> {
    const fileContentTemplate = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = ejs.render(fileContentTemplate, variables);
    return parseTemplate;
  }
}
