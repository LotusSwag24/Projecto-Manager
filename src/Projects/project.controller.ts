import { Body, Controller, Get, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { CreateProjectDto } from "./dto/create-project.dto";
import { ProjectService } from "./project.service";
import { Roles } from "src/common/decorators/roles.decorator";
import { UpdateProjectDto } from "./dto/update-project.dto";

@Controller('projects')
export class ProjectController {
    constructor(private projectService: ProjectService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Post('/createProject')
    async createProject(@Body() body: CreateProjectDto){
        return this.projectService.createProject(body);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Get('/allProjects')
    async getAllProjects(){
        return this.projectService.getAllProjects();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Put('/updateProject/:id')
    async updateProject(@Body() body: UpdateProjectDto, id: number){
        return this.projectService.getUpdateProjectById(id, body);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Get('/projectByUser/:userId')
    async getProjectsByUser(userId: number){
        return this.projectService.getProjectByUser(userId);
    }
}