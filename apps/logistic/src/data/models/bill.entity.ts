import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BillDetailEntity } from "./billdetails.entity";
import { ShippingEntity } from "./shipping.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: 'bill' })
export class BillEntity {

    @PrimaryGeneratedColumn()
    public Id: number;

    @Column()
    public Date: Date;

    @Column()
    public Address: string;

    @OneToMany(type => BillDetailEntity, detail => detail.Bill, { eager: true, cascade: true })
    public Details: BillDetailEntity[];

    @ManyToOne(type => UserEntity, user => user.Bills)
    @JoinColumn({ name: "ClientId" })
    public User: UserEntity;

    @OneToOne(() => ShippingEntity, { eager: true, cascade: true })
    @JoinColumn({ name: "ShippingId" })
    public Shipping: ShippingEntity;
}