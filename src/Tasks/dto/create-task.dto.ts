import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;
    @IsString()
    @IsOptional()
    description: string;
    status: boolean;
    @IsNumber()
    @IsNotEmpty()
    userId: number;
}