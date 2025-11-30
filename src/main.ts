import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { RoleSeedService } from './Roles/role.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const roleSeedService = app.get(RoleSeedService);
  await roleSeedService.seedRoles();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
