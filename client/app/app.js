System.register(['./controllers/NegociacaoController.js', './domain/index.js'], function (_export, _context) {
        "use strict";

        var NegociacaoController, Negociacao;
        return {
                setters: [function (_controllersNegociacaoControllerJs) {
                        NegociacaoController = _controllersNegociacaoControllerJs.NegociacaoController;
                }, function (_domainIndexJs) {
                        Negociacao = _domainIndexJs.Negociacao;
                }],
                execute: function () {

                        const controller = new NegociacaoController();
                        const $ = document.querySelector.bind(document);

                        $(".form").addEventListener("submit", controller.adiciona.bind(controller));

                        $("#botao-apaga").addEventListener("click", controller.apaga.bind(controller));

                        $("#botao-importa").addEventListener("click", controller.importaNegociacoes.bind(controller));

                        const negociacao = new Negociacao(new Date(), 1, 200);
                        const cabecalhos = new Headers();
                        cabecalhos.set('Content-Type', 'application/json');
                        const config = {
                                method: 'POST',
                                headers: cabecalhos,
                                body: JSON.stringify(negociacao)
                        };

                        fetch('/negociacoes', config).then(() => console.log('Dado enviado com sucesso'));
                }
        };
});
//# sourceMappingURL=app.js.map