function TransactionList({
  transacoes,
  iniciarEdicao,
  excluirTransacao,
}) {
  function formatarValor(valor) {
    return Number(valor).toLocaleString(
      'pt-BR',
      {
        style: 'currency',
        currency: 'BRL',
      }
    )
  }

  function formatarData(data) {
    return new Date(data).toLocaleDateString(
      'pt-BR'
    )
  }

  if (transacoes.length === 0) {
    return (
      <section className="lista-area">
        <h2>Transações</h2>

        <p className="mensagem-vazia">
          Nenhuma transação encontrada.
        </p>
      </section>
    )
  }

  return (
    <section className="lista-area">
      <h2>Transações</h2>

      <div className="lista-transacoes">
        {transacoes.map((transacao) => (
          <div
            className={`transacao ${transacao.tipo}`}
            key={transacao.id}
          >
            <div className="transacao-info">
              <strong>
                {transacao.descricao}
              </strong>

              <span>
                {transacao.categoria}
              </span>

              <span>
                📅 {formatarData(transacao.data)}
              </span>
            </div>

            <div className="transacao-acoes">
              <strong>
                {transacao.tipo === 'receita'
                  ? '+ '
                  : '- '}

                {formatarValor(
                  transacao.valor
                )}
              </strong>

              <button
                className="botao-editar"
                onClick={() =>
                  iniciarEdicao(transacao)
                }
              >
                Editar
              </button>

              <button
                className="botao-excluir"
                onClick={() =>
                  excluirTransacao(
                    transacao.id
                  )
                }
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TransactionList