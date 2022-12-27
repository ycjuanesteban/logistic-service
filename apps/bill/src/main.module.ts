import { Module } from '@nestjs/common';
import { BillModule } from './bill.module';

@Module({
    imports: [
        BillModule
    ]
})
export class MainModule { }
