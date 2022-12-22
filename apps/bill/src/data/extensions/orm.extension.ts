import { TypeOrmModule } from "@nestjs/typeorm";
import { Bill, BillDetail, User } from "../../domain";

var UseMySQL = [
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'user',
        password: 'password',
        database: 'db',
        entities: [
            User,
            Bill,
            BillDetail
        ],
        synchronize: true
    })
]

export default UseMySQL;