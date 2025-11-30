import { Task } from 'src/Tasks/task.entity';
import { User } from 'src/Users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity({ name: 'projects' })
export class Project {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    userId: number;

    @OneToMany(() => Task, (task) => task.projects)
    task: Task[];
    @ManyToOne(() => User, (user) => user.projects)
    user: User;
}