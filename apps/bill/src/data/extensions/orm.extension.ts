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
        //migrations: [__dirname + '../migrations/*.ts'],
        entities: [
            User,
            Bill,
            BillDetail
        ],
        synchronize: true,
        logger: "debug"
    })//,
    // TypeOrmModule.forFeature([
    //     User,
    //     Bill,
    //     BillDetail
    // ])
]

export default UseMySQL;