import { Role } from "src/Roles/role.entity";
import { Task } from "src/Tasks/task.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    password: string;
    @Column()
    email: string;
    @Column({ default: true })
    status: boolean;

    @ManyToOne(() => Role, (role) => role.user)
    role: Role;
    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[];
}