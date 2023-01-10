import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bill } from './bill.entity';
import { Product } from './product.entity';

@Entity()
export class BillDetail {
  @PrimaryGeneratedColumn()
  public Id: number;

  @Column()
  public Quantity: number;

  @Column({
    type: 'double',
  })
  public Cost: number;

  @ManyToOne((type) => Product, (product) => product.BillDetails, {
    cascade: true,
  })
  @JoinColumn({ name: 'ProductId' })
  public Product: Product;

  @ManyToOne((type) => Bill, (bill) => bill.Details)
  @JoinColumn({ name: 'BillId' })
  public Bill: Bill;
}
