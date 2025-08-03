import React from 'react'

interface MetricCardProps {
  title: string
  value: string
  growth: string
  growthType: 'positive' | 'negative' | 'neutral'
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, growth, growthType }) => {
  let growthColorClass = 'text-gray-500'
  if (growthType === 'positive') {
    growthColorClass = 'text-green-500'
  } else if (growthType === 'negative') {
    growthColorClass = 'text-red-500'
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</h3>
      <p className="mt-3 text-4xl font-extrabold text-gray-900">{value}</p>
      <p className={`mt-2 text-sm font-semibold ${growthColorClass}`}>{growth}</p>
    </div>
  )
}

export default MetricCard
