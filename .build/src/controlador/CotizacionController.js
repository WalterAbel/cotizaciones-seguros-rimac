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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CotizacionService_1 = __importDefault(require("../servicio/CotizacionService"));
const uuid_1 = require("uuid");
const cotizacionService = new CotizacionService_1.default();
class CotizacionController {
    static calcularCotizacion(event) {
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
                const result = yield cotizacionService.calcularCotizacion(payload);
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
}
exports.default = CotizacionController;
