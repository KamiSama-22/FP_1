import {
    ArrayMinSize,
    IsArray,
    IsInt,
    IsNotEmpty,
    IsString,
    IsUUID,
    Min,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderItemDto {
    @IsUUID('4')
    bookId: string;

    @IsInt()
    @Min(1)
    quantity: number;
}

export class CreateOrderDto {
    @IsUUID('4')
    customerId: string;

    @IsString()
    @IsNotEmpty()
    orderNumber: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    items: CreateOrderItemDto[];
}