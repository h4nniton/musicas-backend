/**********************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistencias e regra de negócio
 * para as músicas.
 * Data: 28/05/2024 
 * Autor: Emily Crepaldi
 * Versão: 1.0
 *********************************************************************************************/

// import do arquivo de configuração do projeto (?)
const message = require('../modulo/config.js')

// import do arquivo responsável pela interação com o banco de dados
const musicasDAO = require('../model/DAO/musicas.js')

// set de INSERIR nova música
const setInserirNovaMusica = async function (dadosMusica, contentType) {

    try {
        //validação de content-type (apenas a application/json)
        if (String(contentType).toLowerCase() == 'application/json') {

            //cria o objeto JSON paa devolver os dados  criados na requisição
            let novoFilmeJSON = {};

        }
    }

}