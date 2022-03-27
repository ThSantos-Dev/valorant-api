/********************************************************
 * Objetivo: Arquivo de funções para iniciar todas as funções.
 * Data: 26/07/2022
 * Autor: Thales Santos
 *******************************************************/

// Função que retorna os dados de todos os Agentes 
import { selectAllAgents } from "./services.js";

// Função que renderiza a modal de Agentes
export const renderModalAgent = async (agentName) => {
    const modalContainer = document.getElementById('container-modal')
    modalContainer.classList.add('active')
  
    const allAgents = await selectAllAgents();

    const agentSelected = allAgents.data.filter((agent) => {
      return agentName.toUpperCase() === agent.displayName.toUpperCase()
    });

    const modal = createModalAgent(agentSelected[0])

    modalContainer.replaceChildren(modal)

    // Adiconando a função Close Modal - Fecha a Modal 
    document
      .getElementById('closeModal')
      .addEventListener('click', closeModal)

      changeInfo(agentSelected[0])
}

export const linkModal = () => {
  const cards = document.querySelectorAll('.card')
  console.log(cards)
  cards.forEach(card => {
    card.addEventListener('click', () => {
      renderModalAgent(card.dataset.agentName)
    })
  })
}

// Função que cria a modal de Agente
const createModalAgent = (agent) => {
    const modal = document.createElement('div');
    modal.classList.add('modal-container'); 
    modal.id = 'modal'   

    console.log(agent.displayName)

    modal.innerHTML = `
    <div class="modal-container" id="modal">
    <!-- Close modal -->
    <div id="closeModal">
      <img src="assets/img/icons/close-modal.png" alt="x" />
    </div>
    <!-- // Close modal -->

    <!-- Image Agent -->
    <div class="modal-agent-image">
      <img src="${agent.fullPortraitV2}" alt="${agent.displayName}" />
    </div>
    <!-- // Image Agent -->

    <!-- Content container -->
    <div class="modal-agent-content">
      <!-- Agente name -->
      <h1 class="modal-agent-name">${agent.displayName}</h1>
      <!-- // Agente name -->

      <!-- Details container  -->
      <div class="modal-details-container">
        <!-- Skills container -->
        <div class="modal-skills-container">
          <!-- Role -->
          <div class="modal-info-image active" data-icon-selected="funcao">
            <img src="${agent.role.displayIcon}" alt="role-icon">
          </div>
          <!-- // Role -->
          
          <!-- Skill 01 -->
          <div class="modal-info-image" data-icon-selected="habilidade1">
            <img src="${agent.abilities[0].displayIcon}" alt="${agent.abilities[0].displayName}" />
          </div>
          <!-- // Skill 01 -->

          <!-- Skill 02 -->
          <div class="modal-info-image" data-icon-selected="habilidade2">
            <img src="${agent.abilities[1].displayIcon}" alt="${agent.abilities[1].displayName}" />
          </div>
          <!-- // Skill 02 -->

          <!-- Skill 03 -->
          <div class="modal-info-image" data-icon-selected="habilidade3">
            <img src="${agent.abilities[2].displayIcon}" alt="${agent.abilities[2].displayName}" />
          </div>
          <!-- // Skill 03 -->

          <!-- Skill 04 -->
          <div class="modal-info-image" data-icon-selected="habilidade4">
            <img src="${agent.abilities[3].displayIcon}" alt="${agent.abilities[3].displayName}" />
          </div>
          <!-- // Skill 04 -->
        </div>
        <!-- // Skills container -->

        <!-- Information container -->
        <div class="modal-information-container" id="modal-information">
          <!-- Title -->
          <h2 class="modal-information-title">${agent.role.displayName}</h2>
          <!-- // Title -->

          <!-- Description -->
          <p>
          ${agent.role.description}
          </p>
          <!-- // Description -->
        </div>
        <!-- // Information container -->
      </div>
      <!-- // Details container  -->
    </div>
    <!-- // Content container -->
  </div>

    `
    return modal;
}

// Função para exibir contéudo de habilidades dinamicamente
const changeInfo = (agent) => {
  let content = ''
  const informationContainer = document.getElementById('modal-information')
  const allAbilities = document.querySelectorAll('.modal-info-image')

  console.log(informationContainer)

  allAbilities.forEach(icon => {
    const iconSelected = icon.dataset.iconSelected
    icon.addEventListener('click', () => {
      document
      .querySelector('.modal-info-image.active')
      .classList.remove('active')

      icon.classList.add('active')

      switch (iconSelected.toUpperCase()) {
        case 'FUNCAO':
          content = createInformationHTML(agent.role.displayName, agent.role.description)
          informationContainer.innerHTML = content
          break;
      
        case 'HABILIDADE1':
          content = createInformationHTML(agent.abilities[0].displayName, agent.abilities[0].description)
          informationContainer.innerHTML = content
          break;

        case 'HABILIDADE2':
          content = createInformationHTML(agent.abilities[1].displayName, agent.abilities[1].description)
          informationContainer.innerHTML = content
          break;

        case 'HABILIDADE3':
          content = createInformationHTML(agent.abilities[2].displayName, agent.abilities[2].description)
          informationContainer.innerHTML = content
          break;

        case 'HABILIDADE4':
          content = createInformationHTML(agent.abilities[3].displayName, agent.abilities[3].description)
          informationContainer.innerHTML = content
          break;

        default:
          break;
      }
    });
  })
}

// Função que cria a os detalhes dinamicamente
const createInformationHTML = (title, description) => {
  const content =  `
  <!-- Information container -->
  <div class="modal-information-container">
    <!-- Title -->
    <h2 class="modal-information-title">${title}</h2>
    <!-- // Title -->

    <!-- Description -->
    <p>
    ${description}
    </p>
    <!-- // Description -->
  </div>
  <!-- // Information container -->
  `;

  return content;
}

// Função que fecha a modal 
const closeModal = () => {
  document
    .getElementById('container-modal')
    .classList.remove('active');
}
