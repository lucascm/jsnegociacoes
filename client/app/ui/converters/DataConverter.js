System.register(["./DataInvalidaException.js"], function (_export, _context) {
    "use strict";

    var DataInvalidaException;
    return {
        setters: [function (_DataInvalidaExceptionJs) {
            DataInvalidaException = _DataInvalidaExceptionJs.DataInvalidaException;
        }],
        execute: function () {
            let DataConverter = class DataConverter {
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
            };

            _export("DataConverter", DataConverter);
        }
    };
});
//# sourceMappingURL=DataConverter.js.map