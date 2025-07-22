// https://hydralinks.pages.dev/sources/fitgirl.json

interface item {
  title: string;
  uris: string[];
  uploadDate: string;
  fileSize: string;
}

interface DataList {
  name: string;
  downloads: item[];
}

// Limita quantidade de itens por vez
let countEnd: number = 42;

// Transforma o objeto retornado para ser usado globalmente
let dataList: DataList = {
  name: "",
  downloads: [],
};

// Verifica se os dados segue o padrão  ou se esta vazio
function inputUrl(): void {
  const input = document.getElementById("input_url") as HTMLInputElement;
  const inputValue = input.value;

  if (inputValue.length == 0 && !inputValue.includes(".json")) {
    return;
  }

  loadData(inputValue);
}

// Expressão usada para carregar dados de um json via texto de entrada
async function loadData(url: string): Promise<void> {
  try {
    // Estrutura assicrona para ler e lidar com problemas simples
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Erro ao carregar url");
    }

    const list = await response.json();

    // Confere se realmente é uma lista, senão é um resultado inútil
    if (!Array.isArray(list.downloads)) {
      throw new Error(`Dados incorreto`);
    }

    loadDOMList(list);
  } catch (e) {
    throw new Error(`Erro no carregamento ${e}`);
  }
}

// Usa do objeto retornado da solicitação para criar elementos no DOM
// Também crio eventos para os respectiveis links
function loadDOMList(list: DataList): void {
  const container = document.getElementById("container") as HTMLDivElement;
  const titleSection = document.getElementById("name_list") as HTMLTitleElement;
  const txtCount = document.getElementById("file_count") as HTMLDivElement;

  titleSection.textContent = list.name;
  txtCount.innerHTML = `total de ${list.downloads.length}`;

  list.downloads.slice(0, countEnd).forEach((item) => {
    const div = document.createElement("div");
    const fig = document.createElement("figure");
    const figc = document.createElement("figcaption");

    const img = document.createElement("img");
    img.src = "../assets/img/sem_image.png";

    const name = document.createElement("h3");
    name.textContent = `${item.title}`;

    const prg = document.createElement("p");

    const date = document.createElement("span");
    date.textContent = `${item.uploadDate
      .replaceAll("-", "/")
      .replaceAll("T", " ")
      .replaceAll("Z", "")
      .replaceAll(".", "")
      .replaceAll("000", "")}`;

    const size = document.createElement("span");
    size.textContent = `${item.fileSize}`;

    prg.appendChild(date);
    prg.appendChild(size);
    figc.appendChild(name);
    figc.appendChild(prg);
    fig.appendChild(figc);
    // fig.appendChild(img);
    div.appendChild(fig);
    container.appendChild(div);
  });

  dataList = list;
}

window.addEventListener("scroll", () => {
  // Usa o getBoundClientRect para calcular quando a tela chega ao final
  // logo em seguida adiciona mais itens
  const container = document.getElementById("container") as HTMLDivElement;
  const rect = container.getBoundingClientRect();

  // Verifica se chegou ao final
  if (rect.bottom <= window.innerHeight) {
    // Divide o total pelo numero de itens criados por vez
    let countMax = Math.floor(dataList.downloads.length / 14);

    if (countEnd < countMax) {
      countEnd += 14;
      loadDOMList(dataList);
    }
  }
});
