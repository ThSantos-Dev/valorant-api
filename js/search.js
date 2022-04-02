import { allAgents, allWeapons, findAgentByName, findWeaponByName } from "./services.js";
import {renderOneCardAgent, renderOneCardWeapon} from "./card.js"


export const createListAll = async () => { 
    let list = '';

    list+= await createListAgent()
    list+= await createListWeapon()

    document
        .getElementById('list-all')
        .innerHTML = list
}


// Função responsável por popular os dados no DATA-LIST "list-all"
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

   return listOfNamesHTML;

};

// Função responsável por popular os dados no DATA-LIST "list-all"
export const createListWeapon = async () => {
    let listOfNamesHTML = "";
    let nameOfWeapons = [];
  
    allWeapons.data.forEach((weapont) => {
      nameOfWeapons.push(weapont.displayName);
    });
  
    nameOfWeapons.forEach((weapontName) => {
      listOfNamesHTML += `
              <option>
                  ${weapontName}
              </option>
          `;
    });
  
    return listOfNamesHTML;
  
  };
 
const search = async () => {
    const searchInputHML = document.getElementById("searchInput")
    const searchValue = searchInputHML.value;

    if(!searchAgent(searchValue.trim()) || !searchWeapon(searchValue.trim()))
         alert('Digite um termo válido.')
    
}

// Função responsável por pegar o valor do input e pesquisar o agente
const searchAgent = async (searchValue) => {
        const agent = await findAgentByName(searchValue.trim())

        if(!agent)
            return false
        else
         renderOneCardAgent(agent)
}

// Função responsável por pegar o valor do input e pesquisar o agente
const searchWeapon = async (searchValue) => {
        const weapon = await findWeaponByName(searchValue.trim())

        if(!weapon)
            return false
        else
         renderOneCardWeapon(weapon)
}


// Adicionando evento de click na icone de pesquisa e ao ENTER
const btnSearch = document.getElementById('btnSearch')
btnSearch.addEventListener('click', search)

document
    .getElementById('searchInput')
    .addEventListener('change', () => {
        document.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') {
                btnSearch.click();
            }
        })
    })