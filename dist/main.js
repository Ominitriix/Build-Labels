"use strict";
// https://hydralinks.pages.dev/sources/fitgirl.json
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Limitar quantidade de itens por vez
let countStart = 0, countEnd = 21;
inputUrl();
// Verifica se os dados segue o padrão  ou se esta vazio
function inputUrl() {
    //   const input = document.getElementById("input_url") as HTMLInputElement;
    //   const inputValue = input.value;
    //   if (inputValue.length == 0 && !inputValue.includes(".json")) {
    //     return;
    //   }
    loadData("https://hydralinks.pages.dev/sources/fitgirl.json");
}
// Expressão usada para carregar dados de um json via texto de entrada
function loadData(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Estrutura assicrona para ler e lidar com problemas simples
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error("Erro ao carregar url");
            }
            const list = yield response.json();
            // Confere se realmente é uma lista, senão é um resultado inútil
            if (!Array.isArray(list.downloads)) {
                throw new Error(`Dados incorreto`);
            }
            loadDOMList(list);
        }
        catch (e) {
            throw new Error(`Erro no carregamento ${e}`);
        }
    });
}
// Usa do objeto retornado da solicitação para criar elementos no DOM
// Também crio eventos para os respectiveis links
function loadDOMList(list) {
    const container = document.getElementById("container");
    const titleSection = document.getElementById("name_list");
    titleSection.textContent = list.name;
    list.downloads.slice(countStart, countEnd).forEach((item) => {
        const name = document.createElement("h3");
        name.textContent = `${item.title} \ ${item.fileSize}`;
        container.appendChild(name);
    });
}
window.addEventListener("scroll", () => {
    const winHeight = document.body.clientHeight;
    const rect = document.body.getBoundingClientRect().top;
    console.log(rect);
    console.log(winHeight);
});
