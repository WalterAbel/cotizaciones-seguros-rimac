import { Controller, Post } from "@nestjs/common";
import { CotizacionApplicationService } from "../../application/CotizacionApplicationService";

@Controller("salud")
export class CotizacionController {

    constructor(private readonly calcularAppService: CotizacionApplicationService) {

    }
    @Post("calcularCotizacion")
    public async calcularCotizacion(event: { body: string }): Promise<{ statusCode: number; body: string }> {
        return this.calcularAppService.calcularCotizacion(event)

    }
}
