import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BillDetail } from './billdetail.entity';
import { User } from './user.entity';

@Entity()
export class Bill {
  @PrimaryGeneratedColumn()
  public Id: number;

  @Column()
  public Date: Date;

  @Column()
  public Address: string;

  @OneToMany((type) => BillDetail, (detail) => detail.Bill, {
    eager: true,
    cascade: true,
  })
  public Details: BillDetail[];

  @ManyToOne((type) => User, (user) => user.Bills)
  @JoinColumn({ name: 'ClientId' })
  public User: User;
}
