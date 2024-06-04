const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const selectCarros = async function () {
  try {
    let sql = 'select * from tbl_carros'
    let resultadoCarros = await prisma.$queryRawUnsafe(sql)

    return resultadoCarros
  } catch (error) {
    return false
  }
}

const selectCarrosById = async function () {
  try {
    let sql = `select * from tbl_carros where id = ${id}`
    let resultadoCarros = await prisma.$queryRawUnsafe(sql)

    return resultadoCarros
  } catch (error) {
    return false
  }
}

const insertCarros = async (dadosCarros) => {
  try {

    if (dadosCarros.modelo != null ||
      dadosCarros.modelo != undefined ||
      dadosCarros.modelo != '' ||
      dadosCarros.ano != null ||
      dadosCarros.ano != undefined ||
      dadosCarros.ano != ''
    ) {
      sql = `INSERT INTO tbl_carros (
        marca, 
        modelo,
        ano,
        cor
      ) VALUES (
        '${dadosCarros.marca}',
        '${dadosCarros.modelo}',
        '${dadosCarros.ano}',
        '${dadosCarros.cor}'
      );`
    }

    let result = await prisma.$queryRawUnsafe(sql)

    if (result)
      return true
    else
      return false
  } catch (error) {
    return false
  }
}

const selectLastId = async function () {
  try {
    let sql = 'select tbl_carros.id from tbl_carros where id order by id Desc;'
    let resultadoCarros = await prisma.$queryRawUnsafe(sql)

    return resultadoCarros
  } catch (error) {
    return false
  }
}

const updateCarros = async function (id, dadosCarrosUpdate) {
  try {
    let sql = `UPDATE tbl_carros SET`
    const keys = Object.keys(dadosCarrosUpdate)

    keys.forEach((key, index) => {
      sql += `${key} = '${dadosCarrosUpdate[key]}'`
      if (index !== keys.length - 1) {
        sql += `,`
      }
    })

    sql += `WHERE id = ${id}`
    let result = await prisma.$executeRawUnsafe(sql)

    return result
  } catch (error) {
    return false
  }
}

const deleteCarros = async function (id) {
  try {
    let sql = `delete from carros where id = ${id};`
    let result = await prisma.$queryRawUnsafe(sql)

    return result
  } catch (error) {
    return false
  }
}

module.exports = {
  selectCarros,
  selectCarrosById,
  insertCarros,
  selectLastId,
  updateCarros,
  deleteCarros
}