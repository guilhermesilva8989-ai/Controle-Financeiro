import { useState } from 'react'

import Summary from '../components/Summary'
import TransactionForm from '../components/TransactionForm'
import TransactionList from '../components/TransactionList'
import FinancialChart from '../components/FinancialChart'
import CategoryChart from '../components/CategoryChart'

function Home({
  transacoes,
  adicionarTransacao,
  editarTransacao,
  excluirTransacao,
}) {
  const [filtro, setFiltro] = useState('todas')
  const [mesSelecionado, setMesSelecionado] = useState('todos')
  const [busca, setBusca] = useState('')
  const [ordenacao, setOrdenacao] = useState('mais-recentes')

  const [transacaoEditando, setTransacaoEditando] =
    useState(null)

  function iniciarEdicao(transacao) {
    setTransacaoEditando(transacao)
  }

  function cancelarEdicao() {
    setTransacaoEditando(null)
  }

  function salvarEdicao(id, dadosAtualizados) {
    editarTransacao(id, dadosAtualizados)
    setTransacaoEditando(null)
  }

  function confirmarExclusao(id) {
    const confirmou = window.confirm(
      'Tem certeza que deseja excluir esta transação?'
    )

    if (confirmou) {
      excluirTransacao(id)
    }
  }

  function limparFiltros() {
    setFiltro('todas')
    setMesSelecionado('todos')
    setBusca('')
    setOrdenacao('mais-recentes')
  }

  const mesesDisponiveis = [
    ...new Set(
      transacoes.map((transacao) => {
        const data = new Date(transacao.data)

        const ano = data.getFullYear()

        const mes = String(
          data.getMonth() + 1
        ).padStart(2, '0')

        return `${ano}-${mes}`
      })
    ),
  ]
    .sort()
    .reverse()

  const transacoesDoMes =
    transacoes.filter((transacao) => {
      if (mesSelecionado === 'todos') {
        return true
      }

      const data = new Date(transacao.data)

      const ano = data.getFullYear()

      const mes = String(
        data.getMonth() + 1
      ).padStart(2, '0')

      return `${ano}-${mes}` === mesSelecionado
    })

  const transacoesFiltradas = transacoesDoMes
    .filter((transacao) => {
      const correspondeTipo =
        filtro === 'todas' ||
        transacao.tipo === filtro

      const correspondeBusca =
        transacao.descricao
          .toLowerCase()
          .includes(
            busca.toLowerCase()
          )

      return (
        correspondeTipo &&
        correspondeBusca
      )
    })
    .sort((a, b) => {
      if (ordenacao === 'mais-recentes') {
        return (
          new Date(b.data) -
          new Date(a.data)
        )
      }

      if (ordenacao === 'mais-antigas') {
        return (
          new Date(a.data) -
          new Date(b.data)
        )
      }

      if (ordenacao === 'maior-valor') {
        return b.valor - a.valor
      }

      if (ordenacao === 'menor-valor') {
        return a.valor - b.valor
      }

      return 0
    })

  const receitas = transacoesDoMes
    .filter(
      (transacao) =>
        transacao.tipo === 'receita'
    )
    .reduce(
      (total, transacao) =>
        total + Number(transacao.valor),
      0
    )

  const despesas = transacoesDoMes
    .filter(
      (transacao) =>
        transacao.tipo === 'despesa'
    )
    .reduce(
      (total, transacao) =>
        total + Number(transacao.valor),
      0
    )

  function formatarMes(valor) {
    const [ano, mes] =
      valor.split('-')

    const data = new Date(
      Number(ano),
      Number(mes) - 1
    )

    return data.toLocaleDateString(
      'pt-BR',
      {
        month: 'long',
        year: 'numeric',
      }
    )
  }

  return (
    <main className="pagina">
      <header className="cabecalho">
        <h1>💰 Controle Financeiro</h1>

        <p>
          Organize suas receitas e despesas
        </p>
      </header>

      <Summary
        transacoes={transacoesDoMes}
      />

      <TransactionForm
        adicionarTransacao={
          adicionarTransacao
        }
        transacaoEditando={
          transacaoEditando
        }
        salvarEdicao={
          salvarEdicao
        }
        cancelarEdicao={
          cancelarEdicao
        }
      />

      <section className="filtros-area">
        <div className="filtros">
          <button
            className={
              filtro === 'todas'
                ? 'filtro-ativo'
                : ''
            }
            onClick={() =>
              setFiltro('todas')
            }
          >
            Todas
          </button>

          <button
            className={
              filtro === 'receita'
                ? 'filtro-ativo'
                : ''
            }
            onClick={() =>
              setFiltro('receita')
            }
          >
            Receitas
          </button>

          <button
            className={
              filtro === 'despesa'
                ? 'filtro-ativo'
                : ''
            }
            onClick={() =>
              setFiltro('despesa')
            }
          >
            Despesas
          </button>
        </div>

        <select
          className="filtro-mes"
          value={mesSelecionado}
          onChange={(event) =>
            setMesSelecionado(
              event.target.value
            )
          }
        >
          <option value="todos">
            Todos os meses
          </option>

          {mesesDisponiveis.map(
            (mes) => (
              <option
                key={mes}
                value={mes}
              >
                {formatarMes(mes)}
              </option>
            )
          )}
        </select>
      </section>

      <section className="busca-ordenacao">
        <input
          type="text"
          placeholder="Buscar por descrição..."
          value={busca}
          onChange={(event) =>
            setBusca(event.target.value)
          }
        />

        <select
          value={ordenacao}
          onChange={(event) =>
            setOrdenacao(
              event.target.value
            )
          }
        >
          <option value="mais-recentes">
            Mais recentes
          </option>

          <option value="mais-antigas">
            Mais antigas
          </option>

          <option value="maior-valor">
            Maior valor
          </option>

          <option value="menor-valor">
            Menor valor
          </option>
        </select>

        <button
          className="botao-limpar"
          onClick={limparFiltros}
        >
          Limpar filtros
        </button>
      </section>

      <div className="graficos-grid">
        <FinancialChart
          receitas={receitas}
          despesas={despesas}
        />

        <CategoryChart
          transacoes={
            transacoesDoMes
          }
        />
      </div>

      <div className="contador-transacoes">
        <strong>
          {transacoesFiltradas.length}
        </strong>

        <span>
          {transacoesFiltradas.length === 1
            ? ' transação encontrada'
            : ' transações encontradas'}
        </span>
      </div>

      <TransactionList
        transacoes={
          transacoesFiltradas
        }
        iniciarEdicao={
          iniciarEdicao
        }
        excluirTransacao={
          confirmarExclusao
        }
      />
    </main>
  )
}

export default Home