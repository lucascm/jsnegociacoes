System.register(['../domain/index.js', '../ui/index.js', '../util/index.js'], function (_export, _context) {
    "use strict";

    var Negociacoes, NegociacaoService, Negociacao, NegociacoesView, MensagemView, Mensagem, DataConverter, getNegociacaoDao, Bind, getExceptionMessage, debounce, controller;
    return {
        setters: [function (_domainIndexJs) {
            Negociacoes = _domainIndexJs.Negociacoes;
            NegociacaoService = _domainIndexJs.NegociacaoService;
            Negociacao = _domainIndexJs.Negociacao;
        }, function (_uiIndexJs) {
            NegociacoesView = _uiIndexJs.NegociacoesView;
            MensagemView = _uiIndexJs.MensagemView;
            Mensagem = _uiIndexJs.Mensagem;
            DataConverter = _uiIndexJs.DataConverter;
        }, function (_utilIndexJs) {
            getNegociacaoDao = _utilIndexJs.getNegociacaoDao;
            Bind = _utilIndexJs.Bind;
            getExceptionMessage = _utilIndexJs.getExceptionMessage;
            debounce = _utilIndexJs.debounce;
            controller = _utilIndexJs.controller;
        }],
        execute: function () {
            function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
                var desc = {};
                Object['ke' + 'ys'](descriptor).forEach(function (key) {
                    desc[key] = descriptor[key];
                });
                desc.enumerable = !!desc.enumerable;
                desc.configurable = !!desc.configurable;

                if ('value' in desc || desc.initializer) {
                    desc.writable = true;
                }

                desc = decorators.slice().reverse().reduce(function (desc, decorator) {
                    return decorator(target, property, desc) || desc;
                }, desc);

                if (context && desc.initializer !== void 0) {
                    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
                    desc.initializer = undefined;
                }

                if (desc.initializer === void 0) {
                    Object['define' + 'Property'](target, property, desc);
                    desc = null;
                }

                return desc;
            }

            var _dec, _dec2, _dec3, _class, _desc, _value, _class2;

            let NegociacaoController = (_dec = controller('#data', '#quantidade', '#valor'), _dec2 = debounce(1500), _dec3 = debounce(), _dec(_class = (_class2 = class NegociacaoController {

                constructor(_inputData, _inputQuantidade, _inputValor) {
                    Object.assign(this, { _inputData, _inputQuantidade, _inputValor });
                    //const $ = document.querySelector.bind(document);
                    /*this._inputData = _inputData; //$("#data");
                    this._inpuQuantidade = inputQuantidade; // $("#quantidade");
                    this._inputValor = inputValor; // $("#valor");*/
                    this._negociacoes = new Bind(new Negociacoes(), new NegociacoesView("#negociacoes"), 'adiciona', 'esvazia');
                    this._mensagem = new Bind(new Mensagem(), new MensagemView("#mensagemView"), 'texto');
                    this._service = new NegociacaoService();
                    this._init();
                }
                async _init() {
                    try {
                        const dao = await getNegociacaoDao();
                        const negociacoes = await dao.listaTodos();
                        negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao));
                    } catch (err) {
                        this._mensagem.texto = getExceptionMessage(err);
                    }
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

                async importaNegociacoes() {
                    try {
                        const negociacoes = await this._service.obterNegociacoesDoPeriodo();
                        negociacoes.filter(novaNegociacao => !this._negociacoes.paraArray().some(negociacaoExistente => novaNegociacao.equals(negociacaoExistente))).forEach(negociacao => this._negociacoes.adiciona(negociacao));
                        this._mensagem.texto = 'Negociações do período importadas com sucesso';
                    } catch (err) {
                        this._mensagem.texto = getExceptionMessage(err);
                    }
                }

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

                async apaga() {
                    try {
                        const dao = await getNegociacaoDao();
                        await dao.apagaTodos();
                        this._negociacoes.esvazia();
                        this._mensagem.texto = "Negociações apagadas com sucesso";
                    } catch (err) {
                        this._mensagem.texto = getExceptionMessage(err);
                    }
                }

            }, (_applyDecoratedDescriptor(_class2.prototype, 'importaNegociacoes', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'importaNegociacoes'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'adiciona', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'adiciona'), _class2.prototype)), _class2)) || _class);

            _export('NegociacaoController', NegociacaoController);
        }
    };
});
//# sourceMappingURL=NegociacaoController.js.map