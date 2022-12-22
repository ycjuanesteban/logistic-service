import { BasicEntity } from "@app/shared";
import { Column, Entity, OneToMany } from "typeorm";
import { BillDetail } from "./billdetail.entity";
import { User } from "./user.entity";

@Entity()
export class Bill extends BasicEntity {

    @Column()
    TotalCost: number;

    @OneToMany(type => BillDetail, detail => detail.Bill, { eager: true })
    Details: BillDetail[];

    @OneToMany(type => User, user => user.Bills)
    User: User;
}