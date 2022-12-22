import { EntitySchema } from "typeorm";
import { Bill, User } from "../../domain";

export const UserEntitySchema = new EntitySchema<User>({
    name: "User",
    tableName: "Users",
    columns: {
        Id: {
            type: "int",
            primary: true,
            generated: true
        },
        Name: {
            type: "varchar",
            length: 200
        }
    },
    relations: {
        Bills: {
            type: "one-to-many",
            target: Bill,
            eager: true
        }
    }
});