import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Bill } from './bill.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'varchar', length: 200 })
  Name: string;

  @OneToMany((type) => Bill, (bill) => bill.User, {
    eager: true,
    cascade: true,
  })
  Bills: Bill[];
}
