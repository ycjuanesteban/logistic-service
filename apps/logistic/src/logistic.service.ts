import { Injectable } from '@nestjs/common';

@Injectable()
export class LogisticService {
  getHello(): string {
    return 'Hello World!';
  }
}
