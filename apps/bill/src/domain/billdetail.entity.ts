import { BasicEntity } from "@app/shared";
import { Column, Entity, JoinTable, ManyToOne } from "typeorm";
import { Bill } from "./bill.entity";

@Entity()
export class BillDetail extends BasicEntity {

    @Column()
    ProductId: number;

    @Column()
    Quantity: number;

    @Column()
    UnitaryCost: number;

    @ManyToOne(type => Bill, bill => bill.Details)
    Bill: Bill;
}