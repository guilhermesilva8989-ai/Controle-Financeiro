import { useEffect, useState } from 'react'

function TransactionForm({
  adicionarTransacao,
  transacaoEditando,
  salvarEdicao,
  cancelarEdicao,
}) {
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [tipo, setTipo] = useState('despesa')
  const [categoria, setCategoria] = useState('Outros')
  const [data, setData] = useState('')
  const [erro, setErro] = useState('')

  useEffect(() => {
    if (transacaoEditando) {
      setDescricao(transacaoEditando.descricao)
      setValor(transacaoEditando.valor)
      setTipo(transacaoEditando.tipo)
      setCategoria(transacaoEditando.categoria)

      if (transacaoEditando.data) {
        setData(
          transacaoEditando.data.substring(0, 10)
        )
      }

      setErro('')
    }
  }, [transacaoEditando])

  function limparFormulario() {
    setDescricao('')
    setValor('')
    setTipo('despesa')
    setCategoria('Outros')
    setData('')
    setErro('')
  }

  function enviarFormulario(event) {
    event.preventDefault()

    if (descricao.trim() === '') {
      setErro('Digite uma descrição.')
      return
    }

    if (valor === '') {
      setErro('Digite um valor.')
      return
    }

    if (Number(valor) <= 0) {
      setErro('O valor precisa ser maior que zero.')
      return
    }

    if (data === '') {
      setErro('Selecione uma data.')
      return
    }

    const dados = {
      descricao: descricao.trim(),
      valor: Number(valor),
      tipo,
      categoria,
      data: new Date(
        `${data}T12:00:00`
      ).toISOString(),
    }

    if (transacaoEditando) {
      salvarEdicao(
        transacaoEditando.id,
        dados
      )
    } else {
      adicionarTransacao(dados)
    }

    limparFormulario()
  }

  function cancelar() {
    limparFormulario()
    cancelarEdicao()
  }

  return (
    <section className="formulario-area">
      <h2>
        {transacaoEditando
          ? 'Editar transação'
          : 'Nova transação'}
      </h2>

      <form
        className="formulario"
        onSubmit={enviarFormulario}
      >
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(event) => {
            setDescricao(event.target.value)
            setErro('')
          }}
        />

        <input
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Valor"
          value={valor}
          onChange={(event) => {
            setValor(event.target.value)
            setErro('')
          }}
        />

        <select
          value={tipo}
          onChange={(event) =>
            setTipo(event.target.value)
          }
        >
          <option value="receita">
            Receita
          </option>

          <option value="despesa">
            Despesa
          </option>
        </select>

        <select
          value={categoria}
          onChange={(event) =>
            setCategoria(event.target.value)
          }
        >
          <option>Salário</option>
          <option>Alimentação</option>
          <option>Transporte</option>
          <option>Moradia</option>
          <option>Lazer</option>
          <option>Saúde</option>
          <option>Outros</option>
        </select>

        <input
          type="date"
          value={data}
          onChange={(event) => {
            setData(event.target.value)
            setErro('')
          }}
        />

        <button type="submit">
          {transacaoEditando
            ? 'Salvar'
            : 'Adicionar'}
        </button>

        {transacaoEditando && (
          <button
            type="button"
            className="botao-cancelar"
            onClick={cancelar}
          >
            Cancelar
          </button>
        )}
      </form>

      {erro && (
        <p className="erro-formulario">
          ⚠️ {erro}
        </p>
      )}
    </section>
  )
}

export default TransactionForm