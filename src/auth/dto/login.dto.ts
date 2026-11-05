import { IsEmail, IsNotEmpty } from "class-validator";

export class logindto {

    @IsNotEmpty({message: 'Email harus di isi'})
    @IsEmail({}, { message: 'Format email tidak valid' })
    readonly email: string;

    @IsNotEmpty({message: 'Password harus di isi'})
    readonly password: string;
}