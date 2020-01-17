System.register(['../domain/index.js', '../ui/index.js', '../util/index.js'], function (_export, _context) {
    "use strict";

    var Negociacoes, NegociacaoService, Negociacao, NegociacoesView, MensagemView, Mensagem, DataInvalidaException, DataConverter, getNegociacaoDao, Bind;
    return {
        setters: [function (_domainIndexJs) {
            Negociacoes = _domainIndexJs.Negociacoes;
            NegociacaoService = _domainIndexJs.NegociacaoService;
            Negociacao = _domainIndexJs.Negociacao;
        }, function (_uiIndexJs) {
            NegociacoesView = _uiIndexJs.NegociacoesView;
            MensagemView = _uiIndexJs.MensagemView;
            Mensagem = _uiIndexJs.Mensagem;
            DataInvalidaException = _uiIndexJs.DataInvalidaException;
            DataConverter = _uiIndexJs.DataConverter;
        }, function (_utilIndexJs) {
            getNegociacaoDao = _utilIndexJs.getNegociacaoDao;
            Bind = _utilIndexJs.Bind;
        }],
        execute: function () {
            class NegociacaoController {

                constructor() {
                    const $ = document.querySelector.bind(document);
                    this._inputData = $("#data");
                    this._inpuQuantidade = $("#quantidade");
                    this._inputValor = $("#valor");
                    this._negociacoes = new Bind(new Negociacoes(), new NegociacoesView("#negociacoes"), 'adiciona', 'esvazia');
                    this._mensagem = new Bind(new Mensagem(), new MensagemView("#mensagemView"), 'texto');
                    this._service = new NegociacaoService();
                    this._init();
                }
                _init() {
                    getNegociacaoDao().then(dao => dao.listaTodos()).then(negociacoes => negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao))).catch(err => this._mensagem.texto = err);
                }
                _criaNegociacao() {
                    let data = DataConverter.paraData(this._inputData.value);
                    return new Negociacao(data, parseInt(this._inpuQuantidade.value), parseFloat(this._inputValor.value));
                }
                _limpaFormulario() {
                    this._inputData.value = '';
                    this._inpuQuantidade.value = 1;
                    this._inputValor.value = 0.0;
                    this._inputData.focus();
                }
                importaNegociacoes() {
                    this._service.obterNegociacoesDoPeriodo().then(negociacoes => {
                        negociacoes.filter(novaNegociacao => !this._negociacoes.paraArray().some(negociacaoExistente => novaNegociacao.equals(negociacaoExistente))).forEach(negociacao => this._negociacoes.adiciona(negociacao));
                        this._mensagem.texto = 'Negociações do período importadas com sucesso';
                    }).catch(err => this._mensagem.texto = err);
                }
                adiciona(event) {
                    try {
                        event.preventDefault();
                        const negociacao = this._criaNegociacao();

                        getNegociacaoDao().then(dao => dao.adiciona(negociacao)).then(() => {
                            this._negociacoes.adiciona(negociacao);
                            this._mensagem.texto = "Negociação incluída com sucesso!";
                            this._limpaFormulario();
                        }).catch(err => this._mensagem.texto = err);
                    } catch (e) {
                        console.error(e);
                        console.log(e.stack);
                        if (e instanceof DataInvalidaException) {
                            this._mensagem.texto = e.message;
                        } else {
                            this._mensagem.texto = "Um erro inesperado aconteceu. Entre em contato com o suporte. Ref: adiciona()";
                        }
                    }
                }

                apaga() {
                    getNegociacaoDao().then(dao => dao.apagaTodos()).then(() => {
                        this._negociacoes.esvazia();
                        this._mensagem.texto = "Negociações apagadas com sucesso";
                    }).catch(err => this._mensagem.texto = err);
                }

            }

            _export('NegociacaoController', NegociacaoController);
        }
    };
});
//# sourceMappingURL=NegociacaoController.js.map