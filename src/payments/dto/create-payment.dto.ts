import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreatePaymentDto {
    @IsUUID('4')
    orderId: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    paymentMethod: string;
}