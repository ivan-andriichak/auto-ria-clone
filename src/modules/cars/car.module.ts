import { Module } from '@nestjs/common';

import { FileStorageModule } from '../file-storage/file-storage.module';
import { CarController } from './car.controller';
import { CarService } from './services/car.service';

@Module({
  imports: [FileStorageModule],
  controllers: [CarController],
  providers: [CarService],
  exports: [CarService],
})
export class CarModule {}
