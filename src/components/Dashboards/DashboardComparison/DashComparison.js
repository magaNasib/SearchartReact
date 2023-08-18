import React, { useState } from 'react'
import classes from './DashComparison.module.css'
import Filters from './Filters'
import Charts from './Charts'
// import Container from '../UI/Container'

function DashComparison() {
    const [filters, setFilters] = useState([])
    const [isChart, setIsChart] = useState(true)
    return (
        <>
            <p className={`${classes.headingComparison} dark:bg-[#09172C] bg-[#E9EAEC] text-[#030712] dark:text-[#F6F6F8]  dark:border-[#182235] border divide-solid border-[#E9EAEC]`}>
                Country Comparsion Dashboard
            </p>
            <div className={`${classes.bgComparison} relative dark:bg-[#051124] bg-[#fff] dark:text-[#A7B4CA] text-[#454545]`}>

               
                <div className={classes.modes}>

                    <div className={classes.modeBtn} onClick={() => setIsChart(true)}>
                        <label htmlFor='chartBtn' className={isChart ? 
                            ' dark:text-[#C0C4CC] text-[#444] bg-[#F6F6F8;] dark:bg-[#0C1E3A7A] border-[#C0C4CC]' :
                             'border-[#C0C4CC] bg-[#F6F6F8;] dark:bg-[#0C1E3A7A] dark:text-[#505866] text-[#CFCFCF]'} >
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
                    <div className={classes.modeBtn} onClick={() => setIsChart(false)}>
                        <label htmlFor='tableBtn' className={!isChart ?  ' dark:text-[#C0C4CC] text-[#444] bg-[#F6F6F8;] dark:bg-[#0C1E3A7A] border-[#C0C4CC]' : 'border-[#C0C4CC] bg-[#F6F6F8;] dark:bg-[#0C1E3A7A] dark:text-[#505866] text-[#CFCFCF]'} >
                            Table
                        </label>
                        <input type='radio' id='tableBtn' className='hidden' name='mode' />
                    </div>
                </div>
                <Filters setFilters={setFilters} />
                <Charts filters={filters} isChart={isChart} />
            </div>
        </>
    )
}

export default DashComparison