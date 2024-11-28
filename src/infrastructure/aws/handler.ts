import { NestFactory } from "@nestjs/core"
import { CotizacionModule } from "./cotizacionModule";
import { CotizacionController } from "../controller/CotizacionController";
let app: any


export const calcular = async (event: { body: string }): Promise<{ statusCode: number; body: string }> => {
    if (!app) {
        app = await NestFactory.createApplicationContext(CotizacionModule);
    }
    const controller = app.get(CotizacionController)
    return controller.calcularCotizacion(event)
};



