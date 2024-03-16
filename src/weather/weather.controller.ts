import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { NormalizeWeatherInterceptor } from 'src/interceptors/normalize-weather.interceptor';

@Controller('/weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Get()
  @UseInterceptors(NormalizeWeatherInterceptor)
  async getWeather(
    @Query('lat') lat: number,
    @Query('lon') lon: number,
    @Query('part') part: string,
  ) {
    const result = await this.weatherService.getWeather({ lat, lon, part });
    return result;
  }

  @Post()
  async postWeather(@Body() body: { lat: number; lon: number; part: string }) {
    const { lat, lon, part } = body;
    const result = await this.weatherService.postWeather({ lat, lon, part });
    return result;
  }
}
