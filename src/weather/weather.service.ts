import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { AxiosResponse, AxiosError } from 'axios';
import { Observable, catchError, firstValueFrom } from 'rxjs';
import { WeatherModel } from './weather.model';
import { IWeatherData } from './dto/weather.dto';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(WeatherModel) private weatherModel: typeof WeatherModel,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getWeather({ lat, lon, part }) {
    const searchValue = `${lat}_${lon}_${part}`;
    const findRes = await this.weatherModel.findOne({
      where: { searchValue },
    });
    console.log('findRes=', findRes?.data);
    return findRes ? JSON.parse(findRes.data) : null;
  }

  async postWeather({ lat, lon, part }) {
    const apiUrl = this.configService.get<string>('WEATHER_API_URL');
    const apiKey = this.configService.get<string>('WEATHER_API_KEY');
    const uri = `${apiUrl}?lat=${lat}&lon=${lon}&exclude=${part}&appid=${apiKey}`;
    const { data } = await firstValueFrom(
      this.httpService.get<Observable<AxiosResponse<IWeatherData>>>(uri).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response.data);
          throw { message: 'Weather API error happened!' };
        }),
      ),
    );

    const searchValue = `${lat}_${lon}_${part}`;
    const dataForDB = JSON.stringify(data);
    const findRes = await this.weatherModel.findOne({
      where: { searchValue },
    });
    if (findRes) {
      await findRes.update({ data: dataForDB });
      return { message: 'updated' };
    } else {
      await this.weatherModel.create({
        searchValue,
        data: dataForDB,
      });
      return { message: 'added' };
    }
  }
}
