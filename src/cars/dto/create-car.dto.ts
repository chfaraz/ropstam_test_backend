import { IsNotEmpty, IsString } from "class-validator";

export class CreateCarDto {
    @IsString()
    @IsNotEmpty()
    model: string;
    @IsString()
    @IsNotEmpty()
    number: string;
    @IsString()
    @IsNotEmpty()
    make: string;
    @IsString()
    @IsNotEmpty()
    category: string;
    @IsString()
    @IsNotEmpty()
    color: string;
  
}
