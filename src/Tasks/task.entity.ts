import { Project } from 'src/Projects/project.entity';
import { User } from 'src/Users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity({ name: 'tasks' })
export class Task {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    status: boolean;

    @ManyToOne(() => Project, (project) => project.task)
    projects: Project;
    @ManyToOne(() => User, (user) => user.tasks)
    user: User;
}