import React, { useState } from 'react'
import classes from './DashComparison.module.css'
import Filters from './Filters'
import  Charts from './Charts'
// import Container from '../UI/Container'

function DashComparison() {
    const [filters,setFilters] = useState([])
    const [isChart, setIsChart] = useState(true)
    return (
        <>
            <p className={classes.headingComparison}>
                Country Comparsion Dashboard
            </p>
            <div className={`${classes.bgComparison} dark:bg-[#051124] bg-[#CFCFCF] dark:text-[#A7B4CA] text-[#454545]`}>
                <div className={classes.modes}>

                    <div className={classes.modeBtn} onClick={()=>setIsChart(true)}>
                        <label htmlFor='chartBtn'  className={isChart ? 'border-[#C0C4CC] dark:text-[rgba(255, 255, 255, 0.74)] text-[#CFCFCF] bg-[#fff] dark:bg-[rgba(12, 30, 58, 0.48)]':'dark:text-[#505866] text-[#444]'} >
                            Chart
                        </label>
                        <input type='radio' id='chartBtn' className='hidden' name='mode' />
                    </div>
                    <div>
                        <select className='dark:bg-[#08172F] bg-[#fff] dark:border-[#283B5A] border-[#C0C4CC]'>
                            <option>
                                Country Comparsion
                            </option>
                        </select>
                    </div>
                    <div className={classes.modeBtn} onClick={()=>setIsChart(false)}>
                        <label htmlFor='tableBtn'  cclassName={!isChart ? 'border-[#C0C4CC] dark:text-[rgba(255, 255, 255, 0.74)] text-[#CFCFCF] bg-[#fff] dark:bg-[rgba(12, 30, 58, 0.48)]':'dark:text-[#505866] text-[#444]'} >
                            Table
                        </label>
                        <input type='radio' id='tableBtn' className='hidden' name='mode' />
                    </div>
                </div>
                <Filters setFilters={setFilters}/>
                <Charts filters={filters} isChart={isChart}/>
            </div>
        </>
    )
}

export default DashComparison