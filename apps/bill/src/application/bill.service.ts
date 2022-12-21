import { Injectable } from '@nestjs/common';

@Injectable()
export class BillService {
  getHello(): string {
    return 'Hello World!';
  }
}
