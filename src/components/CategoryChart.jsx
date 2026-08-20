import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

function CategoryChart({ transacoes }) {
  const despesas = transacoes.filter(
    (transacao) =>
      transacao.tipo === 'despesa'
  )

  const valoresPorCategoria =
    despesas.reduce(
      (categorias, transacao) => {
        const categoria =
          transacao.categoria

        if (!categorias[categoria]) {
          categorias[categoria] = 0
        }

        categorias[categoria] +=
          Number(transacao.valor)

        return categorias
      },
      {}
    )

  const dados = Object.entries(
    valoresPorCategoria
  ).map(([categoria, valor]) => ({
    nome: categoria,
    valor,
  }))

  const cores = [
    '#2563eb',
    '#16a34a',
    '#f59e0b',
    '#dc2626',
    '#8b5cf6',
    '#0891b2',
    '#db2777',
  ]

  function formatarValor(valor) {
    return Number(valor).toLocaleString(
      'pt-BR',
      {
        style: 'currency',
        currency: 'BRL',
      }
    )
  }

  return (
    <section className="grafico-area">
      <h2>Despesas por categoria</h2>

      {dados.length === 0 ? (
        <p className="mensagem-vazia">
          Nenhuma despesa cadastrada.
        </p>
      ) : (
        <div className="grafico">
          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <PieChart>
              <Pie
                data={dados}
                dataKey="valor"
                nameKey="nome"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {dados.map(
                  (_, index) => (
                    <Cell
                      key={index}
                      fill={
                        cores[
                          index %
                            cores.length
                        ]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip
                formatter={(valor) =>
                  formatarValor(valor)
                }
              />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  )
}

export default CategoryChart