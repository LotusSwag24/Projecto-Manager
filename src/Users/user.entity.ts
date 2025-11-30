import { Project } from "src/Projects/project.entity";
import { Role } from "src/Roles/role.entity";
import { Task } from "src/Tasks/task.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column({ default: true })
    status: boolean;
    @Column()
    roleId: number;

    @ManyToOne(() => Role, (role) => role.user)
    role: Role;
    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[];
    @OneToMany(() => Project, (project) => project.user)
    projects: Project[];
}