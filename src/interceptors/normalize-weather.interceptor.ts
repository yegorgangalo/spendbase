import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NormalizedWeatherDto } from 'src/weather/dto/normalized-weather.dto';

interface IWeatherData {
  current: NormalizedWeatherDto;
}

@Injectable()
export class NormalizeWeatherInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: IWeatherData | null) => {
        if (!data?.current) {
          return { message: 'no data' };
        }
        const d = data.current;
        return {
          sunrise: d.sunrise,
          sunset: d.sunset,
          temp: d.temp,
          feels_like: d.feels_like,
          pressure: d.pressure,
          humidity: d.humidity,
          uvi: d.uvi,
          wind_speed: d.wind_speed,
        };
      }),
    );
  }
}
