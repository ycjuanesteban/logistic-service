import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bill } from './bill.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public Id: number;

  @Column({ type: 'varchar', length: 200 })
  public Name: string;

  @OneToMany((type) => Bill, (bill) => bill.User, {
    eager: true,
    cascade: true,
  })
  public Bills: Bill[];
}
