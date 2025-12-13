import { Body, Controller, Delete, Get, Post, Put, UseGuards } from "@nestjs/common";
import { TaskService } from "./task.service";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { CreateTaskDto } from "./dto/create-task.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { UpdateTaskDto } from "./dto/update-task.dto";

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
    @Put('/updateTask/:id')
    async updateTask(@Body() body: UpdateTaskDto, id: number){
        return this.taskService.updateTask(id, body);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('SCRUM MASTER')
    @Delete('/deleteTask/:id')
    async deleteTask(id: number){
        return this.taskService.deleteTask(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('SCRUM MASTER')
    @Get('/tasksByUser/:userId')
    async getTasksByUser(userId: number){
        return this.taskService.getTaskByUser(userId);
    }
}