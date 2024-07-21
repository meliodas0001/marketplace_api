import * as Joi from 'joi';
import {
  ArgumentMetadata,
  Injectable,
  NotImplementedException,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class ValidatorPipe implements PipeTransform<any> {
  constructor(
    private readonly schema: Joi.AnySchema,
    private readonly convert = true,
  ) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.schema || !metadata.metatype) {
      throw new NotImplementedException('Missing validation schema!');
    }

    const validationResult = this.schema.validate(value, {
      abortEarly: false,
      stripUnknown: true,
      convert: this.convert,
    });

    if (validationResult.error) {
      throw new UnprocessableEntityException(
        validationResult.error.details.map((error) => error.message),
      );
    }

    return validationResult.value;
  }
}
