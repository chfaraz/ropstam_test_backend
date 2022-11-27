import { Transform } from 'class-transformer';
import { Min, Max, IsNumber, IsOptional, IsString } from 'class-validator';

export class FetchCarsListDTO {
  @IsOptional()
  readonly limit: number = 10;

  @IsOptional()
  readonly offset: number = 0;

  @IsOptional()
  readonly searchText: string = '';

  @IsString()
  @IsOptional()
  readonly sortType: string = 'DSEC';
}
