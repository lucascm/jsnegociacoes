System.register([], function (_export, _context) {
    "use strict";

    return {
        setters: [],
        execute: function () {
            class Mensagem {
                constructor(texto = '') {
                    this._texto = texto;
                }

                get texto() {
                    return this._texto;
                }

                set texto(value) {
                    this._texto = value;
                }
            }

            _export('Mensagem', Mensagem);
        }
    };
});
//# sourceMappingURL=Mensagem.js.map