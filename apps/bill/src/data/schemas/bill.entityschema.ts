import { EntitySchema } from "typeorm";
import { Bill } from "../../domain";

export const BillEntitySchema = new EntitySchema<Bill>({
    name: "Bill",
    tableName: "Bills",
    columns: {
        Id: {
            type: "int",
            primary: true,
            generated: true
        },
        TotalCost: {
            type: "double"
        }
    },
    relations: {
        User: {
            type: "many-to-one",
            target: "User",
            joinColumn: {
                name: "User",
                referencedColumnName: "User"
            },
            eager: true
        },
        Details: {
            type: "one-to-many",
            target: "Details",
            joinColumn: {
                name: "Bill",
                referencedColumnName: "Bill"
            },
            eager: true
        }
    }
});