import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    ProductId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    Quantity: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    Cost: number;
}

export class AddBillDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    UserId: number;

    @ApiProperty()
    @IsNotEmpty()
    Address: string;

    @ApiProperty({ type: [ProductDto] })
    @ValidateNested({each: true})
    @Type(() => ProductDto)
    Products: ProductDto[];
}