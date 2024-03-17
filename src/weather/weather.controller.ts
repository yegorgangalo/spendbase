import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseInterceptors,
  HttpCode,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { NormalizeWeatherInterceptor } from '../interceptors/normalize-weather.interceptor';
import { NormalizedWeatherDto, CreateWeatherDto } from './dto/weather.dto';
import { MessageDto } from './dto/message.dto';
import { WeatherService } from './weather.service';

@ApiTags('Weather')
@Controller('/weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @ApiOperation({ summary: 'get already saved weather data from db' })
  @ApiResponse({ status: 200, type: NormalizedWeatherDto })
  @ApiQuery({ name: 'part', required: false, type: String })
  @Get()
  @UseInterceptors(NormalizeWeatherInterceptor)
  async getWeather(
    @Query('lat') lat: number,
    @Query('lon') lon: number,
    @Query('part') part?: string,
  ) {
    const result = await this.weatherService.getWeather({ lat, lon, part });
    return result;
  }

  @ApiOperation({ summary: 'Save weather data from weather API to db' })
  @ApiResponse({
    status: 201,
    type: MessageDto,
    description: 'The record has been successfully created.',
  })
  @HttpCode(201)
  @Post()
  async postWeather(@Body() body: CreateWeatherDto) {
    const { lat, lon, part } = body;
    const result = await this.weatherService.postWeather({ lat, lon, part });
    return result;
  }
}
