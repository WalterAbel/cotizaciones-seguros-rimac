import { Module } from "@nestjs/common"
import { CotizacionController } from "../controller/CotizacionController";
import { CotizacionRepository } from "../db/CotizacionRepository";
import { CotizacionDomainService } from "../../domain/service/CotizacionDomainService";
import { CotizacionApplicationService } from "../../application/CotizacionApplicationService";

const cotizacionProvider = [
    CotizacionDomainService,
    CotizacionApplicationService,
    {
        provide: "CotizacionRepository",
        useClass: CotizacionRepository
    }
]

@Module({
    controllers: [CotizacionController],
    providers: cotizacionProvider
})
export class CotizacionModule {};