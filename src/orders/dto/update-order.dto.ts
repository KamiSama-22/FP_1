import { IsIn } from 'class-validator';

export class UpdateOrderDto {
    @IsIn([
        'pending',
        'paid',
        'processing',
        'shipped',
        'completed',
        'cancelled',
    ])
    status: string;
}