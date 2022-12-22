import { ApiProperty } from '@nestjs/swagger';

export class Product {
    @ApiProperty()
    ProductId: number;

    @ApiProperty()
    Quantity: number;

    @ApiProperty()
    Cost: number;
}

export class AddBillCommand {
    @ApiProperty()
    UserId: number;

    @ApiProperty()
    Address: string;

    @ApiProperty({ type: Product })
    Products: Product[];
}