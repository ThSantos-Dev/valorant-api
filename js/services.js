/********************************************************
 * Objetivo: Arquivo de funções para consumir os dados obtidos
 *  da API no Front-End.
 * Data: 24/07/2022
 * Autor: Thales Santos
 *******************************************************/

// Função que retorna os dados de todos os Agentes 
export const selectAllAgents = async () => {
    const baseUrl =
      "https://valorant-api.com/v1/agents?language=pt-BR&isPlayableCharacter=true";
  
    const response = await fetch(baseUrl);
    const data = await response.json();
  
    return data;
};
  
// Função que retorna os dados de todo o Arsenal
export const selectAllWeapons = async () => {
  const baseUrl =
  "https://valorant-api.com/v1/weapons?language=pt-BR&isPlayableCharacter=true";

const response = await fetch(baseUrl);
const data = await response.json();

return data;
}

// Varáiavel que armazena o retorno da API sobre os Agentes e fornece seus dados a toda aplicação
export const allAgents = await selectAllAgents();

// Varáiavel que armazena o retorno da API sobre o Arsenal e fornece seus dados a toda aplicação
export const allWeapons = await selectAllWeapons();

// Função que filtra um agente por nome
export const findAgentByName = async (agentName) => {
  const allAgents = await selectAllAgents();

  const agentSelected =  allAgents.data.filter((agent) => {
    return agentName.toUpperCase() === agent.displayName.toUpperCase()
  });

  if(agentSelected.length > 0)
    return agentSelected[0]
  else 
    return false
}

// Função que filtra um agente por nome
export const findWeaponByName = async (weaponName) => {
  const allWeapons = await selectAllWeapons();

  const weaponSelected =  allWeapons.data.filter((weapon) => {
    return weaponName.toUpperCase() === weapon.displayName.toUpperCase()
  });

  if(weaponSelected.length > 0)
    return weaponSelected[0]
  else 
    return false
}