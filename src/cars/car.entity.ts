import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  model: string;

  @Column()
  number: string;

  @Column()
  make: string;

  @Column()
  category: string;

  @Column()
  color: string;
}
