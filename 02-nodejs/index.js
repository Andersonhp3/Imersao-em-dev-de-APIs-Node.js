function obterUsuario(callback) {
  setTimeout(function () {
    return callback(null,{
      id: 1,
      nome: 'Aladin',
      dataNascimento: new Date()
    })
  }, 1000)
}

function obterTelefone(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      telefone: '1199002',
      ddd:11
    })
  }, 2000)
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'dos bobos',
      numero: 0
    })
  }, 2000)
}


function resolverUsuario(erro, usuario) {
  console.log('usuario', usuario);
}

obterUsuario(function resolverUsuario(error, usuario) {
  if(error) {
    console.error('Deu ruim em Usuario', error)
    return;
  }
  obterTelefone(usuario.id,function resolverTelefone(error1, telefone) {
    if(error1) {
      console.error('Deu ruim em Usuario', error)
      return;
    }

    obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
      if(error2) {
        console.error('Deu ruim em Usuario', error)
        return;
      }
  
      console.log(`
        Nome: ${usuario.nome},
        Endereço: ${endereco.rua}, ${endereco.numero}
        Telefone: (${telefone.ddd}${telefone.telefone})
      `);
    })
  })

})
