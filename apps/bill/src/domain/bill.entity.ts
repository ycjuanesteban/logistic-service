import { BasicEntity } from "@app/shared";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BillDetail } from "./billdetail.entity";
import { User } from "./user.entity";

@Entity()
export class Bill extends BasicEntity {

    @Column()
    public Date: Date;

    @Column()
    public Address: string;

    @OneToMany(type => BillDetail, detail => detail.Bill, { eager: true })
    public Details: BillDetail[];

    @ManyToOne(type => User, user => user.Bills)
    @JoinColumn({ name: "ClientId" })
    public User: User;
}