import { IsNotEmpty, MinLength } from "class-validator";

export class resetpassworddto {

    @IsNotEmpty({message: 'Token harus diisi'})
    readonly token: string;

    @IsNotEmpty({message: 'Password harus diisi'})
    @MinLength(8, {message: 'Password tidak boleh kurang dari 8 huruf'})
    readonly newPassword: string;

    @IsNotEmpty({ message: 'Confirm password harus diisi' })
    readonly confirmPassword: string;
}