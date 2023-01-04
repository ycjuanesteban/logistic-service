import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CheckoutDto } from "../dtos/checkoutDto";

@Injectable()
export class BillService {

    constructor(
        private readonly httpService: HttpService,
        private configService: ConfigService
    ) { }

    async addNewBill(checkout: CheckoutDto): Promise<void> {
        let baseUrl = this.configService.getOrThrow<string>('BILL_SERVICE_URL');
        await this.httpService.axiosRef.post(`${baseUrl}/bill`, checkout);
    }
}