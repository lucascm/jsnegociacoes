class NegociacaoController {

    constructor() {
        const $ = document.querySelector.bind(document);
        this._inputData = $("#data");
        this._inpuQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        debugger;
        this._negociacoes = new Bind(new Negociacoes(), new NegociacoesView("#negociacoes"), 'adiciona','esvazia');
        this._mensagem = new Bind(new Mensagem(), new MensagemView("#mensagemView"), 'texto');
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
    adiciona(event) {
        event.preventDefault();
        this._negociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = "Negociação incluída com sucesso!";
        this._limpaFormulario();
    }

    apaga() {
        this._negociacoes.esvazia();
        this._mensagem.texto = "Negociações apagadas com sucesso";
    }

}