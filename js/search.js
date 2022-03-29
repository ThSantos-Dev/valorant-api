import { allAgents, findAgentByName } from "./services.js";
import {renderOneCardAgent, renderaAllCardAgent} from "./card.js"

// Função responsável por popular os dados no DATA-LIST "agent-list"
export const createListAgent = async () => {
  let listOfNamesHTML = "";
  let nameOfAgents = [];

  allAgents.data.forEach((agent) => {
    nameOfAgents.push(agent.displayName);
  });

  nameOfAgents.forEach((agentName) => {
    listOfNamesHTML += `
            <option>
                ${agentName}
            </option>
        `;
  });

   document
        .getElementById("agent-list")
        .innerHTML = listOfNamesHTML;

};
 
// Função responsável por pegar o valor do input e pesquisar o agente
const searchAgent = async () => {
    const searchInputHML = document.getElementById("searchInput")
    const searchValue = searchInputHML.value;

    if(searchValue.trim() == '') {
        renderaAllCardAgent()
    }else {
        const agent = await findAgentByName(searchValue.trim())

        if(!agent)
            alert("Agente não encontrado.")
        else
         renderOneCardAgent(agent)
    }
}

// Adicionando evento de click na icone de pesquisa e ao ENTER
const btnSearch = document.getElementById('btnSearch')
btnSearch.addEventListener('click', searchAgent)

document
    .getElementById('searchInput')
    .addEventListener('change', () => {
        document.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') {
                btnSearch.click();
            }
        })
    })