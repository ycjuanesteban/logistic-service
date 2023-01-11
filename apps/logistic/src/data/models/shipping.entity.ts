import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'shipping' })
export class ShippingEntity {

    @PrimaryGeneratedColumn()
    public Id: number;
}