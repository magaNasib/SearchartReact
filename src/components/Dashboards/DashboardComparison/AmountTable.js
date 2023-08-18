import React, { useEffect, useState } from 'react'
import './AmountTable.css'
import { useRef } from 'react'
function AmountTable({ filters, isChart }) {
    const url = `https://searchart.pythonanywhere.com/api/by_amount/?indicator=${filters.indicator}&countries=${filters.country}&year1=${filters.year}&ranks=${filters.ranks}`
    const [data, setData] = useState([])
    const spanPercentageRef = useRef()
    useEffect(() => {
        async function getAmounts() {
            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    setData(data);
                })
                .catch(error => {
                    console.log('Problem with the fetching data');
                });
        }
        getAmounts()
    }, [filters, data.length]);

    const onMouseMoveSpan = (event, d) => {
        // Show the tooltip on mouseover
        const tooltip = spanPercentageRef.current
        // event.target.style = 'opacity:1'
        tooltip.style.display = "block";
        tooltip.style.color = "black";
        tooltip.style.left = event.nativeEvent.clientX+ "px";
        tooltip.style.top = event.nativeEvent.clientY+ 20 + "px";
        tooltip.innerHTML = `<p>Country:${d.country}</p><p> Year: ${d.year}</p><p> Amount: ${d.amount}</p>`;
    }
    const onMouseOutSpan=(e)=>{
        const tooltip = spanPercentageRef.current
        tooltip.style.display = "none";
    }



    return (
        <>
            <div className='w-35'>
                <div className='headingTable  bg-[#EDEDED] dark:bg-[#0d1f3d] text-[#454545] dark:text-[#A7B4CA]' >
                    {filters.indicator} in {filters.year} year
                    {/* Gross Domestic Product billions of U.S. dollars in 2021 year */}
                </div>
                <div className='bodyTable scrollStyled dark:bg-[#051124] bg-[#fff] text-[#000000] dark:text-[#fff] relative'>
                <div ref={spanPercentageRef} className="hidden fixed pointer-events-none  border-gray-700 dark:bg-chartCardHeader border-2 p-2 text-sm z-40 bg-gray-100 rounded-2xl"></div>

                    <table className={`table-auto w-full text-right amountTable ${!isChart && 'modeTable'}`}>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Country</th>
                                <th>{!isChart && 'Amount'}</th>
                            </tr>
                        </thead>
                        <tbody className='text-right'>

                            {
                                data &&
                                data.countries_by_rank && data.countries_by_rank.map((eachCountry, index) => {
                                    let amountByPercentage = ((+eachCountry.amount - +data.min_amount) / (+data.max_amount - +data.min_amount)) * 100;

                                    return (
                                        <tr key={Math.random()}>
                                            <td>{eachCountry.rank}</td>
                                            <td>
                                                <div>
                                                    <span>{eachCountry.country}
                                                        <img alt={eachCountry.country} src={`https://www.countryflagicons.com/FLAT/16/${eachCountry.country_code_2}.png`} className='flagIcon' /></span>

                                                </div>
                                            </td>
                                            <td>
                                                {isChart ? <span onMouseMove={(e) => onMouseMoveSpan(e, eachCountry)} 
                                                onMouseOut={onMouseOutSpan}
                                                className='parentProgress cursor-pointer dark:bg-[#253041] bg-[#D9D9D9]'>
                                                    <span style={{ width: amountByPercentage + '%', background: amountByPercentage > 50 ? '#265D7E' : '#87A6B8' }} className='childProgress'>
                                                    </span>
                                                </span> :<span className=''>{ +eachCountry.amount.toFixed(2)}</span>}
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>


        </>
    )
}

export default AmountTable