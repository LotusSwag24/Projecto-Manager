import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";

@Injectable()
export class TaskService {
    constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) {}

    async createTask(body: CreateTaskDto): Promise<Task> {
        try{
            const newTask = this.taskRepository.create(body);
            return await this.taskRepository.save(newTask);
        }catch(error){
            throw new Error(`Error al crear la tarea: ${error.message}`);
        }
    }

    async getTaskByUser(userId: number): Promise<Task[]> {
        try{
            return await this.taskRepository.find({
                where: { userId: userId }
            });
        }catch(error){
            throw new Error(`Error al obtener las tareas del usuario: ${error.message}`);
        }
    }
}