import { PrimaryGeneratedColumn } from "typeorm";

export class BasicEntity {

    @PrimaryGeneratedColumn()
    Id: number;
}