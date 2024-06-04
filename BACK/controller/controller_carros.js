const carrosDAO = require('../model/DAO/carros')
const message = require('../modulo/config')

const getCarros = async function () {
    try {

        let carrosJson = {}
        let dadosCarros = await carrosDAO.selectCarros()

        if (dadosCarros) {

            if (dadosCarros.length > 0) {
                carrosJson.carros = dadosCarros
                carrosJson.status_code = 200

                return carrosJson
            } else {
                console.log('Algo deu errado no processamento de Dados!')
            }
        }

    } catch (error) {
        console.log(error)
    }
}

const setInserirNovoCarro = async (dadosCarros, contentType) => {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {
            let statusValidated = false
            let novoCarroJson = {}

            if (dadosCarros.ano == '' || dadosCarros.ano == undefined || dadosCarros.ano == null || dadosCarros.ano.length > 100 ||
                dadosCarros.cor == '' || dadosCarros.cor == undefined || dadosCarros.cor == null || dadosCarros.cor.length > 20
            ) {
                return message.ERROR_REQUIRED_FIELDS//400

            } else {

                //Validação para verificar se nome e idade tem um conteúdo válido

                if (dadosCarros.marca != '' &&
                    dadosCarros.marca != null &&
                    dadosCarros.marca != undefined &&
                    dadosCarros.modelo != '' &&
                    dadosCarros.modelo != null &&
                    dadosCarros.modelo != undefined

                ) {
                    //Verifica a qtde de caracter
                    if (dadosCarros.marca.length > 50 && isNaN(dadosCarros.modelo)) {
                        return message.ERROR_REQUIRED_FIELDS//400
                    } else {
                        statusValidated = true //validação para liberar a inserção dos dados no DAO
                    }

                } else {
                    statusValidated = true  
                }

                //se a variável for verdadeira, podemos encaminhar os dados para o DAO
                if (statusValidated) {

                    //encaminha os dados para o DAO inserir
                    let novoCarro = await carrosDAO.insertCarros(dadosCarros)

                    if (novoCarro) {

                        let id = await carrosDAO.selectLastId()

                        //Cria o JSON de retorno com informações de requisição e os dados novos
                        novoCarroJson.status = message.SUCESS_CREATED_ITEM.status
                        novoCarroJson.status_code = message.SUCESS_CREATED_ITEM.status_code
                        novoCarroJson.message = message.SUCESS_CREATED_ITEM.message
                        novoCarroJson.id = id[0].id
                        novoCarroJson.carros = dadosCarros


                        console.log(novoCarro, dadosCarros, id[0].id)
                        return novoCarroJson //201

                    } else {
                        console.log(novoCarro, dadosCarros);
                        return message.ERROR_INTERNAL_SERVER_DB //500
                    }
                }

            }

        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }

    } catch (error) {
        console.log("Erro na controller:", error); // Adiciona log para verificar erros na controller
        return message.ERROR_INTERNAL_SERVER //500 erro na camada da controller
    }

}

const setAtualizarNovoCarro = async function (idCarros, dadosCarrosUpdate, content) {
    if (String(content).toLowerCase() == 'application/json') {
        
        let updateCarrosJson = {}
        try {
            const validaId = await carrosDAO.selectCarrosById(idCarros)
            
            if (validaId) {
                const CarroAtualizado = await carrosDAO.updateCarros(idCarros, dadosCarrosUpdate)
                
                if (CarroAtualizado) {
                    updateCarrosJson.id = validaId
                    updateCarrosJson.status = message.SUCESS_UPTADE_ITEM.status
                    updateCarrosJson.status_code = message.SUCESS_UPTADE_ITEM.status_code
                    updateCarrosJson.message = message.SUCESS_UPTADE_ITEM.message
                    updateCarrosJson.carros = CarroAtualizado

                    console.log(updateCarrosJson);

                    return updateCarrosJson
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            } else {
                return message.ERROR_NOT_FOUND
            }

        } catch (error) {
            return message.ERROR_UPDATED_ITEM
        }
    } else {
        return message.ERROR_CONTENT_TYPE
    }
}

const setExcluirCarro = async function (id) {
    let deleteCarrosJson ={}
    
    try {
        const validaId = await carrosDAO.selectCarrosById(id)
        
        if (validaId) {
            const apagarCarros = await carrosDAO.deleteCarros(id)
            
            if (apagarCarros) {
                deleteCarrosJson.status = message.SUCESS_DELETE_ITEM.status
                deleteCarrosJson.status_code = message.SUCESS_DELETE_ITEM.status_code
                deleteCarrosJson.message = message.SUCESS_DELETE_ITEM.message
                deleteCarrosJson.id = validaId

                return deleteCarrosJson
            } else {
                return message.ERROR_INTERNAL_SERVER_DB
            }
        } else {
            return message.ERROR_NOT_FOUND
        }

    } catch (error) {
        return message.ERROR_UPDATED_ITEM
    }
}

module.exports = {
    getCarros,
    setInserirNovoCarro,
    setAtualizarNovoCarro,
    setExcluirCarro
}