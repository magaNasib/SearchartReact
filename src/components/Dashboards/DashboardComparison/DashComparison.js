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
            <div className={classes.bgComparison}>
                <div className={classes.modes}>

                    <div className={classes.modeBtn} onClick={()=>setIsChart(true)}>
                        <label htmlFor='chartBtn'  className={isChart && classes.active} >
                            Chart
                        </label>
                        <input type='radio' id='chartBtn' className='hidden' name='mode' />
                    </div>
                    <div>
                        <select>
                            <option>
                                Country Comparsion
                            </option>
                        </select>
                    </div>
                    <div className={classes.modeBtn} onClick={()=>setIsChart(false)}>
                        <label htmlFor='tableBtn'  className={!isChart && classes.active} >
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