/*******************************************************************************************
 * Objetivo: Arquivo para realizar as requisições das músicas
 * Data: 39/05/2024
 * Autor: Emily Crepaldi
 * Versão: 1.0
***********************************************************************************************/

/*
    Para realizar a integração com Banco de Dados precisamos de uma biblioteca

        - SEQUELIZE ORM (biblioteca mais antiga)
        - PRISMA ORM    (bibliioteca mais atual)
        - FASTFY ORM    (bibliioteca mais atual)

        Instalação do PRISMA ORM
            npm install prisma --save (É quem realiza a conexão com o BD)
            npm install @prisma/client --save (É quem executa os scrpts SQL no BD)

            Após as instalações devemos rodar o comando:
             (Esse comando inicializa a utilização do Prisma no projeto)

*/

//Import das bibliotecas do projeto 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//Cria um objeto app tendo como referencia a classe do express
const app = express();

app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    app.use(cors());
    next();
});

// Cria um objeto para definir o tipode dados que irá chegar do BODY (JSON) 
const bodyParserJSON = bodyParser.json();

/*************** IMPORT DOS ARQUIVOS INTERNOS DO PROJETO ******************/

const controllerMusicas = require('./controller/controller_musicas.js');

// *************************************************************************
/******************************** MÚSICAS ***********************************/

// EndPoints:  Retorna os dados do arvquivo JSON
app.get('/v1/backmusicas/musicas', cors(), async function(request, response, next){

    let controllerMusicas = require('./controller/funcoes.js');

    let musicas = controllerMusicas.getMusicas();
    if (musicas){
        response.json(musicas);
        response.status(200);
    }else{
        response.status(404);
    }
});

//EndPoints:  Retorna os dados do Banco de Dados
app.get('/v2/backmusicas/musicas', cors(), async function(request, response, next){

    // Chama a função para retornar os dados de filme
    let dadosMusicas = await controllerMusicas.getListarMusicas();

    // Validação para retornar os dados ou o erro quando não houver dados
if (dadosMusicas) {
    response.json(dadosMusicas);
    response.status(200);
} else {
        response.json({mesage: 'Nenhum registro encontrado'});
        response.status(404);
    }
});

// EndPoint : Retorna as músicas por filtro
app.get('/v2/backmusicas/filtro/musicas', cors(), async function(request, response, next){

    // let sql = `select * from tbl_musica where id = ${id}`;

    let filtroMusica = filtroMusica.getFiltrarMusica;

    response.status(filtroMusica.status_code)
    response.json(filtroMusica)

    // let filtroMusica = await prisma.$queryRawUnsafe(sql);

    // return filtroMusica;
})

app.post('/v2/backmusicas/musicas', cors(), bodyParserJSON, async function(request, response, next){

    let contentType = request.headers['content-type'];

    console.log(contentType);
    
    // Recebe os dados encaminhados no Body da requisição
    let dadosBody = request.body;

    // Encaminha os dados para controller inserir no BD
    let resultDados = await controllerMusicas.setInserirNovaMusica(dadosBody, contentType);

    response.status(resultDados.status_code);
    response.json(resultDados);
});
