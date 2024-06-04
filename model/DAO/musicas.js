/**********************************************************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD no Banco de Dados MySQL
 * Data: 28/05/2024 
 * Autor: Emily Crepaldi
 * Versão: 1.0
 *********************************************************************************************/

//import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client');

//instância da classe prisma client
const prisma = new PrismaClient();


// Função para INSERIR
const insertMusica = async function (dadosMusica) {

    let sql;

    try {

        if (dadosMusica.album != '' &&
            dadosMusica.album != null &&
            dadosMusica.album != undefined) {

            sql = `insert into tbl_musica (titulo, artista, album, data_lancamento, foto_capa) values (
                                       '${dadosMusica.titulo}',
                                       '${dadosMusica.artista}',
                                       '${dadosMusica.data_lancamento}',
                                       '${dadosMusica.foto_capa}'
                                       )`;

        } else {

            //$executeRawUnsafe() -> serve para executar scripts sem retorno de dados (insert, update e delete)
            //$queryRawUnsafe() -> serve para executar scripts com retorno de dados (select)

            let result = await prisma.$executeRawUnsafe(sql);

            if (result)
                return true;
            else
                return false;
        }

    } catch (error) {
        //console.log(error)
        return false;
    }
}

// Função para UPDATE
const updateMusica = async function (id, dadosMusica) {

    let sql = `update tbl_musica set titulo = '${dadosMusica.titulo}',
                                     artista = '${dadosMusica.artista}',
                                     album = '${dadosMusica.album}',
                                     data_lancamento = '${dadosMusica.data_lancamento}',
                                     foto_capa = '${dadosMusica.foto_capa}'
                                     where id = ${id}`

    let rsMusica = await prisma.$queryRawUnsafe(sql);

    if (rsMusica)
        return rsMusica;
    else
        return false;
}


// Função para DELETE
const deleteMusica = async function (id) {

    let sql = `delete from tbl_musica where id = ${id}`

    let rsMusica = await prisma.$queryRawUnsafe(sql);

    if (rsMusica)
        return rsMusica;
    else
        return false;

}

// Função SELECT todas as músicas
const selectAllMusicas = async function () {

    let sql = `select * from tbl_musica;`

    //$queryRawUnsafe()
    //$queryRaw('select * from tbl_filme where nome = '+ variavel)

    let rsMusica = await prisma.$queryRawUnsafe(sql);

    if (rsMusica.length > 0)
        return rsMusica;
    else
        return false;

}

// Função SELECT pelo nome ID
const selectByIdMusica = async function(id) {

    try{
    let sql = `select * from tbl_musica where id = ${id}`
  
    //caminha o script sql para o banco de dados
    let rsMusica = await prisma.$queryRawUnsafe(sql)
  
    if(rsMusica.length > 0)
      return rsMusica;
    else
      return rsMusica;
      
    } catch (error){
      return false
    }
  
   
  }

module.exports ={
    insertMusica,
    updateMusica,
    deleteMusica,
    selectAllMusicas,
    selectByIdMusica
}

// 200 SUCESSO
// 400 ERRO DO CLIENTE
// 500 ERRO NO SERVIDOR
