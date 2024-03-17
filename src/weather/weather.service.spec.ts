import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from './weather.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/sequelize';
import { of, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { WeatherModel } from './weather.model';
import { IWeatherData } from './dto/weather.dto';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpService: HttpService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        WeatherService,
        ConfigService,
        {
          provide: getModelToken(WeatherModel),
          useValue: {
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
    httpService = module.get<HttpService>(HttpService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getWeather', () => {
    it('should return weather data if found in the database', async () => {
      const lat = 33.44;
      const lon = -94.06;
      const part = 'minutely,hourly,daily';
      const mockWeatherData = {
        sunrise: 1710591878,
        sunset: 1710635091,
        temp: 290.94,
        feels_like: 290.65,
        pressure: 1017,
        humidity: 72,
        uvi: 3.5,
        wind_speed: 1.79,
      };

      jest.spyOn(service, 'getWeather').mockResolvedValue(mockWeatherData);

      const result = await service.getWeather({ lat, lon, part });

      expect(result).toBe(mockWeatherData);
    });
  });

  describe('postWeather', () => {
    it('should add weather data if not found in the database', async () => {
      const lat = 33.44;
      const lon = -94.06;
      const part = 'minutely,hourly,daily';
      const mockWeatherData = {
        sunrise: 1710591878,
        sunset: 1710635091,
        temp: 290.94,
        feels_like: 290.65,
        pressure: 1017,
        humidity: 72,
        uvi: 3.5,
        wind_speed: 1.79,
      };

      jest.spyOn(httpService, 'get').mockReturnValue(
        of({
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
          data: {
            current: mockWeatherData,
          },
        }) as Observable<AxiosResponse<IWeatherData>>,
      );
      jest.spyOn(service['weatherModel'], 'findOne').mockResolvedValue(null);
      jest
        .spyOn(service['weatherModel'], 'create')
        .mockResolvedValue({} as WeatherModel);

      const result = await service.postWeather({ lat, lon, part });

      expect(result).toEqual({ message: 'added' });
    });
  });
});
