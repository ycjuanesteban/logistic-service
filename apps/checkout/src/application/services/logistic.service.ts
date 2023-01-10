import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CheckoutDto } from "../dtos/checkoutDto";

@Injectable()
export class LogisticService {

    constructor(
        private readonly httpService: HttpService,
        private configService: ConfigService
    ) { }

    async addNewBill(checkout: CheckoutDto): Promise<void> {
        let baseUrl = this.configService.getOrThrow<string>('LOGISTIC_SERVICE_URL');
        await this.httpService.axiosRef.post(`${baseUrl}/api/v1/shipping`, checkout);
    }
}