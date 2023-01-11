import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BillEntity } from "./bill.entity";
import { ProductEntity } from "./product.entity";

@Entity({ name: 'bill_detail' })
export class BillDetailEntity {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    Quantity: number;

    @Column({
        type: "double"
    })
    Cost: number;

    @ManyToOne(type => ProductEntity, product => product.BillDetails, { cascade: true })
    @JoinColumn({ name: "ProductId" })
    Product: ProductEntity;

    @ManyToOne(type => BillEntity, bill => bill.Details)
    @JoinColumn({ name: "BillId" })
    Bill: BillEntity;
}