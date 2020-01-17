System.register(['../../util/HttpService.js', './Negociacao.js'], function (_export, _context) {
    "use strict";

    var HttpService, Negociacao;
    return {
        setters: [function (_utilHttpServiceJs) {
            HttpService = _utilHttpServiceJs.HttpService;
        }, function (_NegociacaoJs) {
            Negociacao = _NegociacaoJs.Negociacao;
        }],
        execute: function () {
            class NegociacaoService {
                constructor() {
                    this._http = new HttpService();
                }
                obterNegociacoesDoPeriodo() {
                    return Promise.all([this.obterNegociacoesDaSemana(), this.obterNegociacoesDaSemanaAnterior(), this.obterNegociacoesDaSemanaRetrasada()]).then(periodo => periodo.reduce((novoArray, item) => novoArray.concat(item), []).sort((a, b) => b.data.getTime() - a.data.getTime())).catch(err => {
                        throw new Error("Não foi possível obter as negociações do período");
                    });
                }
                obterNegociacoesDaSemana() {
                    return this._http.get("negociacoes/semana").then(dados => {
                        const negociacoes = dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                        return negociacoes;
                    }).catch(err => {
                        throw new Error("Não foi possível obter as negociações");
                    });
                }

                obterNegociacoesDaSemanaAnterior() {
                    return this._http.get("negociacoes/anterior").then(dados => dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))).catch(err => {
                        throw new Error("Não foi possível obter as negociações da semana anterior");
                    });
                }

                obterNegociacoesDaSemanaRetrasada() {
                    return this._http.get("negociacoes/retrasada").then(dados => dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))).catch(err => {
                        throw new Error("Não foi possível obter as negociações");
                    });
                }
            }

            _export('NegociacaoService', NegociacaoService);
        }
    };
});
//# sourceMappingURL=NegociacaoService.js.map