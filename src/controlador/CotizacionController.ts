import CotizacionService from "../servicio/CotizacionService";
import { v4 } from "uuid";

const cotizacionService = new CotizacionService();

class CotizacionController {
    static async calcularCotizacion(event: { body: string }): Promise<{ statusCode: number; body: string }> {
        try {
            // Parseamos el cuerpo de la solicitud
            const { edad, genero, plan, tipoSeguro } = JSON.parse(event.body).payload;
            const id = v4();

            // Validación de datos
            if (
                typeof edad !== 'number' || isNaN(edad) ||
                !['M', 'F'].includes(genero) ||
                !['HIJOS', 'PADRES'].includes(plan) ||
                typeof tipoSeguro !== 'string'
            ) {
                console.error("Datos inválidos en la solicitud:", { edad, genero, plan, tipoSeguro });
                throw new Error('Datos inválidos en la solicitud');
            }

            // Crear el objeto Payload antes de mandarlo a cotizar
            const payload = { edad, genero, plan, tipoSeguro, id };

            // Llamamos al servicio de cotización con el payload
            console.log("Llamando al servicio con el siguiente payload:", payload);
            const result = await cotizacionService.calcularCotizacion(payload);

            // Retornamos la respuesta exitosa con la cotización calculada
            return {
                statusCode: 200,
                body: JSON.stringify({
                    status: 200,
                    message: 'Cotización calculada correctamente',
                    data: result,
                }),
            };
        } catch (error: unknown) {
            // Manejo del error cuando el tipo de error es unknown
            if (error instanceof Error) {
                // Si el error es una instancia de Error, podemos acceder a message y stack
                console.error("Error al calcular la cotización:", error.message);
                return {
                    statusCode: 400,
                    body: JSON.stringify({
                        status: 400,
                        message: 'Error desconocido',
                        error: error.message,  // Enviamos el mensaje de error
                    }),
                };
            } else {
                // Si el error no es una instancia de Error, lo mostramos como un objeto desconocido
                console.error("Error desconocido:", error);
                return {
                    statusCode: 400,
                    body: JSON.stringify({
                        status: 400,
                        message: 'Error desconocido',
                        error: 'Un error desconocido ocurrió',  // Mensaje por defecto si no es un Error
                    }),
                };
            }
        }
    }
}

export default CotizacionController;
