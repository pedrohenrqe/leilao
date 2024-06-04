const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express() 
const bodyParserjson = bodyParser.json()
const { PrismaClient } = require('@prisma/client')

app.use((request, response, next)=>{
  response.header('Access-Control-Allow-Origin', '*') 
  response.header('Access-Control-Allow-Methods', 'GET')
  app.use(cors())
  next();
})

const controllerCarros = require('./BACK/controller/controller_carros.js')

app.get('/v1/leilao/selectCarros', cors(), async(request,response,next) => { 

  let dadosCarros = await controllerCarros.getCarros()

  if(dadosCarros){
      response.json(dadosCarros),
      response.status(200)
  }
})

app.post('/v1/leilao/postCarros', cors(), bodyParserjson, async function(request, response, next){


  let contentType = request.headers['content-type'];

  let dadosBody = request.body;
  let resultDadosNovoCarro = await controllerCarros.setInserirNovoCarro(dadosBody, contentType);

  response.status(resultDadosNovoCarro.status_code);
  response.json(resultDadosNovoCarro);

} )

app.put('/v1/leilao/updateCarros/:id', cors(), bodyParserjson, async function(request, response, next) {

  let idCarros = request.params.id
  let contentType = request.headers['content-type']
  let dadosCarrosUpdate = request.body

  let resultDados = await controllerCarros.setAtualizarNovoCarro(idCarros, dadosCarrosUpdate, contentType)

  console.log(idCarros, dadosCarrosUpdate,resultDados);
  response.status(resultDados.status_code)
  response.json(resultDados)
})

app.delete('/v1/leilao/deleteCarros/:id', cors(), bodyParserjson, async function(request, response, next) {

  let idCarros = request.params.id

  let resultDados = await controllerCarros.setExcluirCarro(idCarros)

  response.status(resultDados.status_code)
  response.json(resultDados)
})

app.listen('8080', function(){
  console.log('API funcionando!')
})