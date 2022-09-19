/********************************************************
 * Objetivo: Arquivo de funções para consumir e popular
 *             os dados obtidos da API no Front-End.
 * Data: 24/07/2022
 * Autor: Thales Santos
 *******************************************************/

// Import do Service (responsável pela buscar na API)
import { allAgents, allWeapons } from "./services.js";
import {createListAll ,createListAgent, createListWeapon} from './search.js'
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
        <img src="${agent.fullPortrait}" alt="${agent.displayName}" />
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
  document.getElementById("agentes").classList.remove("active");
  document.getElementById("armas").classList.add("active");

  const cardContainer = document.getElementById("card-weapons-container");
  const cards = await allWeapons.data.map(createCardWeapon);

  cardContainer.replaceChildren(...cards);

  cards.forEach((card) => {
    const container = document.querySelector(
      `#${card.id} .card-carousel-skins`
    );
    skinCardClick(card.id, container.id);
    createCarousel(card.id);
  });
};

// Função que renderiza apenas UM card de Arma
export const renderOneCardWeapon = (weapon) => {
  document.getElementById("home").classList.remove("active");
  document.getElementById("agentes").classList.remove("active");
  document.getElementById("armas").classList.add("active");

  const cardContainer = document.getElementById("card-weapons-container");
  const card = createCardWeapon(weapon);

  cardContainer.replaceChildren(card);

  const container = document.querySelector(`#${card.id} .card-carousel-skins`);

  skinCardClick(card.id, container.id);
  createCarousel(card.id);
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
    <div class="card-chroma-container" id="chromaContainer--${weapon.uuid}">

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
    <div class="card-carousel-controls" id="controlLeft--${
      weapon.uuid
    }" style="left: 0px;">
      <img src="assets/img/icons/left-chevron.png" alt="">
    </div>
    <!-- // Controls -->

    <div class="card-carousel-skins" id="carouselSkins--${weapon.uuid}">
      <div class="card-carousel-skins-images" data-skin-default="${
        weapon.defaultSkinUuid
      }">
        <img src="${weapon.displayIcon}" alt="${weapon.displayName}">
      </div>

      ${createSkinCards(weapon.skins)}
    </div>

    <!-- Controls -->
    <div class="card-carousel-controls" id="controlRight--${
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
  const allCards = document.querySelectorAll(
    `#${idCard} .card-carousel-skins-images`
  );

  allCards[0].classList.add("active");

  allCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Lógica para deixar apenas uma skin selecionada
      allCards.forEach((card) => {
        card.classList.remove("active");
      });

      card.classList.add("active");

      const idSkin = card.dataset.cardWeaponSkinId;

      let skinSelected = "";
      if (idSkin !== undefined) {
        allWeapons.data.forEach((weapon) => {
          weapon.skins.filter((skin) => {
            if (skin.uuid == idSkin) skinSelected = skin;
          });
        });
        changeSkin(idCardContainer, skinSelected, false);
      } else {
        skinSelected = allWeapons.data.filter(
          (weapon) => card.dataset.skinDefault == weapon.defaultSkinUuid
        )[0];
        changeSkin(idCardContainer, skinSelected, true);
      }
    });
  });
};

// Função que altera as informações de skin
const changeSkin = (idCardContainer, skinSelected, skinDefault) => {
  // Alterando titulo do card
  document.querySelector(
    `#${idCardContainer} .card-name`
  ).innerHTML = `<h2>${skinSelected.displayName}</h2>`;

  // Alterando imagem principal
  const imageMain = document.querySelector(
    `#${idCardContainer} .card-main-image-container img`
  );
  imageMain.src = `${
    skinSelected.displayIcon
      ? skinSelected.displayIcon
      : skinSelected.chromas[0].displayIcon
  }`;

  // Adicionando chromas da skin
  const chromasContainer = document.querySelector(
    `#${idCardContainer} .card-chroma-container`
  );

  let chromas = "";
  if (!skinDefault) {
    skinSelected.chromas.forEach((chroma) => {
      if (chroma.swatch !== null) {
        chromas += `
        <img src="${chroma.swatch}" alt="${chroma.displayName}" data-skin-chroma-id="${chroma.uuid}">
      `;
      }
    });
  }

  chromasContainer.innerHTML = chromas;
  changeSkinByChroma(imageMain, chromasContainer.id, skinSelected.chromas);
};

// Função que altera as informações da skin a partir do chroma
const changeSkinByChroma = (imageMain, idChromasContainer, chromas) => {
  // Adicionando evento de click em cada icone de chroma
  const icons = document.querySelectorAll(`#${idChromasContainer} img`);
  if (icons.length > 0) {
    icons[0].classList.add("active");

    icons.forEach((icon) => {
      icon.addEventListener("click", () => {
        // Lógica para deixar apenas um chroma selecionado
        icons.forEach((icon) => icon.classList.remove("active"));

        chromas.forEach((chroma) => {
          if (icon.dataset.skinChromaId == chroma.uuid)
            imageMain.src = chroma.fullRender;
        });

        icon.classList.add("active");
      });
    });
  }
};

// Funções para funcionalidade de carousel
const createCarousel = (idCard) => {
  const weaponUuid = idCard.split("--")[1];
  let current = 0;

  // Resgatando os botões de ação
  const btnPrevius = document.querySelector(
    `#${idCard} #controlLeft--${weaponUuid}`
  );
  const btnNext = document.querySelector(
    `#${idCard} #controlRight--${weaponUuid}`
  );

  // Primeira skin da lista
  const containerCards = document.querySelector(
    `#${idCard}  .card-carousel-skins`
  );
  const countCards = containerCards.children;

  // Funções para btnPrevius e btnNext
  const changeCards = () => {
    const firstCard = countCards[0];

    if (current >= countCards.length / 3) current = 0;
    else if (current < 0) current = countCards.length / 3 - 1;

    let newMargin = 1020 * current;
    firstCard.style.marginLeft = `-${newMargin}px`;
  };

  const cardPrevius = () => {
    current--;
    changeCards();
  };

  const cardNext = () => {
    current++;
    changeCards();
  };

  // Adicionando ação aos botões Previus e Next
  btnPrevius.addEventListener("click", cardPrevius);
  btnNext.addEventListener("click", cardNext);
};

/** // Funções para Armas */

export const optionSelected = async () => {
  const selectValue = document.getElementById("select").value.toString();

  switch (selectValue.toUpperCase()) {
    case "AGENTES":
      document.getElementById("armas").classList.remove("active");
      document.getElementById("home").classList.remove("active");
      document.getElementById("agentes").classList.add("active")

      document
      .getElementById('list-all')
      .innerHTML = await createListAgent();
      
      renderaAllCardAgent();
      break;
    case "ARSENAL":
      document.getElementById("agentes").classList.remove("active");
      document.getElementById("home").classList.remove("active");
      document.getElementById("armas").classList.add("active");
      document
      .getElementById('list-all')
      .innerHTML = await createListWeapon();

      renderaAllCardWeapon();
      break;

    default:
      createListAll();
      document.getElementById("agentes").classList.remove("active");
      document.getElementById("armas").classList.remove("active");
      document.getElementById("home").classList.add("active");
      break;
  }
};
