/********************************************************
 * Objetivo: Arquivo de funções para consumir e popular
 *             os dados obtidos da API no Front-End.
 * Data: 24/07/2022
 * Autor: Thales Santos
 *******************************************************/

// Import do Service (responsável pela buscar na API)
import {allAgents} from "./services.js";

import {linkModal} from "./modal.js"

// Função que renderiza todos os cards de Agente
export const renderaAllCardAgent = async () => {
  document.getElementById("home").classList.remove('active')  
  document.getElementById("agentes").classList.add("active");

  const cardContainer = document.getElementById("cardContainer");
  const cards = await allAgents.data.map(createCardAgent);

  cardContainer.replaceChildren(...cards);
  linkModal()
};

// Função q renderiza apenas um card de Agent
export const renderOneCardAgent = (agent) => {
  document.getElementById("home").classList.remove('active')  
  document.getElementById("agentes").classList.add("active");

  const cardContainer = document.getElementById("cardContainer");
  const card = createCardAgent(agent);

  cardContainer.replaceChildren(card);
  linkModal()
}

// Função que cria card de Agente
const createCardAgent = (agent) => {
  let card = document.createElement("div");

  card.classList.add("card");
  card.setAttribute('data-agent-name', `${agent.displayName}`);

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
        <img src="${agent.background ? agent.background : 'assets/img/agents/background.png'}" alt="${agent.displayName}" />
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

export const optionSelected = () => {
    const selectValue = document.getElementById("select").value.toString()

    switch (selectValue.toUpperCase()) {
        case 'AGENTES':
            renderaAllCardAgent()
            break;
    
        default:
            document.getElementById("agentes").classList.remove("active");
            document.getElementById("home").classList.add('active')  
            break;
    }
}


