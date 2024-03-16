import { Column, Model, Table, DataType } from 'sequelize-typescript';

interface WeatherCreationAttrs {
  searchValue: string;
  data: string;
}

@Table({ tableName: 'Weathers' })
export class WeatherModel extends Model<WeatherModel, WeatherCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    primaryKey: true,
    allowNull: false,
  })
  searchValue: string;

  @Column({ type: DataType.TEXT('long'), allowNull: false })
  data: string;
}
