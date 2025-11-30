import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module';
import { DatabaseListener } from './database/database.listener';
import { RoleModule } from './Roles/role.module';
import { ProjectModule } from './Projects/project.module';
import { TaskModule } from './Tasks/task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'projectManager.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ProjectModule,
    TaskModule,
    AuthModule,
    RoleModule
  ],
  controllers: [],
  providers: [DatabaseListener],
})

export class AppModule {
}
