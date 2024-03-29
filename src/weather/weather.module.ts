import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { WeatherModel } from './weather.model';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    SequelizeModule.forFeature([WeatherModel]),
  ],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
