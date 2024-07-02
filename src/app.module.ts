import { Module } from '@nestjs/common';

import { AuthModule } from './modules/auth/auth.module';
import { CarsModule } from './modules/cars/cars.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [UserModule, AuthModule, CarsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
