import { IsIn } from 'class-validator';

export class UpdatePaymentStatusDto {
    @IsIn(['pending', 'paid', 'failed', 'refunded'])
    status: string;
}