import { NestFactory } from "@nestjs/core"
import { AppModule } from './App';
import { CotizacionModule } from "./cotizacionModule";
let app: any


export const calcular = async (event: { body: string }): Promise<{ statusCode: number; body: string }> => {
    if (!app) {
        app = await NestFactory.createApplicationContext(CotizacionModule);
    }
    console.log("********EVENT*******")
    console.log(event)
    console.log("******MODULES*********")
    console.log(app.container.getModules())
    const controller = app.get("CotizacionController")
    console.log("******CONTROLERS*********")
    console.log(controller)
    return controller.handleRequest(event)
    //return await CotizacionController.calcularCotizacion(event);
};
//return handleRequest(appContext, action);


