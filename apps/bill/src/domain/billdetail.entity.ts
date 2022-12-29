import { BasicEntity } from "@app/shared";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Bill } from "./bill.entity";
import { Product } from "./product.entity";

@Entity()
export class BillDetail extends BasicEntity {

    @Column()
    Quantity: number;

    @Column({
        type: "double"
    })
    Cost: number;

    @ManyToOne(type => Product, product => product.BillDetails, { cascade: true })
    @JoinColumn({ name: "ProductId" })
    Product: Product;

    @ManyToOne(type => Bill, bill => bill.Details)
    @JoinColumn({ name: "BillId" })
    Bill: Bill;
}