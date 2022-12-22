import { BasicEntity } from "@app/shared";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Bill } from "./bill.entity";

@Entity()
export class BillDetail extends BasicEntity {

    @Column()
    ProductId: number;

    @Column()
    Quantity: number;

    @Column()
    Cost: number;

    @ManyToOne(type => Bill, bill => bill.Details)
    @JoinColumn({ name: "BillId" })
    Bill: Bill;
}