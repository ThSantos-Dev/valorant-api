/********************************************************
 * Objetivo: Arquivo de funções para iniciar todas as funções.
 * Data: 26/07/2022
 * Autor: Thales Santos
 *******************************************************/


// Import de funções
import {optionSelected, renderaAllCardWeapon} from './card.js'

import {createListAgent} from "./search.js"

createListAgent()

renderaAllCardWeapon()

// Verificando qual opção foi selecionada
const selectFilter = document.getElementById("select");
selectFilter.addEventListener("click", optionSelected)



