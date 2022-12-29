import { BasicEntity } from "@app/shared";
import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import { BillDetail } from "./billdetail.entity";

@Entity()
export class Product extends BasicEntity {

    @Column()
    public Name: string;

    @OneToMany(type => BillDetail, detail => detail.Product)
    public BillDetails: BillDetail[];
}