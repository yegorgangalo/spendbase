import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface NormalizedWeather {
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  uvi: number;
  wind_speed: number;
}

interface IWeatherData {
  current: NormalizedWeather;
}

@Injectable()
export class NormalizeWeatherInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: IWeatherData | null) => {
        if (!data) {
          return 'no data';
        }

        const {
          sunrise,
          sunset,
          temp,
          feels_like,
          pressure,
          humidity,
          uvi,
          wind_speed,
        } = data.current;

        return {
          sunrise,
          sunset,
          temp,
          feels_like,
          pressure,
          humidity,
          uvi,
          wind_speed,
        };
      }),
    );
  }
}
