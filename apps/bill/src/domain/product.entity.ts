import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BillDetail } from './billdetail.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  public Id: number;

  @Column()
  public Name: string;

  @OneToMany((type) => BillDetail, (detail) => detail.Product)
  public BillDetails: BillDetail[];
}
