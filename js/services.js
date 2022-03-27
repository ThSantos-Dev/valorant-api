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
  