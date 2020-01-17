System.register([], function (_export, _context) {
    "use strict";

    return {
        setters: [],
        execute: function () {
            class View {
                constructor(seletor) {
                    this._elemento = document.querySelector(seletor);
                }

                update(model) {
                    this._elemento.innerHTML = this.template(model);
                }

                template(model) {
                    throw new Error("O método template deve ser implementado nas classes filhas");
                }
            }

            _export("View", View);
        }
    };
});
//# sourceMappingURL=View.js.map