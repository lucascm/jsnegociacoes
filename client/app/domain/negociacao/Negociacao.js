System.register([], function (_export, _context) {
    "use strict";

    return {
        setters: [],
        execute: function () {
            let Negociacao = class Negociacao {
                constructor(_data, _quantidade, _valor) {
                    Object.assign(this, { _data: new Date(_data.getTime()), _quantidade, _valor });
                    Object.freeze(this);
                }
                get volume() {
                    return this.quantidade * this.valor;
                }

                get data() {
                    return new Date(this._data.getTime());
                }

                get quantidade() {
                    return this._quantidade;
                }

                get valor() {
                    return this._valor;
                }

                equals(negociacao) {
                    return JSON.stringify(this) === JSON.stringify(negociacao);

                    // return this.data.getDate() == negociacao.data.getDate() 
                    //     && this.data.getMonth() === negociacao.data.getMonth()
                    //     && this.data.getFullYear() === negociacao.data.getFullYear()
                    //     && this.quantidade === negociacao.quantidade
                    //     && this.valor === negociacao.valor;
                }

            };

            _export("Negociacao", Negociacao);
        }
    };
});
//# sourceMappingURL=Negociacao.js.map