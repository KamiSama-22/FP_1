import {
    ArrayNotEmpty,
    IsArray,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsString,
    IsUUID,
    Min,
} from 'class-validator';

export class CreateBookDto {

    @IsNotEmpty({ message: 'Title harus diisi' })
    @IsString({ message: 'Title harus berupa teks' })
    readonly title: string;

    @IsNotEmpty({ message: 'ISBN harus diisi' })
    @IsString({ message: 'ISBN harus berupa teks' })
    readonly isbn: string;

    @IsNotEmpty({ message: 'Published year harus diisi' })
    @IsInt({ message: 'Published year harus angka' })
    readonly publishedyear: number;

    @IsUUID('4')
    @IsNotEmpty()
    categoryId: string;

    @IsUUID('4', {
        message: 'Publisher ID harus berupa UUID yang valid',
    })
    @IsNotEmpty({
        message: 'Publisher ID harus diisi',
    })
    readonly publisherId: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    price: number;

    @IsArray({ message: 'Author harus berupa array' })
    @ArrayNotEmpty({ message: 'Buku harus memiliki minimal satu penulis' })
    @IsUUID('4', {
        each: true,
        message: 'Setiap authorId harus berupa UUID',
    })
    readonly authorIds: string[];
}