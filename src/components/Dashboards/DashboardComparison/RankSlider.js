import React, { useEffect, useState } from 'react';
import Slider from 'react-slider';
import './RankSlider.css'
const PriceSlider = ({ choosenData, setChoosenData }) => {

    const url = `http://searchart.pythonanywhere.com/api/ranks/?indicator=${choosenData.indicator}&year=${choosenData.year}`;
    const [data, setData] = useState([])

    useEffect(() => {
        async function getRankRange() {
            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    setData(data);
                })
                .catch(error => {
                    console.log('Problem with the fetching data');
                });
        }
        getRankRange()
    }, [choosenData]);

    const values = choosenData.ranks
    const handleChange = (newValues) => setChoosenData((prevData) => { return { ...prevData, ranks: newValues } });

    return (
        <div className='RankSlider'>
            <input
                type="text"
                id="minPrice"
                value={values[0]}
                onChange={(e) => {

                    handleChange([+e.target.value, values[1]])
                }}
            />

            <div style={{ width: '100%', padding: '0 1rem' }}>
                <Slider
                    className="slider"
                    value={values}
                    onChange={handleChange}
                    min={data.min_rank}
                    max={data.max_rank}
                />
            </div>
            <input
                type="text"
                id="maxPrice"
                value={values[1]}
                onChange={(e) => {
                    handleChange([values[0], +e.target.value])
                }}
            />
        </div>
    );
};

export default PriceSlider;