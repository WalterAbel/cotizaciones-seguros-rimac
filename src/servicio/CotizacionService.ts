import AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient();

type Payload = {
    edad: number;
    genero: 'M' | 'F';
    plan: 'HIJOS' | 'PADRES';
    tipoSeguro: string;
    id: string;
}

type RangoEdad = {
    edadMin: number;
    edadMax: number;
    factor: number;
}

type TarifasBase = {
    [plan: string]: { [genero: string]: number };
}

class CotizacionService {
    private tarifasBase: TarifasBase;
    private ajusteEdad: RangoEdad[];

    constructor() {

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

    async calcularCotizacion(payload: Payload) {
        const { edad, genero, plan, tipoSeguro, id } = payload;

        // Calculamos tarifa base
        const tarifaBase = this.tarifasBase[plan][genero];
        if (tarifaBase === undefined) {
            console.log("Error: Tarifa no encontrada para el plan o género");
            throw new Error('Tarifa no encontrada para el plan o género');
        }

        // Calculamos el factor
        const factorEdad = this.ajusteEdad.find(rango => edad >= rango.edadMin && edad <= rango.edadMax)?.factor || 1.0;
        const cotizacion = tarifaBase * factorEdad;

        // Calcular la fecha de inicio de la cobertura ya que empieza el siguiente mes
        const fechaInicioCobertura = new Date();
        fechaInicioCobertura.setMonth(fechaInicioCobertura.getMonth() + 1);
        fechaInicioCobertura.setDate(1);
        const fechaInicioCoberturaStr = fechaInicioCobertura.toISOString().split('T')[0];

        // Guardamos en DynamoDB
        try {
            await dynamodb.put({
                TableName: 'SeguroTable2',
                Item: {
                    id,  // Asegúrate de incluir el id como clave primaria
                    edad,
                    genero,
                    plan,
                    tipoSeguro,
                    cotizacion,
                    fechaInicioCobertura: fechaInicioCoberturaStr,
                }
            }).promise();

            return {
                cotizacion,
                moneda: 'PEN',
                periodo: 'mes',
                fechaInicioCobertura: fechaInicioCoberturaStr,
            };
        } catch (error) {
            throw new Error("Error al guardar la cotización en la base de datos");
        }
    }
}

export default CotizacionService;