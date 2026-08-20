function Summary({ transacoes }) {
  const receitas = transacoes
    .filter((transacao) => transacao.tipo === 'receita')
    .reduce(
      (total, transacao) =>
        total + Number(transacao.valor),
      0
    )

  const despesas = transacoes
    .filter((transacao) => transacao.tipo === 'despesa')
    .reduce(
      (total, transacao) =>
        total + Number(transacao.valor),
      0
    )

  const saldo = receitas - despesas

  function formatarValor(valor) {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  return (
    <section className="resumo">
      <div className="card-resumo">
        <span>Saldo atual</span>
        <strong>{formatarValor(saldo)}</strong>
      </div>

      <div className="card-resumo receita">
        <span>Receitas</span>
        <strong>{formatarValor(receitas)}</strong>
      </div>

      <div className="card-resumo despesa">
        <span>Despesas</span>
        <strong>{formatarValor(despesas)}</strong>
      </div>
    </section>
  )
}

export default Summary