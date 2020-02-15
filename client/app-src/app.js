import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import 'bootstrap/js/modal.js';
import '../css/meucss.css';

import { NegociacaoController } from './controllers/NegociacaoController.js';
import { Negociacao } from './domain/index.js';

const controller = new NegociacaoController();

/*const $ = document.querySelector.bind(document);

$(".form")
        .addEventListener("submit", controller.adiciona.bind(controller));

$("#botao-apaga")
        .addEventListener("click", controller.apaga.bind(controller));

$("#botao-importa")
        .addEventListener("click", controller.importaNegociacoes.bind(controller));
*/
const negociacao = new Negociacao(new Date(), 1, 200);
const headers = new Headers();
headers.set('Content-Type', 'application/json');
const method = 'POST';
const body = JSON.stringify(negociacao).replace(/_/g,'');

const config = {
        method,
        headers,
        body
}
console.log("Config", config);
fetch(`${SERVICE_URL}/negociacoes`, config)
        .then(()=> console.log('Dado enviado com sucesso'));


