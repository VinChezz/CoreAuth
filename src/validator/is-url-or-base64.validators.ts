import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function isUrlOrBase64(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isUrlOrBase64',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        async validate(value: any, _args: ValidationArguments) {
          if (typeof value !== 'string') return false;

          const isUrl = /^https?:\/\/.+/.test(value);
          const isBase64 = /^data:image\/[a-z]+;base64,[A-Za-z0-9+/=]+$/.test(
            value,
          );
          return isUrl || isBase64;
        },
        defaultMessage(args: ValidationArguments) {
          return 'Picture must be a valid URL or base64 image string';
        },
      },
    });
  };
}
