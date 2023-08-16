import React from 'react'
import AmountTable from './AmountTable'
import RankDifference from './RankDifference'
import AmountChart from './AmountChart'
import './Charts.css'
import RankChart from './RankChart'
function Charts({ filters, isChart }) {
  return (
    <div className='bgCharts'>
      <div className='flex gap-4 w-full h-40vh'>
        <AmountTable filters={filters} isChart={isChart} />
        <RankDifference filters={filters}/>
        <AmountChart filters={filters} isChart={isChart} />
      </div>

      <div className='w-full h-40vh mt-3'>
        
      <RankChart filters={filters} isChart={isChart} />
      </div>
    </div>
  )
}

export default Charts