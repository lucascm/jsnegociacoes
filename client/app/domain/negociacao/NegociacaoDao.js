System.register(['./Negociacao.js'], function (_export, _context) {
    "use strict";

    var Negociacao;
    return {
        setters: [function (_NegociacaoJs) {
            Negociacao = _NegociacaoJs.Negociacao;
        }],
        execute: function () {
            let NegociacaoDao = class NegociacaoDao {
                constructor(conn) {
                    this._connection = conn;
                    this._store = 'negociacoes';
                }
                adiciona(negociacao) {
                    return new Promise((resolve, reject) => {
                        const request = this._connection.transaction([this._store], 'readwrite').objectStore(this._store).add(negociacao);

                        request.onsuccess = e => resolve();
                        request.onerror = e => {
                            console.log(e.target.error);
                            reject('Não foi possível salvar a negociação');
                        };
                    });
                }
                listaTodos() {
                    return new Promise((resolve, reject) => {
                        const negociacoes = [];
                        const cursor = this._connection.transaction([this._store], 'readwrite').objectStore(this._store).openCursor();
                        cursor.onsuccess = e => {
                            const atual = e.target.result;
                            if (atual) {
                                const negociacao = new Negociacao(atual.value._data, atual.value._quantidade, atual.value._valor);
                                negociacoes.push(negociacao);
                                atual.continue();
                            } else {
                                resolve(negociacoes);
                            }
                        };
                        cursor.onerror = e => {
                            console.log(e.target.error);
                            reject('Não foi possível listar nas negociações');
                        };
                    });
                }
                apagaTodos() {
                    return new Promise((resolve, reject) => {
                        const request = this._connection.transaction([this._store], 'readwrite').objectStore(this._store).clear();
                        request.onsuccess = e => resolve();
                        request.onerror = e => {
                            console.log(e.target.error);
                            reject('Não foi possível apagar as negociações');
                        };
                    });
                }
            };

            _export('NegociacaoDao', NegociacaoDao);
        }
    };
});
//# sourceMappingURL=NegociacaoDao.js.map