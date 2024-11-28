"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CotizacionModule = void 0;
const common_1 = require("@nestjs/common");
const CotizacionController_1 = require("../controller/CotizacionController");
const CotizacionRepository_1 = require("../db/CotizacionRepository");
const CotizacionDomainService_1 = require("../../domain/service/CotizacionDomainService");
const CotizacionApplicationService_1 = require("../../application/CotizacionApplicationService");
const cotizacionProvider = [
    CotizacionDomainService_1.CotizacionDomainService,
    CotizacionApplicationService_1.CotizacionApplicationService,
    {
        provide: "CotizacionRepository",
        useClass: CotizacionRepository_1.CotizacionRepository
    }
];
let CotizacionModule = class CotizacionModule {
};
exports.CotizacionModule = CotizacionModule;
exports.CotizacionModule = CotizacionModule = __decorate([
    (0, common_1.Module)({
        controllers: [CotizacionController_1.CotizacionController],
        providers: cotizacionProvider
    })
], CotizacionModule);
;
