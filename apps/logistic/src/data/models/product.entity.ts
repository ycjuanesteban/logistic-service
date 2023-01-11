import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BillDetailEntity } from "./billdetails.entity";

@Entity({ name: 'product' })
export class ProductEntity {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    public Name: string;

    @OneToMany(type => BillDetailEntity, detail => detail.Product)
    public BillDetails: BillDetailEntity[];
}