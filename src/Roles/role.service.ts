import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "./role.entity";

@Injectable()
export class RoleSeedService{
    private readonly logger = new Logger(RoleSeedService.name);

    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {}

    async seedRoles() {
        const roles = [
            { name: 'ADMIN' },
            { name: 'SCRUM MASTER' },
            { name: 'DEVELOPER' },
        ];
        for (const roleData of roles) {
            const existingRole = await this.roleRepository.findOne({where: {name: roleData.name}});
            if (existingRole) {
                this.logger.log(`El rol ya existe: ${roleData.name}`);
                continue;
            }
            const role = this.roleRepository.create(roleData);
            await this.roleRepository.save(role);
            this.logger.log(`Rol creado: ${role.name}`);
        }
    }
}