import { useEffect, useState } from 'react'
import Home from './pages/Home'
import './App.css'

function App() {
  const [transacoes, setTransacoes] = useState(() => {
    const dadosSalvos = localStorage.getItem('transacoes')

    if (dadosSalvos) {
      return JSON.parse(dadosSalvos)
    }

    return []
  })

  useEffect(() => {
    localStorage.setItem(
      'transacoes',
      JSON.stringify(transacoes)
    )
  }, [transacoes])

  function adicionarTransacao(transacao) {
    const novaTransacao = {
      ...transacao,
      id: Date.now(),
    }

    setTransacoes([
      ...transacoes,
      novaTransacao,
    ])
  }

  function editarTransacao(id, dadosAtualizados) {
    const novasTransacoes = transacoes.map(
      (transacao) => {
        if (transacao.id === id) {
          return {
            ...transacao,
            ...dadosAtualizados,
          }
        }

        return transacao
      }
    )

    setTransacoes(novasTransacoes)
  }

  function excluirTransacao(id) {
    const novasTransacoes = transacoes.filter(
      (transacao) => transacao.id !== id
    )

    setTransacoes(novasTransacoes)
  }

  return (
    <Home
      transacoes={transacoes}
      adicionarTransacao={adicionarTransacao}
      editarTransacao={editarTransacao}
      excluirTransacao={excluirTransacao}
    />
  )
}

export default App