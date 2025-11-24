import Card from './Card'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart, CartesianGrid, Tooltip } from 'recharts'
import './ExpensesChart.css'

const data = [
  { month: 'Jan', value: 400 },
  { month: 'Feb', value: 300 },
  { month: 'Mar', value: 500 },
  { month: 'Apr', value: 450 },
  { month: 'May', value: 600 },
  { month: 'Jun', value: 550 },
]

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="tooltip-value">${payload[0].value}</p>
      </div>
    )
  }
  return null
}

function ExpensesChart() {
  return (
    <Card>
      <h3 className="chart-title">Расходы / месяц</h3>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff0000" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#ff0000" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
          <XAxis 
            dataKey="month" 
            stroke="#888" 
            tick={{ fill: '#888', fontSize: 12 }}
            axisLine={{ stroke: '#2a2a2a' }}
          />
          <YAxis 
            stroke="#888" 
            tick={{ fill: '#888', fontSize: 12 }}
            axisLine={{ stroke: '#2a2a2a' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#ff0000"
            strokeWidth={3}
            fill="url(#colorValue)"
            dot={{ fill: '#ff0000', r: 4, strokeWidth: 2, stroke: '#1a1a1a' }}
            activeDot={{ r: 6, fill: '#ff0000', stroke: '#ffffff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default ExpensesChart

