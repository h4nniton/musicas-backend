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
            let novaMusicaJSON = {};

            //validação de campos obrigatórios ou com digitação inválida
            if (dadosMusica.titulo == '' || dadosMusica.titulo == undefined || dadosMusica.titulo == null || dadosMusica.titulo.length > 100 ||
                dadosMusica.artista == '' || dadosMusica.artista == undefined || dadosMusica.artista == null || dadosMusica.artista.length > 100 ||
                dadosMusica.data_lancamento == '' || dadosMusica.data_lancamento == undefined || dadosMusica.data_lancamento == null || dadosMusica.data_lancamento.length != 10 ||
                dadosMusica.foto_capa == '' || dadosMusica.foto_capa == undefined || dadosMusica.foto_capa == null || dadosMusica.foto_capa.length > 200 
            ) {
                console.log(message)
                return message.ERROR_REQUIRED_FIELDS //400

            } else {

                //validação do album, por qe não é obrigatótio
                if (dadosMusica.album != null &&
                    dadosMusica.album != '' &&
                    dadosMusica.album != undefined) {

                    //validação para ver se a data está com a qtde de digitoss correta
                    if (dadosMusica.album.length != 100) {
                    
                        return message.ERROR_REQUIRED_FIELDS //400
                    } else {
                        validateStatus = true
                    }
                } else {
                    validateStatus = true
                }

                //validaçao para verificar se a variável booleana é verdadeira
                if (validateStatus) {

                    //encaminha os dados do Musica para o DAO inserir no banco de dados
                    let novaMusica = await musicasDAO.insertMusica(dadosMusica)
                    let idNovaMusica = await musicasDAO.selectLastInsertId()

                    //validação para verificar se o DAO inseriu os dados do BD
                    if (novaMusica) {

                        //Cria o JSON de retorno dos dados (201)
                        novaMusicaJSON.musica = dadosMusica
                        novaMusicaJSON.musica.id = Number(idNovaMusica)
                        novaMusicaJSON.status = message.SUCCESS_CREATED_ITEM.status
                        novaMusicaJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        novaMusicaJSON.message = message.SUCCESS_CREATED_ITEM

                        return novaMusicaJSON //201
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB //500
                    }
                }
            }

        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {

        console.log(error)
        return message.ERROR_INTERNAL_SERVER //500 - erro na controller
    }
}

//função para atualizar uma musica
const setAtualizarMusica = async function (id, dadosAtualizados, contentType) {

    try {
        if(id == '' || id == undefined || isNaN(id)){
            return message.ERROR_INVALID_ID //400
            
        }else{
            if(dadosAtualizados == '' || dadosAtualizados == undefined ||
               dadosAtualizados.titulo == '' || dadosAtualizados.titulo == undefined || dadosAtualizados.titulo == null || dadosAtualizados.titulo.length > 100 ||
               dadosAtualizados.artista == '' || dadosAtualizados.artista == undefined || dadosAtualizados.artiista == null || dadosAtualizados.artista.length > 100 ||
               dadosAtualizados.data_lancamento == '' || dadosAtualizados.data_lancamento == undefined || dadosAtualizados.data_lancamento == null || dadosAtualizados.data_lancamento.length != 10 ||
               dadosAtualizados.foto_capa == '' || dadosAtualizados.foto_capa == undefined || dadosAtualizados.foto_capa == null || dadosAtualizados.foto_capa.length > 200
            ){
                return message.ERROR_REQUIRED_FIELDS 
            }else{
                let dadosAtualizado = await musicasDAO.updateMusica(id, dadosAtualizados)


                if (dadosAtualizado){
                    return message.SUCCESS_UPDATED_ITEM 
                }else{
                    return message.ERROR_INTERNAL_SERVR_BD
                }
        }

}
 } catch (error) {
    console.log(error)
    return message.ERROR_INTERNAL_SERVER
}
}


//função para excluir uma musica
const setExcluirMusica = async function (id) {

    try {
        //validação do id
        if(id == '' || id == undefined || isNaN(id)){
            return message.ERROR_INVALID_ID //400
        }else{
            let musicaDeletada = await musicasDAO.deleteMusica(id)

            if(musicaDeletada){
                return message.SUCCESS_DELETED_ITEM //201
            }else{
                return false
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER //500
    }
}

//função para listar todas as musicas
const getListarMusicas = async function () {

    //cria um objeto JSON
    let musicasJSON = {};

    //chama a função do DAO que retorna os Musicas do BD
    let dadosMusica = await musicasDAO.selectAllMusicas() //-> pede pro DAO trazer todos as muaias do banco

    //validação para verificar se o DAO retonou dados
    if (dadosMusica) {
        //criar o JSON para desenvolver o APP
        
        musicasJSON.musicas = dadosMusica;
        musicasJSON.quantidade = dadosMusica.length;
        musicasJSON.status_code = 200

        return musicasJSON
    } else {
        return false
    }
}

//função para buscar uma musica pelo nome ? 
const getBuscarMusicaId = async function (id) {

    //recebe o id do Musica 
    let idMusica = id;

    //cria o objeto JSON
    let musicaJSON = {};

    //validação para verificar se o id é válido (vazio, inefiido e não numérico)
    if (idMusica == '' || idMusica == undefined || isNaN(idMusica)) {
        return message.ERROR_INVALID_ID //400
    } else {

        //encaminha para o DAO localizar o id do Musica
        let dadosMusica = await musicasDAO.selectByIdMusica(idMusica)

        //validação para verificar se existe dados de retorno
        if (dadosMusica) {

            //validação para verificar a quantidade de itens encontrado
            if (dadosMusica.length > 0) {
                //cria o JSON de return
                musicaJSON.musica = dadosMusica;
                musicaJSON.status_code = 200
                return musicaJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }

}





module.exports = {
    setInserirNovaMusica,
    setAtualizarMusica,
    setExcluirMusica,
    getListarMusicas,
    getBuscarMusicaId
}
    