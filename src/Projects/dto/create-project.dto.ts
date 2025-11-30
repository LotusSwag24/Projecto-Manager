import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    title: string;
    @IsString()
    @IsOptional()
    description: string;
    @IsNotEmpty()
    @IsNumber()
    userId: number;
}