
//  importamos um módulo interno do node.js
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)


function obterUsuario() {
  // Quando der algum problema -> reject(erro)
  // Quando sucess -> Resolv
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {

      // return reject(new Error('Deu ruim de verdade!!'))

      return resolve({
        id: 1,
        nome: 'Aladin',
        dataNascimento: new Date()
      })
    }, 1000)
  })
}

function obterTelefone(idUsuario) {
  return new Promise (function resolverPromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: '1199002',
        ddd:11
      })
    }, 2000)    
  })
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'dos bobos',
      numero: 0
    })
  }, 2000)
}

// 1 passo adicionar a palavra async -> automaticamente ela retornará uma Promise
main()
async function main() {
  try {
    console.time('medida-promise')
    const usuario = await obterUsuario()
    // const telefone = await obterTelefone(usuario.id)
    // const endereco = await obterEnderecoAsync(usuario.id)

    const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id)
    ])
    const endereco = resultado[1]
    const telefone = resultado[0]
    console.log(`
      Nome: ${usuario.nome},
      Telefone: (${telefone.ddd}) ${telefone.telefone}
      Endereço: ${endereco.rua}, ${endereco.numero}
    `)
    console.timeEnd('medida-promise')

  } catch (error) {
    console.error("Deu erro", error)
  }
}

// const usuarioPromise = obterUsuario()
// // para manipular o sucesso usamos a função .then
// // para manilupar erro, usamos o .catch
// // usuario -> telefone -> telefone
// usuarioPromise
//   .then(function (usuario) {
//     return obterTelefone(usuario.id)
//     .then(function resolverTelefone(result) {
//       return {
//         usuario: {
//           nome: usuario.nome,
//           id: usuario.id
//         },
//         telefone: result
//       }
//     })
//   })
//   .then(function (resultado) {
//     const endereco = obterEnderecoAsync(resultado.usuario.id)
//     return endereco.then(function resolverEndereco(result) {
//       return {
//         usuario: resultado.usuario,
//         telefone: resultado.telefone,
//         endereco: result
//       }
//     })
//   })
//   .then(function (resultado) {
//   console.log(`
//     Nome: ${resultado.usuario.nome}
//     Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero}
//     Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
//   `)
// }).catch(function (error) {
//   console.error("Deu ruim", error)
// })

// obterUsuario(function resolverUsuario(error, usuario) {
//   if(error) {
//     console.error('Deu ruim em Usuario', error)
//     return;
//   }
//   obterTelefone(usuario.id,function resolverTelefone(error1, telefone) {
//     if(error1) {
//       console.error('Deu ruim em Usuario', error)
//       return;
//     }

//     obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//       if(error2) {
//         console.error('Deu ruim em Usuario', error)
//         return;
//       }
  
//       console.log(`
//         Nome: ${usuario.nome},
//         Endereço: ${endereco.rua}, ${endereco.numero}
//         Telefone: (${telefone.ddd}${telefone.telefone})
//       `);
//     })
//   })

// })
