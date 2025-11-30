import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { TaskService } from "./task.service";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { CreateTaskDto } from "./dto/create-task.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Roles } from "src/common/decorators/roles.decorator";

@Controller('tasks')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('SCRUM MASTER')
    @Post('/createTask')
    async createTask(@Body() body: CreateTaskDto){
        return this.taskService.createTask(body);
    }   

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('SCRUM MASTER')
    @Get('/tasksByUser/:userId')
    async getTasksByUser(userId: number){
        return this.taskService.getTaskByUser(userId);
    }
}