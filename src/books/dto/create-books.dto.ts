import { IsInt, IsNotEmpty } from "class-validator";

export class createBookDto{
    @IsNotEmpty({message:'Title harus diisi'})
    readonly title: string;
    
    @IsNotEmpty({message:'Author harus diisi'})
    readonly author: string;
    
    @IsNotEmpty({message:'Isbn harus diisi'})
    readonly isbn: string;
    
    @IsNotEmpty({message:'Publishedyear harus diisi'})
    @IsInt({message:"publisedyead harus diisi"})
    readonly publishedyear: number;
}