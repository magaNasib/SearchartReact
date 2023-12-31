import React, { useEffect, useState } from 'react'
import './Years.css'
function Years({ choosenData, onChangeYear }) {
    const [data, setData] = useState([])
    const url = `https://searchart.pythonanywhere.com/api/available-years/?indicator=${choosenData.indicator}&countries=${choosenData.country}`;

    useEffect(() => {
        async function getYears() {
            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    setData(data);
                })
                .catch(error => {
                    console.log('Problem with the fetching data');
                });
        }
        getYears()
    }, [choosenData,data.length]);
    return (

        <div>
            <select className='scrollStyled dark:bg-[#293F64] bg-[#FFFFFF] dark:text-[#A7B4CA] text-[#454545]' value={choosenData.year} onChange={(e) => { onChangeYear((prevData) => { return { ...prevData, year: e.target.value } }) }}>
                {data && data.map((year, index) => {
                    return (
                        <option key={index} value={year}>
                            {year}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default Years