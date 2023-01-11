import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BillEntity } from "./bill.entity";

@Entity({name: 'user'})
export class UserEntity {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column({ type: "varchar", length: 200 })
    Name: string;

    @OneToMany(type => BillEntity, bill => bill.User, { eager: true, cascade: true })
    Bills: BillEntity[]
}