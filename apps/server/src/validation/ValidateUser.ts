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
  return User.findOne({ where: { [property]: value } }).then((val) => !!val);
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
