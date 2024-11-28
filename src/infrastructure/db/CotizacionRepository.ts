import AWS from "aws-sdk";
import { CotizacionInterfaceRepository } from "../../domain/infrastructure/cotizacionInterface";
import { Injectable } from "@nestjs/common";

export const dynamodb = new AWS.DynamoDB.DocumentClient();

@Injectable()
export class CotizacionRepository implements CotizacionInterfaceRepository {

    constructor() {

    }

    public async guardarCotizacion(cotizacion: object): Promise<any> {
        await dynamodb.put({
            TableName: 'SeguroTable2',
            Item: cotizacion
        }).promise();

        return {}
    }
}

