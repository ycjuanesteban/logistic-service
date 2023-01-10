import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BillDetail } from './billdetails.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  public Name: string;

  @OneToMany((type) => BillDetail, (detail) => detail.Product)
  public BillDetails: BillDetail[];
}
