import React, { useEffect, useState } from 'react'
import classes from './Filters.module.css'
import RankSlider from './RankSlider'
import CountriesSelect from './CountriesSelect';
import Years from './Years';

function Filters({setFilters}) {


    const [data, setData] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState([]);

    const [choosenData, setChoosenData] = useState({
        sector: 'Economy',
        subSector: "Productivity and Labor Market",
        indicator: 'Gross Domestic Product billions of U.S. dollars',
        country: '',
        allCountry: true,
        year: '2019',
        ranks: [1, 10]
    })

    const url = "http://searchart.pythonanywhere.com/api/";

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.log('Problem with the fetching data');
            });
    }, []);

    const handleClick = (e, section) => {

        if (section === 'sector') {
            setChoosenData((prevData) => {
                return {
                    ...prevData, [section]: e.target.value,
                    subSector: Object.keys(data.sectors[e.target.value])[0],
                    indicator: data.sectors[e.target.value][Object.keys(data.sectors[e.target.value])[0]][0]
                }
            });
        }
        else if (section === 'subSector') {
            setChoosenData((prevData) => {
                return { ...prevData, [section]: e.target.value, indicator: data.sectors[choosenData.sector][e.target.value][0] }
            });
        }
        else if (section === 'indicator') {
            setChoosenData((prevData) => {
                return { ...prevData, [section]: e.target.value }
            });
        }


    }

    const handleMultiChoice = props => {
        setSelectedCountries(props)
        let countriesInString = props.map((prop) => {
            return prop.label;
        })
        countriesInString = countriesInString.join(';')
        setChoosenData((prevData) => {
            return { ...prevData, country: countriesInString }
        })
    }

    setFilters(choosenData)

    return (
        <div className='flex justify-between gap-2 align-middle mt-2 mb-3 w-full'>



            {/* SECTOR */}

            <div className={classes.filterCard} style={{ width: '12%' }}>
                <span>
                    Sector
                </span>
                <select onChange={(e) => { handleClick(e, 'sector') }} value={choosenData.sector}>
                    {data && data.sectors && Object.keys(data.sectors).map((sector, index) => {
                        return (
                            <option key={index} value={sector}>
                                {sector}
                            </option>
                        )
                    })}
                </select>

            </div>




            {/* Subsector */}

            <div className={classes.filterCard}>
                <span>
                    Subsector
                </span>
                <select onChange={(e) => { handleClick(e, 'subSector') }} value={choosenData.subSector}>
                    {data.sectors && data.sectors[choosenData.sector] && Object.keys(data.sectors[choosenData.sector]).map((subSector, index) => {
                        return (
                            <option key={index} value={subSector}>
                                {subSector}
                            </option>
                        )
                    })}
                </select>

            </div>




            {/* iNDICATOR */}

            <div className={classes.filterCard} style={{ width: '20%' }}>
                <span>
                    Indicator
                </span>
                <select onChange={(e) => { handleClick(e, 'indicator') }} value={choosenData.indicator}>
                    {data.sectors && data.sectors[choosenData.sector][choosenData.subSector]
                        && data.sectors[choosenData.sector][choosenData.subSector].map((indicator, index) => {

                            return (
                                <option key={index} value={indicator}>
                                    {indicator}
                                </option>
                            )
                        })}
                </select>

            </div>






            {/* Country */}


            <div className={classes.filterCard}>
                <span>
                    Country
                </span>
                <CountriesSelect choosenData={choosenData} value={selectedCountries} allSelect={choosenData.allCountry} onChange={handleMultiChoice} />
            </div>




            {/* Year */}
            <div className={classes.filterCard} style={{ width: '7%' }}>
                <span>
                    Year
                </span>
                <Years choosenData={choosenData} onChangeYear={setChoosenData} />

            </div>
            <div className={classes.filterCard} style={{ width: '25%' }}>
                <span>
                    Rank
                </span>

                <RankSlider choosenData={choosenData} setChoosenData={setChoosenData} />
            </div>

        </div>
    )
}

export default Filters