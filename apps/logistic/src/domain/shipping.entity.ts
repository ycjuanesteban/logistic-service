import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Shipping {

    @PrimaryGeneratedColumn()
    public Id: number;
}