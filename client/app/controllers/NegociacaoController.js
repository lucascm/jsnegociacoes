class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $("#data");
        this._inpuQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        this._negociacoes = new Negociacoes();
        this._negociacoesView = new NegociacoesView("#negociacoes");
        this._negociacoesView.update(this._negociacoes);
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView("#mensagemView");
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
        this._mensagemView.update(this._mensagem);
        this._negociacoesView.update(this._negociacoes);
        this._limpaFormulario();
    }

}