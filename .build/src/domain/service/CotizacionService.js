"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CotizacionService = void 0;
const common_1 = require("@nestjs/common");
const CotizacionRepository_1 = require("../../infrastructure/db/CotizacionRepository");
let CotizacionService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CotizacionService = _classThis = class {
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
                    const conexionDynamo = new CotizacionRepository_1.CotizacionRepository();
                    yield conexionDynamo.guardarCotizacion({
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
    __setFunctionName(_classThis, "CotizacionService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CotizacionService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CotizacionService = _classThis;
})();
exports.CotizacionService = CotizacionService;
