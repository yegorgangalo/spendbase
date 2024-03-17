import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { WeatherModule } from './weather.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { WeatherModel } from './weather.model';

describe('WeatherController', () => {
  let controller: WeatherController;
  let weatherService: WeatherService;
  let httpService: HttpService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        ConfigModule.forRoot(),
        WeatherModule,
        SequelizeModule.forRoot({
          dialect: 'sqlite',
          storage: ':memory:',
        }),
        SequelizeModule.forFeature([WeatherModel]),
      ],
      controllers: [WeatherController],
      providers: [WeatherService],
    }).compile();

    controller = module.get<WeatherController>(WeatherController);
    weatherService = module.get<WeatherService>(WeatherService);
    httpService = module.get<HttpService>(HttpService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getWeather', () => {
    it('should return weather data', async () => {
      const lat = 33.44;
      const lon = -94.06;
      const part = 'minutely,hourly,daily';
      const mockResult = {
        sunrise: 1710591878,
        sunset: 1710635091,
        temp: 290.94,
        feels_like: 290.65,
        pressure: 1017,
        humidity: 72,
        uvi: 3.5,
        wind_speed: 1.79,
      };
      jest.spyOn(weatherService, 'getWeather').mockResolvedValue(mockResult);
      const result = await controller.getWeather(lat, lon, part);
      expect(result).toBe(mockResult);
      expect(weatherService.getWeather).toHaveBeenCalledWith({
        lat,
        lon,
        part,
      });
    });
  });

  describe('postWeather', () => {
    it('should save weather data', async () => {
      const createWeatherDto = { lat: 33.44, lon: 94.04, part: 'minutely' };
      const mockResult = { message: 'added' };
      jest.spyOn(weatherService, 'postWeather').mockResolvedValue(mockResult);
      const result = await controller.postWeather(createWeatherDto);
      expect(result).toBe(mockResult);
      expect(weatherService.postWeather).toHaveBeenCalledWith(createWeatherDto);
    });
  });
});
