
import React, { useEffect, useState } from 'react'
import './Charts.css'
import RankD3 from './RankD3';
function RankChart({ filters, isChart }) {

    const url = `https://searchart.pythonanywhere.com/api/years_data/?year1=${filters.year}&ranks=${filters.ranks}&indicator=${filters.indicator}&countries=${filters.country}`
    const [data, setData] = useState([])

    useEffect(() => {
        async function getAmountDataByAllYears() {
            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    setData(data);
                })
                .catch(error => {
                    console.log('Problem with the fetching data');
                });
        }
        getAmountDataByAllYears()
    }, [filters, data.length]);

    const getYearsInArray = (min, max) => {
        let data = []
        for (let i = min; i <= max; i++) {
            data.push(i)
        }
        return data
    }
    let countriesByYears = data ? data.countries_data : []
    let years = data ? getYearsInArray(data.year1, data.year2) : [];

    return (
        <div className='w-full h-full relative z-0'>

            <div className='headingTable z-0 bg-[#EDEDED] dark:bg-[#0d1f3d] text-[#454545] dark:text-[#A7B4CA]' >
                Gross Domestic Product billions of U.S. dollars over years

            </div>
            <div className='bodyTable scrollStyled dark:bg-[#051124] bg-[#fff] text-[#000000] dark:text-[#fff]'>

                {!isChart &&
                    <><p className='-rotate-90 absolute top-1/2 z-10 -left-4 rotated'>
                        Country
                    </p>
                        <p className='text-center sticky top-0 left-0 bg-[#fff] dark:bg-[#051124] z-50'>Years</p>

                        <div className='flex relative items-start '>
                            <div className='sticky top-0 left-0 countrySheet dark:bg-[#051124] bg-[#fff]'>
                                <span>&nbsp;</span>

                                {data && data.countries_data && countriesByYears.map((item) => {
                                    return item.country[0] &&
                                        (
                                            <p key={Math.random()} className='dark:odd:bg-[#152134]'>

                                                {item.country[0].Country}
                                                <img alt={item.country[0].Country} src={`https://www.countryflagicons.com/FLAT/16/${item.country[0].Country_code_2}.png`} className='flagIcon' />

                                            </p>
                                        )
                                })}
                            </div>

                            <table className="table-auto w-full text-right modeTable">

                                <thead className='years dark:bg-[#0D1F3D] bg-[#EDEDED]'>
                                    <tr>
                                        {
                                            years && years.map((year, index) => {
                                                return <th key={Math.random()} className='px-2'>{year}</th>
                                            })
                                        }
                                    </tr>
                                </thead>
                                <tbody className='text-right text-[#727272]'>
                                    {
                                        data && data.countries_data && countriesByYears.map((country, index) => {
                                            let j = 0;
                                            return <tr key={Math.random()} className={!isChart &&  'dark:even:bg-[#152134]'}>
                                                {years.map((year, index) => {
                                                    let isValid = typeof (country.country[index - j]) != 'undefined'
                                                    if (isValid && year === country.country[index - j].Year) {
                                                        return (
                                                            <td key={Math.random()} className='px-2'>{country.country[index - j].Rank}</td>
                                                        )
                                                    }
                                                    else {
                                                        j++;
                                                        return (
                                                            <td key={Math.random()} className='px-2 text-center'>-</td>
                                                        )
                                                    }
                                                })}
                                            </tr>
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>

                    </>
                }
                {
                    isChart && <RankD3 data={data} countries={filters.country} />
                }
            </div>
        </div>
    )
}

export default RankChart