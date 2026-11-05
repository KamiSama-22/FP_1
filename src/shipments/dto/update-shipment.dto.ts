import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateShipmentDto {
    @IsOptional()
    @IsString()
    @MaxLength(100)
    trackingNumber?: string;

    @IsIn(['pending', 'shipped', 'in_transit', 'delivered', 'cancelled'])
    status: string;
}