import { DataInvalidaException } from './DataInvalidaException.js';
export class DataConverter {
    constructor() {
        throw new Error("Esta classe não pode ser instanciada");
    }
    static paraTexto(data) {
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    }
    static paraData(dataStr) {
        // recebe "2019-12-07"
        // retorna new Date(2019, 11, 07)
        if (!/\d{2}\/\d{2}\/\d{4}$/.test(dataStr)) {
            throw new DataInvalidaException();
        }
        return new Date(...dataStr.split("/").reverse().map((item, indice) => item - indice % 2));

    }
}