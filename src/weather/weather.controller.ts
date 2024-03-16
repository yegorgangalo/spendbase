import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NormalizeWeatherInterceptor } from 'src/interceptors/normalize-weather.interceptor';
import { NormalizedWeatherDto } from 'src/weather/dto/normalized-weather.dto';
import { MessageDto } from 'src/weather/dto/message.dto';
import { WeatherService } from './weather.service';

@ApiTags('Weather')
@Controller('/weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @ApiOperation({ summary: 'get already saved weather data from db' })
  @ApiResponse({ status: 200, type: NormalizedWeatherDto })
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

  @ApiOperation({ summary: 'Save weather data from weather API to db' })
  @ApiResponse({ status: 200, type: MessageDto })
  @Post()
  async postWeather(@Body() body: { lat: number; lon: number; part: string }) {
    const { lat, lon, part } = body;
    const result = await this.weatherService.postWeather({ lat, lon, part });
    return result;
  }
}
