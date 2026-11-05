import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class registerdto {

    @IsNotEmpty({message: 'Nama harus diisi'})
    @IsString({message: 'Nama hanya boleh memakai huruf'})
    @MinLength(5, {message: 'Nama tidak boleh kurang dari 5 huruf'})
    readonly nama: string;

    @IsNotEmpty({message: 'Email harus diisi'})
    @IsEmail({}, { message: 'Format email tidak valid' })
    readonly email: string;

    @IsNotEmpty({message: 'Password harus diisi'})
    @MinLength(8, {message: 'Password tidak boleh kurang dari 8 huruf'})
    readonly password: string;

    @IsNotEmpty({ message: 'Confirm password harus diisi' })
    readonly confirmPassword: string;
}
