/********************************************************
 * Objetivo: Arquivo de funções para consumir e popular
 *             os dados obtidos da API no Front-End.
 * Data: 24/07/2022
 * Autor: Thales Santos
 *******************************************************/

// Import do Service (responsável pela buscar na API)
import { allAgents, allWeapons } from "./services.js";
import { linkModal } from "./modal.js";

/** Funções para Agentes **/
// Função que renderiza todos os cards de Agente
export const renderaAllCardAgent = async () => {
  document.getElementById("home").classList.remove("active");
  document.getElementById("agentes").classList.add("active");

  const cardContainer = document.getElementById("cardContainer");
  const cards = await allAgents.data.map(createCardAgent);

  cardContainer.replaceChildren(...cards);
  linkModal();
};

// Função q renderiza apenas um card de Agent
export const renderOneCardAgent = (agent) => {
  document.getElementById("home").classList.remove("active");
  document.getElementById("agentes").classList.add("active");

  const cardContainer = document.getElementById("cardContainer");
  const card = createCardAgent(agent);

  cardContainer.replaceChildren(card);
  linkModal();
};

// Função que cria card de Agente
const createCardAgent = (agent) => {
  const card = document.createElement("div");

  card.classList.add("card");
  card.setAttribute("data-agent-name", `${agent.displayName}`);

  const description = agent.description;
  const shortDescription = description.substring(0, 48);

  // Populando dados dinamicamente
  card.innerHTML = `
      <!-- Name -->
      <div class="card-name">
        <h2>${agent.displayName}</h2>
      </div>
      <!-- // Name -->

      <!-- Image -->
      <div class="card-image">
        <img src="${
          agent.background
            ? agent.background
            : "assets/img/agents/background.png"
        }" alt="${agent.displayName}" />
        <!-- Image background -->
        <img src="${agent.fullPortraitV2}" alt="${agent.displayName}" />
        <!-- Image main -->
      </div>
      <!-- // Image -->

      <!-- Biography -->
      <div class="card-biography">
        <p>
          ${shortDescription}...
        </p>
      </div>
      <!-- // Biography -->

      <!-- Button - Details   -->
      <div class="card-button-details">
        <button>detalhes</button>
      </div>
      <!-- // Button - Details   -->

    `;

  return card;
};
/** // Funções para Agentes **/

/** Funções para Armas */

// Função que renderiza TODS os cards de Armas
export const renderaAllCardWeapon = async () => {
  document.getElementById("home").classList.remove("active");
  document.getElementById("armas").classList.add("active");

  const cardContainer = document.getElementById("card-weapons-container");
  const cards = await allWeapons.data.map(createCardWeapon);

  cardContainer.replaceChildren(...cards);

  cards.forEach((card) => {
    const container = document.querySelector(
      `#${card.id} .card-carousel-skins`
    );
    skinCardClick(card.id, container.id);
  });
};

// Função que renderiza apenas UM card de Arma
export const renderOneCardWeapon = (weapon) => {
  document.getElementById("home").classList.remove("active");
  document.getElementById("armas").classList.add("active");

  const cardContainer = document.getElementById("card-weapons-container");
  const card = createCardWeapon(weapon);

  cardContainer.replaceChildren(card);
};

// Função que cria card de armas
const createCardWeapon = (weapon) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("id", `weapon--${weapon.uuid}`);

  card.innerHTML = `
  <!-- Name -->
  <div class="card-name">
    <h2>${weapon.displayName}</h2>
  </div>
  <!-- Name -->

  <!-- Content Main image and chromas skin -->
  <div class="card-container-img-chromas">
    <!-- Chroma container -->
    <div class="card-chroma-container" data-skin-chromas>

    </div>
    <!-- // Chroma container -->

    <!-- Main Image Container -->
    <div class="card-main-image-container">
      <img src="${weapon.displayIcon}" alt="${weapon.displayName}">
    </div>
    <!-- // Main Image Container -->
  </div>
  <!-- // Content Main image and chromas skin -->

  <!-- Carousel Skins Container -->
  <div class="card-carousel-skins-container">
    <!-- Controls -->
    <div class="card-carousel-controls" data-control-left="${
      weapon.uuid
    }" style="left: 0px;">
      <img src="assets/img/icons/left-chevron.png" alt="">
    </div>
    <!-- // Controls -->

    <div class="card-carousel-skins" id="carouselSkins--${weapon.uuid}">
      <div class="card-carousel-skins-images">
        <img src="${weapon.displayIcon}" alt="${weapon.displayName}">
      </div>

      ${createSkinCards(weapon.skins)}
    </div>

    <!-- Controls -->
    <div class="card-carousel-controls" data-control-right="${
      weapon.uuid
    }" style="right: 0;">
      <img src="assets/img/icons/right-chevron.png" alt="">
    </div>
    <!-- // Controls -->
  </div>
  <!-- // Carousel Skins Container -->
  `;

  return card;
};

// Função que cria lista de skins
const createSkinCards = (skins) => {
  let cards = "";
  skins.forEach((skin) => {
    cards += `
      <div class="card-carousel-skins-images" data-card-weapon-skin-id="${
        skin.uuid
      }">
        <img src="${
          skin.displayIcon ? skin.displayIcon : skin.chromas[0].displayIcon
        }" alt="${skin.displayName}">
      </div>
      `;
  });

  return cards;
};

// Função que adiciona click em todos os cards de skin
const skinCardClick = (idCardContainer, idCard) => {
  const id = idCard.split("--")[1];

  const allCards = document.querySelectorAll(
    `#${idCard} .card-carousel-skins-images`
  );

  allCards.forEach((card) => {
    card.addEventListener("click", () => {
      const idSkin = card.dataset.cardWeaponSkinId;


      let skinSelected = allWeapons.data.map((weapon) => {
        const selected = weapon.skins.filter((skin) => skin.uuid == idSkin);
        return selected.filter(elem => elem !== undefined);
      });

      console.log(skinSelected);

      // Alterando titulo do card
      document
        .querySelector(`#${idCardContainer} .card-name`)
        .innerHTML = `<h2>${skinSelected.displayName}</h2>`;

      // Alterando imagem principal
      document.querySelector(
        `#${idCardContainer} .card-main-image-container img`
      ).src = `${skinSelected.displayIcon ? skinSelected.displayIcon : skinSelected.chromas[0].displayIcon
      }`;

      // Adicionando chromas da skin
      let imgs = skinSelected.chromas.map((chroma) => {
        const img = document.createElement('img');
        img.src = chroma.swatch ? chroma.swatch : ''
        return img;  
      });

      document
        .querySelector(`#${idCardContainer} .card-chroma-container`)
        .replaceChildren(...imgs)
    });
  });
};

// Função que altera as informações de skin
const changeSkin = async (idCardContainer, idCard, idSkin) => {
  const skinSelected = await allWeapons.data.forEach((weapon) => {
    const selected = weapon.skins.filter((skin) => skin.uuid === idSkin);
    // console.log(selected[0])
    return selected[0];
  });

  console.log(skinSelected);

  // Alterando titulo do card
  const test = document.querySelector(`#${idCardContainer} .card-name`);
  test.innerHTML = `<h2>${skinSelected.displayName}</h2>`;

  // Alterando imagem principal
  document.querySelector(
    `#${idCard} .card-main-image-container img`
  ).src = `${skinSelected.displayIcon}`;

  // Adicionando chromas da skin
  let chromas = "";
  skinSelected.chromas.forEach((chroma) => {
    chromas += `
        <img src="${chroma.swatch ? chroma.swatch : ""}" alt="">
      `;
  });

  document
    .querySelector(`#${idCard} .card-chroma-container`)
    .innerHTML(chromas);

  // changeSkinByChroma(idCard)
};

/** // Funções para Armas */

export const optionSelected = () => {
  const selectValue = document.getElementById("select").value.toString();

  switch (selectValue.toUpperCase()) {
    case "AGENTES":
      renderaAllCardAgent();
      break;

    default:
      document.getElementById("agentes").classList.remove("active");
      document.getElementById("home").classList.add("active");
      break;
  }
};
