import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "./project.entity";
import { Repository } from "typeorm/repository/Repository";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";


@Injectable()
export class ProjectService {
    constructor(@InjectRepository(Project) private projectRepository: Repository<Project>) {}

    async createProject(body: CreateProjectDto): Promise<Project> {
        try{
            const newProject = this.projectRepository.create(body);
            return await this.projectRepository.save(newProject);
        }catch(error){
            throw new Error(`Error al crear el proyecto: ${error.message}`);
        }
    }

    async getAllProjects(): Promise<Project[]> {
        try{
            return await this.projectRepository.find();
        }catch(error){
            throw new Error(`Error al obtener los proyectos: ${error.message}`);
        }
    }

    async getUpdateProjectById(id: number, body: UpdateProjectDto): Promise<Project> {
        try{
            await this.projectRepository.update(id, body);
            const updatedProject = await this.projectRepository.findOneBy({ id });
            if (!updatedProject) {
                throw new NotFoundException('Proyecto no encontrado');
            }
            return updatedProject;
        }catch(error){
            throw new Error(`Error al actualizar el proyecto: ${error.message}`);
        }
    }

    async getProjectByUser(userId: number): Promise<Project[]> {
        try{
            const project = await this.projectRepository.find({
                where: { userId: userId }
            });
            if(!project){
                throw new NotFoundException('No se encontraron proyectos para el usuario especificado');
            }
            return project;
        }catch(error){
            throw new Error(`Error al obtener el proyecto del usuario: ${error.message}`);
        }
    }

    async deleteProject(id: number): Promise<{ message: string }> {
        try{
            const deleteResult = await this.projectRepository.delete(id);
            if (deleteResult.affected === 0) {
                throw new NotFoundException('Proyecto no encontrado');
            }
            return { message: 'Proyecto eliminado correctamente' };
        }catch(error){
            throw new Error(`Error al eliminar el proyecto: ${error.message}`);
        }
    }
}