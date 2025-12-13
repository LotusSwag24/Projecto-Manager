import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProjectDto {
    @IsString()
    @IsNotEmpty()
    title: string;
    @IsString()
    @IsOptional()
    description: string;
}