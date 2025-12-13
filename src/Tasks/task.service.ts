import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

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

    async updateTask(id: number, body: UpdateTaskDto): Promise<Task> {
        try{
            await this.taskRepository.update(id, body);
            const updatedTask = await this.taskRepository.findOneBy({ id });
            if (!updatedTask) {
                throw new NotFoundException('Tarea no encontrada');
            }
            return updatedTask;
        }
        catch(error){
            throw new Error(`Error al actualizar la tarea: ${error.message}`);
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

        async deleteTask(id: number): Promise<{ message: string }> {
        try{
            const deleteResult = await this.taskRepository.delete(id);
            if (deleteResult.affected === 0) {
                throw new NotFoundException('Tarea no encontrada');
            }
            return { message: 'Tarea eliminada correctamente' };
        }catch(error){
            throw new Error(`Error al eliminar la tarea: ${error.message}`);
        }
    }
}