"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcular = void 0;
const core_1 = require("@nestjs/core");
const cotizacionModule_1 = require("./cotizacionModule");
let app;
const calcular = (event) => __awaiter(void 0, void 0, void 0, function* () {
    if (!app) {
        app = yield core_1.NestFactory.createApplicationContext(cotizacionModule_1.CotizacionModule);
    }
    console.log("********EVENT*******");
    console.log(event);
    console.log("******MODULES*********");
    console.log(app.container.getModules());
    const controller = app.get("CotizacionController");
    console.log("******CONTROLERS*********");
    console.log(controller);
    return controller.handleRequest(event);
    //return await CotizacionController.calcularCotizacion(event);
});
exports.calcular = calcular;
//return handleRequest(appContext, action);
