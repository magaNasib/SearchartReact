import React, { useEffect, useState } from 'react'

function RankDifference({ filters }) {
    const url_data = `https://searchart.pythonanywhere.com/api/rank_diff/?year1=${filters.year}&indicator=${filters.indicator}&countries=${filters.country}`

    const url_years = `https://searchart.pythonanywhere.com/api/available-years/?indicator=${filters.indicator}&countries=${filters.country}`;

    const [years, setYears] = useState([])
    const [data, setData] = useState([])
    const [choosenYears, setChoosenYears] = useState({
        first_year: '',
        second_year: ''
    })




    useEffect(() => {
        async function getAmounts() {
            await fetch(url_data)
                .then(response => response.json())
                .then(data => {
                    setData(data);
                })
                .catch(error => {
                    console.log('Problem with the fetching data');
                });
        }
        getAmounts()
    }, [filters,data.length]);


    useEffect(() => {
        async function getYears() {
            await fetch(url_years)
                .then(response => response.json())
                .then(data => {
                    setYears(data);
                })
                .catch(error => {
                    console.log('Problem with the fetching data');
                });
        }
        getYears()
    }, [data]);


    useEffect(() => {

        // data ? setChoosenYears({ first_year: data.first_year, second_year: data.second_year }) : setChoosenYears(prev => prev)
        data &&  setChoosenYears({ first_year: data.first_year, second_year: data.second_year }) 
    }, [data.first_year,data.second_year])

    useEffect(() => {
        let url_uptade = `https://searchart.pythonanywhere.com/api/rank_diff/?year1=${choosenYears.first_year}&year2=${choosenYears.second_year}&indicator=${filters.indicator}&countries=${filters.country}`
        async function getAmounts() {
            await fetch(url_uptade)
                .then(response => response.json())
                .then(data => {
                    setData(data);
                })
                .catch(error => {
                    console.log('Problem with the fetching data');
                });
        }
        getAmounts()

    }, [choosenYears.first_year, choosenYears.second_year])
    const onChangeYear = (e, whichYear) => {
        setChoosenYears((prevData) => { return { ...prevData, [whichYear]: +e.target.value } })

    }
    return (
        <div className='w-30'>
                <div className='headingTable  bg-[#EDEDED] dark:bg-[#0d1f3d] text-[#454545] dark:text-[#A7B4CA]' >
                Difference in rank between years
            </div>

            <div className='bodyTable scrollStyled dark:bg-[#051124] bg-[#fff] text-[#000000] dark:text-[#fff]'>
                <div className='rangeYearsBtns flex justify-between gap-6'>
                    <select className='scrollStyled dark:bg-[#051124] bg-[#fff]' value={choosenYears.first_year} onChange={(e) => { onChangeYear(e, 'first_year') }}>
                        {years && years.map((year, index) => {
                            return (
                                <option key={index} value={year}>
                                    {year}
                                </option>
                            )
                        })}
                    </select>
                    <select className='scrollStyled dark:bg-[#051124] bg-[#fff] text-[#000] dark:text-[#A7B4CA]' value={choosenYears.second_year} onChange={(e) => { onChangeYear(e, 'second_year') }}>
                        {years && years.map((year, index) => {
                            return (
                                <option key={index} value={year}>
                                    {year}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <table className={`table-auto w-full text-right amountTable`}>

                    <tbody className='text-right'>

                        {
                            data &&
                            data.countries && data.countries.map((eachCountry, index) => {


                                let differ = {
                                    flag: eachCountry.country_code_2,
                                    color: () => {
                                        if (eachCountry.rank_difference > 0) { return "#23D30F" } else if (eachCountry.rank_difference < 0) { return "#CE1126" } else {

                                            return "#7E8590"
                                        }
                                    },
                                    icon: () => { if (eachCountry.rank_difference > 0) { return 'fa-solid fa-arrow-trend-up' } else if (eachCountry.rank_difference < 0) { return "fa-solid fa-arrow-trend-down" } else { return "fa-solid fa-equals" } },
                                    status: () => { if (eachCountry.rank_difference > 0) { return "Positions up" } else if (eachCountry.rank_difference < 0) { return "Positions down" } else { return "No changes" } }
                                }
                                return (
                                    <tr key={Math.random()}>
                                        <td>
                                            <div>
                                                <span>{eachCountry.country}
                                                    <img alt={eachCountry.country} src={`https://www.countryflagicons.com/FLAT/16/${eachCountry.country_code_2}.png`} className='flagIcon' /></span>

                                            </div>
                                        </td>
                                        <td>
                                            <p className='whitespace-nowrap'>

                                                <i className={differ.icon()} style={{ color: differ.color() }}></i>
                                                <span className="spanRank px-1" style={{ color: differ.color() }}>{eachCountry.rank_difference}</span>
                                            </p>
                                        </td>
                                        <td>
                                            <p style={{ color: differ.color() }}>{differ.status()} </p>

                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RankDifference