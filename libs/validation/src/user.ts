import yup from 'yup';

const isValidEmail = yup
  .string()
  .required('Sähköposti on pakollinen')
  .email('Anna oikea sähköposti osoite')
  .test('tavastia', 'Sähköpostin pitää loppua @kktavastia.fi', (value: string) =>
    value.endsWith('@kktavastia.fi')
  );

const isValidUsername = yup
  .string()
  .required('Käyttäjänimi on pakollinen')
  .max(20, 'Käyttäjänimi ei saa olla enemmän kuin 20 merkkiä pitkä');

export const isValidPassword = yup
  .string()
  .required('Salasana on pakollinen')
  .min(8, 'Salasanan täytyy olla vähintään 8 merkkiä pitkä')
  .max(255, 'Salasana ei saa olla pidempi kuin 255 merkkiä')
  .test('whitespace', 'Salasana ei saa sisältää välilyöntiä', (value: string) => /\s/.test(value))
  .test('uppercase', 'Salasanassa täytyy olla iso kirjain', (value: string) =>
    /[A-ZÅÄÖ]+/.test(value)
  )
  .test('lowercase', 'Salasanassa täytyy olla pieni kirjain', (value: string) =>
    /[a-zåäö]+/.test(value)
  )
  .test('number', 'Salasanassa täytyy olla vähintään yksi numero', (value: string) =>
    /\d+/.test(value)
  )
  .test('special', 'Salasanassa täytyy olla erikoismerkki', (value: string) =>
    /[$&+,:;=?@#¤/\\|´`§_~{}[\]'"<>.^*()%!-]+/.test(value)
  );

interface User {
  email: string;
  username: string;
  password: string;
}

type ExistsTest = (property: string, value: string) => Promise<boolean>;

export class UserValidator {
  public readonly isValidEmail: yup.StringSchema<string>;
  public readonly isValidUsername: yup.StringSchema<string>;

  public constructor(existsTest: ExistsTest) {
    this.isValidEmail = isValidEmail.test(
      'exists',
      'Tämä sähköposti on jo käytössä',
      (value: string) => existsTest('email', value)
    );

    this.isValidUsername = isValidUsername.test(
      'exists',
      'Tämä käyttäjänimi on jo käytössä',
      (value: string) => existsTest('username', value)
    );

    UserValidator.instance = this;
  }

  private static instance: UserValidator;

  public static get Instance() {
    if (!this.instance) {
      throw new Error("No instance hasn't been created");
    }
    return this.instance;
  }

  public static get isValidPassword() {
    return isValidPassword;
  }

  public get schema(): yup.ObjectSchema<User> {
    return yup.object({
      email: this.isValidEmail,
      username: this.isValidUsername,
      password: UserValidator.isValidPassword
    });
  }
}

export default UserValidator;