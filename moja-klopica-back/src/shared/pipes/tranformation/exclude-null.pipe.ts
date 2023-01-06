import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ExcludeNullPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    const keys = Object.keys(value);
    for (const key of keys) {
      if (value[key] === null) {
        delete value[key];
      }
    }
    return value;
  }
}
