import * as yup from 'yup';
import * as messages from './messages';

const whitespaceTest = (value: string) => !/\s/.test(value);

const isValidEmail = yup
  .string()
  .required(messages.required('email'))
  .email(messages.realEmail);

const isValidUsername = yup
  .string()
  .required(messages.required('username'))
  .min(3, messages.length('username', '3-20'))
  .max(20, messages.length('username', '3-20'))
  .test('whitespace', messages.whitespace('username'), whitespaceTest);

const isValidPassword = yup
  .string()
  .required(messages.required('password'))
  .min(8, messages.length('password', '8-255'))
  .max(255, messages.length('password', '8-255'))
  .test('whitespace', messages.whitespace('password'), whitespaceTest)
  .test('uppercase', messages.uppercase('password'), (value: string) => /[A-ZÅÄÖ]+/.test(value))
  .test('lowercase', messages.lowercase('password'), (value: string) => /[a-zåäö]+/.test(value))
  .test('number', messages.number('password'), (value: string) => /\d+/.test(value))
  .test('special', messages.special('password'), (value: string) =>
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

  private constructor(existsTest: ExistsTest) {
    this.isValidEmail = isValidEmail.test(
      'exists',
      messages.exists('email'),
      async (value: string) => existsTest('email', value)
    );

    this.isValidUsername = isValidUsername.test(
      'exists',
      messages.exists('username'),
      async (value: string) => existsTest('username', value)
    );
  }

  private static instance: UserValidator;

  public static init(existsTest: ExistsTest) {
    this.instance = new this(existsTest);
  }

  public static get Instance() {
    if (!this.instance) {
      throw new Error("No instance hasn't been created");
    }
    return this.instance;
  }

  public static get isValidPassword() {
    return isValidPassword;
  }

  public static get schema(): yup.ObjectSchema<User> {
    return yup.object({
      email: this.instance.isValidEmail,
      username: this.instance.isValidUsername,
      password: this.isValidPassword
    });
  }
}

export default UserValidator;
