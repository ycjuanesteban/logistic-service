import { EntitySchema } from "typeorm";
import { Bill, BillDetail } from "../../domain";

export const BillDetailEntitySchema = new EntitySchema<BillDetail>({
    name: "BillDetail",
    tableName: "BillsDetails",
    columns: {
        Id: {
            type: "int",
            primary: true,
            generated: true
        },
        ProductId: {
            type: "int"
        },
        Quantity: {
            type: "int"
        },
        UnitaryCost: {
            type: "double"
        }
    },
    relations: {
        Bill: {
            type: "many-to-many",
            target: Bill,
            joinColumn: {
                name: "Bill",
                referencedColumnName: "Bill"
            },
            eager: true
        }
    }
})