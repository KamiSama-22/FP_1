import {
    IsNotEmpty,
    IsString,
    IsUUID,
    MaxLength,
} from 'class-validator';

export class CreateShipmentDto {
    @IsUUID('4')
    orderId: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    courier: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    trackingNumber: string;
}