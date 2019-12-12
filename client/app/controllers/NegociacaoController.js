class NegociacaoController {

    constructor() {
        const $ = document.querySelector.bind(document);
        this._inputData = $("#data");
        this._inpuQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        this._negociacoes = new Bind(new Negociacoes(), new NegociacoesView("#negociacoes"), 'adiciona','esvazia');
        this._mensagem = new Bind(new Mensagem(), new MensagemView("#mensagemView"), 'texto');
        this._service = new NegociacaoService();
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
    importaNegociacoes() {
        this._service.obterNegociacoesDoPeriodo()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao));
            })
            .catch(err => this._mensagem.texto = err);
        
    }
    adiciona(event) {
        try {
            event.preventDefault();
            this._negociacoes.adiciona(this._criaNegociacao());
            this._mensagem.texto = "Negociação incluída com sucesso!";
            this._limpaFormulario();
        } catch (e) {
            console.error(e);
            console.log(e.stack);
            if (e instanceof DataInvalidaException) {
                this._mensagem.texto = e.message;
            } else [
                this._mensagem.texto = "Um erro inesperado aconteceu. Entre em contato com o suporte. Ref: adiciona()"
            ]
        }
    }

    apaga() {
        this._negociacoes.esvazia();
        this._mensagem.texto = "Negociações apagadas com sucesso";
    }

}