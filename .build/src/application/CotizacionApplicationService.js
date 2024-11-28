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
exports.CotizacionApplicationService = void 0;
const uuid_1 = require("uuid");
const CotizacionDomainService_1 = require("../domain/service/CotizacionDomainService");
const common_1 = require("@nestjs/common");
let CotizacionApplicationService = class CotizacionApplicationService {
    constructor(cotizacionDomainService) {
        this.cotizacionDomainService = cotizacionDomainService;
    }
    calcularCotizacion(event) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Parseamos el cuerpo de la solicitud
                const { edad, genero, plan, tipoSeguro } = JSON.parse(event.body).payload;
                const id = (0, uuid_1.v4)();
                // Validación de datos
                if (typeof edad !== 'number' || isNaN(edad) ||
                    !['M', 'F'].includes(genero) ||
                    !['HIJOS', 'PADRES'].includes(plan) ||
                    typeof tipoSeguro !== 'string') {
                    console.error("Datos inválidos en la solicitud:", { edad, genero, plan, tipoSeguro });
                    throw new Error('Datos inválidos en la solicitud');
                }
                // Crear el objeto Payload antes de mandarlo a cotizar
                const payload = { edad, genero, plan, tipoSeguro, id };
                // Llamamos al servicio de cotización con el payload
                console.log("Llamando al servicio con el siguiente payload:", payload);
                const result = yield this.cotizacionDomainService.calcularCotizacion(payload);
                // Retornamos la respuesta exitosa con la cotización calculada
                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        status: 200,
                        message: 'Cotización calculada correctamente',
                        data: result,
                    }),
                };
            }
            catch (error) {
                // Manejo del error cuando el tipo de error es unknown
                if (error instanceof Error) {
                    // Si el error es una instancia de Error, podemos acceder a message y stack
                    console.error("Error al calcular la cotización:", error.message);
                    return {
                        statusCode: 400,
                        body: JSON.stringify({
                            status: 400,
                            message: 'Error desconocido',
                            error: error.message, // Enviamos el mensaje de error
                        }),
                    };
                }
                else {
                    // Si el error no es una instancia de Error, lo mostramos como un objeto desconocido
                    console.error("Error desconocido:", error);
                    return {
                        statusCode: 400,
                        body: JSON.stringify({
                            status: 400,
                            message: 'Error desconocido',
                            error: 'Un error desconocido ocurrió', // Mensaje por defecto si no es un Error
                        }),
                    };
                }
            }
        });
    }
};
exports.CotizacionApplicationService = CotizacionApplicationService;
exports.CotizacionApplicationService = CotizacionApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [CotizacionDomainService_1.CotizacionDomainService])
], CotizacionApplicationService);
