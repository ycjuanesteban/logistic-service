import { CommandBus } from "@nestjs/cqrs";
import { ApiResponse } from "@nestjs/swagger";

@ApiResponse({ status: 400, description: "Bad request" })
@ApiResponse({ status: 404, description: "Entity not found" })

export class BaseController {
    constructor(protected commandBus: CommandBus) { }
}