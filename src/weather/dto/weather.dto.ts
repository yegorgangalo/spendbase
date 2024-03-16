import { ApiProperty } from '@nestjs/swagger';

export class NormalizedWeatherDto {
  @ApiProperty({ example: 1710633096 })
  sunrise: number;
  @ApiProperty({ example: 1710676368 })
  sunset: number;
  @ApiProperty({ example: 266.24 })
  temp: number;
  @ApiProperty({ example: 259.24 })
  feels_like: number;
  @ApiProperty({ example: 1012 })
  pressure: number;
  @ApiProperty({ example: 14 })
  humidity: number;
  @ApiProperty({ example: 0 })
  uvi: number;
  @ApiProperty({ example: 6.26 })
  wind_speed: number;
}

export class CreateWeatherDto {
  @ApiProperty({ required: true, example: 33.44 })
  lat: number;
  @ApiProperty({ required: true, example: -94.04 })
  lon: number;
  @ApiProperty({
    required: false,
    example: [
      'minutely',
      'hourly',
      'daily',
      'minutely,hourly',
      'minutely,daily',
      'hourly,daily',
      'minutely,hourly,daily',
    ],
  })
  part?: string;
}
