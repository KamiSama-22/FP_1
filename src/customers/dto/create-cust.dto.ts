import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
} from 'class-validator';

export class CreateCustomerDto {
    @IsString()
    @IsNotEmpty({ message: 'Nama pelanggan harus diisi' })
    @MaxLength(150)
    readonly name: string;

    @IsEmail({}, { message: 'Format email tidak valid' })
    @IsNotEmpty({ message: 'Email harus diisi' })
    @MaxLength(150)
    readonly email: string;

    @IsString()
    @IsNotEmpty({ message: 'Nomor telepon harus diisi' })
    @MaxLength(20)
    readonly phone: string;
}