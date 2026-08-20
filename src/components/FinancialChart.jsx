import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts'

function FinancialChart({
  receitas,
  despesas,
}) {
  const dados = [
    {
      nome: 'Financeiro',
      Receitas: receitas,
      Despesas: despesas,
    },
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
      <h2>Receitas x Despesas</h2>

      <div className="grafico">
        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <BarChart data={dados}>
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="nome" />

            <YAxis />

            <Tooltip
              formatter={(valor) =>
                formatarValor(valor)
              }
            />

            <Legend />

            <Bar
              dataKey="Receitas"
              fill="#16a34a"
            />

            <Bar
              dataKey="Despesas"
              fill="#dc2626"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

export default FinancialChart