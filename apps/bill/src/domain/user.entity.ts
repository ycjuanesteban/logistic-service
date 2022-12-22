import { BasicEntity } from "@app/shared";
import { Column, Entity, OneToMany } from "typeorm";
import { Bill } from "./bill.entity";

@Entity()
export class User extends BasicEntity {

    @Column({ type: "varchar", length: 200 })
    Name: string;

    @OneToMany(type => Bill, bill => bill.User, { eager: true })
    Bills: Bill[]
}