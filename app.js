/*******************************************************************************************
 * Objetivo: Arquivo para realizar as requisições das músicas
 * Data: 29/05/2024
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

// EndPoint : Retorna o filme filtrando pelo ID
app.get('/v2/backmusicas/musica/:id', cors(), async function(request, response,next){

    // Recebe o ID encaminhado na requisição
    let idMusica = request.params.id;

    // Solicita a musica para controller filtrando pelo ID
    let dadosMusica = await controllerMusicas.getBuscarMusicaId(idMusica);

    // Retorna status_Code e JSON com dados ou mensagem de erro
    response.status(dadosMusica.status_code);
    response.json(dadosMusica);
});

// EndPoint: inserir novos dados
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

// EndPoint: Atualizar dados novos
app.put('/v2/backmusicas/musica/:id', cors(), bodyParserJSON, async function(request, response){

    let idMusica = request.params.id
    let contentType = request.header('content-type')
    let dadosBody = request.body
    let musicaAtualizada = await controllerMusicas.setAtualizarMusica(idMusica, contentType, dadosBody)

    response.json(musicaAtualizada)
    response.status(musicaAtualizada.status_code)
})

// EndPoints: Deletar dados
app.delete('/v2/backmusicas/musica/:id', cors(), bodyParserJSON, async function(request, response){

    let idMusica = request.params.id
    let musicaDeletada = await controllerMusicas.setExcluirMusica(idMusica)

    response.json(musicaDeletada)
    response.status(musicaDeletada.status_code)
})

//******************************************************************************************/
app.listen('8080', function(){
    console.log('API funcionando veyyyyyyr!!!')
})
