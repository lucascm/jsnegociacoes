import { HttpService } from '../../util/HttpService.js';
import { Negociacao } from './Negociacao.js';
import { ApplicationException } from '../../util/ApplicationException.js';

export class NegociacaoService {
    constructor() {
        this._http = new HttpService();
    }
    async obterNegociacoesDoPeriodo() {
        try {
            let periodo = await Promise.all([
                this.obterNegociacoesDaSemana(),
                this.obterNegociacoesDaSemanaAnterior(),
                this.obterNegociacoesDaSemanaRetrasada(),
            ])
            return periodo
                .reduce((novoArray, item) => novoArray.concat(item), [])
                .sort((a, b)=> b.data.getTime() - a.data.getTime());
        } catch(err){
            console.log(err);
            throw new ApplicationException("Não foi possível obter as negociações do período");
        }
    }
    obterNegociacoesDaSemana() {
        return this._http.get("negociacoes/semana").then(dados => {
            const negociacoes = dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            return negociacoes;
        }).catch(err => {
            throw new ApplicationException("Não foi possível obter as negociações");
        });
    }

    obterNegociacoesDaSemanaAnterior() {
        return this._http.get("negociacoes/anterior")
        .then(dados => dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
        .catch(err => {
            throw new ApplicationException("Não foi possível obter as negociações da semana anterior");
        });
    }

    obterNegociacoesDaSemanaRetrasada() {
        return this._http.get("negociacoes/retrasada").then(dados => dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
        .catch(err => {
            throw new ApplicationException("Não foi possível obter as negociações");
        });

    }
}