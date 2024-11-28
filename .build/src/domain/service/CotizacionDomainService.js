"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.CotizacionDomainService = void 0;
const common_1 = require("@nestjs/common");
let CotizacionDomainService = class CotizacionDomainService {
    constructor(cotizacionRepository) {
        this.cotizacionRepository = cotizacionRepository;
        this.tarifasBase = {
            HIJOS: { M: 100, F: 120 },
            PADRES: { M: 200, F: 220 },
        };
        this.ajusteEdad = [
            { edadMin: 0, edadMax: 17, factor: 0.8 },
            { edadMin: 18, edadMax: 39, factor: 1.0 },
            { edadMin: 40, edadMax: 59, factor: 1.2 },
            { edadMin: 60, edadMax: 100, factor: 1.5 },
        ];
    }
    calcularCotizacion(payload) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { edad, genero, plan, tipoSeguro, id } = payload;
            // Calculamos tarifa base
            const tarifaBase = this.tarifasBase[plan][genero];
            if (tarifaBase === undefined) {
                console.log("Error: Tarifa no encontrada para el plan o género");
                throw new Error('Tarifa no encontrada para el plan o género');
            }
            // Calculamos el factor
            const factorEdad = ((_a = this.ajusteEdad.find(rango => edad >= rango.edadMin && edad <= rango.edadMax)) === null || _a === void 0 ? void 0 : _a.factor) || 1.0;
            const cotizacion = tarifaBase * factorEdad;
            // Calcular la fecha de inicio de la cobertura ya que empieza el siguiente mes
            const fechaInicioCobertura = new Date();
            fechaInicioCobertura.setMonth(fechaInicioCobertura.getMonth() + 1);
            fechaInicioCobertura.setDate(1);
            const fechaInicioCoberturaStr = fechaInicioCobertura.toISOString().split('T')[0];
            // Guardamos en DynamoDB
            try {
                yield this.cotizacionRepository.guardarCotizacion({
                    id,
                    edad,
                    genero,
                    plan,
                    tipoSeguro,
                    cotizacion,
                    fechaInicioCobertura: fechaInicioCoberturaStr,
                });
                return {
                    cotizacion,
                    moneda: 'PEN',
                    periodo: 'mes',
                    fechaInicioCobertura: fechaInicioCoberturaStr,
                };
            }
            catch (error) {
                throw new Error("Error al guardar la cotización en la base de datos");
            }
        });
    }
};
exports.CotizacionDomainService = CotizacionDomainService;
exports.CotizacionDomainService = CotizacionDomainService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("CotizacionRepository")),
    __metadata("design:paramtypes", [Object])
], CotizacionDomainService);
