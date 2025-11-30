export class UserEntity{
    id: number;
    email: string;
    password: string;
    status: boolean;
    roleId: number;
    role?: {
        name: string;
    }
}