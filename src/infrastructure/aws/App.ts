import { Module } from "@nestjs/common";
import { CotizacionModule } from "./cotizacionModule";


@Module({

    imports: [CotizacionModule]

})
export class AppModule { };