import { Negociacoes, /*NegociacaoService,*/ Negociacao } from '../domain';
import { NegociacoesView, MensagemView, Mensagem, DataConverter } from '../ui';
import { getNegociacaoDao, Bind, getExceptionMessage, debounce, controller, bindEvent } from '../util';


@controller('#data', '#quantidade', '#valor')
export class NegociacaoController {

    constructor(_inputData, _inputQuantidade, _inputValor) {
        Object.assign(this, { _inputData, _inputQuantidade, _inputValor});
        //const $ = document.querySelector.bind(document);
        /*this._inputData = _inputData; //$("#data");
        this._inpuQuantidade = inputQuantidade; // $("#quantidade");
        this._inputValor = inputValor; // $("#valor");*/
        this._negociacoes = new Bind(new Negociacoes(), new NegociacoesView("#negociacoes"), 'adiciona','esvazia');
        this._mensagem = new Bind(new Mensagem(), new MensagemView("#mensagemView"), 'texto');
        /*this._service = new NegociacaoService();*/
        this._init();
    }
    async _init() {
        try {
            const dao = await getNegociacaoDao();
            const negociacoes = await dao.listaTodos();
            negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao))
        } catch(err) {
            this._mensagem.texto = getExceptionMessage(err);
        }
    }
    _criaNegociacao() {
        let data = DataConverter.paraData(this._inputData.value);
        return new Negociacao(
            data,
            parseInt(this._inpuQuantidade.value),
            parseFloat(this._inputValor.value));
    }
    _limpaFormulario() {
        this._inputData.value = '';
        this._inpuQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

    @bindEvent('click', '#botao-importa')
    @debounce(1500)
    async importaNegociacoes() {
        try {
            const { NegociacaoService } = await import('../domain/negociacao/NegociacaoService');
            const service = new NegociacaoService();
            const negociacoes = await service.obterNegociacoesDoPeriodo();
            negociacoes
                .filter(novaNegociacao => !this._negociacoes.paraArray()
                    .some(negociacaoExistente => novaNegociacao.equals(negociacaoExistente)))
                .forEach(negociacao => this._negociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações do período importadas com sucesso';
        } catch(err) {
            this._mensagem.texto = getExceptionMessage(err);
        }        
    }

    @bindEvent('submit', '.form')
    @debounce()
    async adiciona(event) {
        try {
            event.preventDefault();
            const negociacao = this._criaNegociacao();

            const dao = await getNegociacaoDao();
            await dao.adiciona(negociacao);
            this._negociacoes.adiciona(negociacao);
            this._mensagem.texto = "Negociação incluída com sucesso!";
            this._limpaFormulario();

        } catch (e) {
            this._mensagem.texto = getExceptionMessage(err);
        }
    }

    @bindEvent('click', '#botao-apaga')
    async apaga() {
        try {
            const dao = await getNegociacaoDao();
            await dao.apagaTodos();
            this._negociacoes.esvazia();
            this._mensagem.texto = "Negociações apagadas com sucesso";
        } catch(err) {
            this._mensagem.texto = getExceptionMessage(err);
        }
        
    }

}