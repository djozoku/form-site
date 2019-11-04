/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-classes-per-file */
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator';
import { UserValidator } from '@form/validation';
import User from '../entity/User';

UserValidator.init(async (property, value) => {
  if (property === 'username') {
    console.log('username');
    return User.findOne({ where: { username: value } }).then((val) => typeof val === 'undefined');
  }
  if (property === 'email') {
    return User.findOne({ where: { email: value } }).then((val) => typeof val === 'undefined');
  }
  return false;
});

@ValidatorConstraint({ async: true })
class IsValidEmailConstraint implements ValidatorConstraintInterface {
  validate(email: string, _args: ValidationArguments) {
    return UserValidator.Instance.isValidEmail.isValid(email);
  }
}

export function IsValidEmail(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidEmailConstraint
    });
  };
}

@ValidatorConstraint({ async: true })
class IsValidUsernameConstraint implements ValidatorConstraintInterface {
  validate(username: string, _args: ValidationArguments) {
    return UserValidator.Instance.isValidUsername.isValid(username);
  }
}

export function IsValidUsername(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidUsernameConstraint
    });
  };
}

@ValidatorConstraint({ async: true })
class IsValidPasswordConstraint implements ValidatorConstraintInterface {
  validate(password: string, _args: ValidationArguments) {
    return UserValidator.isValidPassword.isValid(password);
  }
}

export function IsValidPassword(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidPasswordConstraint
    });
  };
}
