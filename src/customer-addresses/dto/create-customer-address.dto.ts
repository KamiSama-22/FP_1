import {
    IsNotEmpty,
    IsString,
    IsUUID,
    MaxLength,
} from 'class-validator';

export class CreateCustomerAddressDto {
    @IsUUID('4')
    customerId: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    recipientName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    phone: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    city: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    postalCode: string;
}