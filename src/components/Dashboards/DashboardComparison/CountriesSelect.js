
import React, { useRef, useEffect, useState } from "react";
import Select from "react-select";
import './CountriesSelect.css'

const CountriesSelect = props => {

    const url = `https://searchart.pythonanywhere.com/api/countries-data/${props.choosenData.indicator}/`;
    const [data, setData] = useState([]);

    let allCountries = [{ label: '', value: '' }]

    useEffect(() => {

        async function fetchData() {
            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    setData(data);
                })
                .catch(error => {
                    console.log('Problem with the fetching data');
                });


        }
        fetchData()
    }, [props.choosenData]);

    allCountries = data.countries ? data.countries.map((country, index) => {

        return {
            value: index,
            label: country
        }
    }) : [{ label: '', value: '' }]


    // isOptionSelected sees previous props.value after onChange
    const valueRef = useRef(props.value);
    valueRef.current = props.value;
    const [isAllCountry, setIsAllCountry] = useState(true)
    const selectAllOption = {
        value: "<SELECT_ALL>",
        label: "All Countries"
    };

    const isSelectAllSelected = () =>
        isAllCountry || (valueRef.current.length === allCountries.length)


    useEffect(() => {
        props.onChange(allCountries, {
            "action": "select-option",
            "option": selectAllOption
        })
    }, [allCountries.length])


    const isOptionSelected = option =>
        valueRef.current.some(({ value }) => value === option.value) ||
        isSelectAllSelected();

    const getOptions = () => [selectAllOption, ...allCountries];

    const getValue = () =>
        isSelectAllSelected() ? [selectAllOption] : props.value;

    const onChange = (newValue, actionMeta) => {
        const { action, option, removedValue } = actionMeta;
        setIsAllCountry(false)
        if (action === "select-option" && option.value === selectAllOption.value) {
            props.onChange(allCountries, actionMeta);
        } else if (
            (action === "deselect-option" &&
                option.value === selectAllOption.value) ||
            (action === "remove-value" &&
                removedValue.value === selectAllOption.value)
        ) {
            props.onChange([], actionMeta);
        } else if (
            actionMeta.action === "deselect-option" &&
            isSelectAllSelected()
        ) {
            props.onChange(
                allCountries.filter(({ value }) => value !== option.value),
                actionMeta
            );
        } else {
            props.onChange(newValue || [], actionMeta);
        }
    };
    const valueContainerStyles = "dark:bg-[#293F64] dark:border-[#4A628A] h-full dark:text-[#A7B4CA] text-[#000]";


    return (
        <Select
            isOptionSelected={isOptionSelected}
            options={getOptions()}
            value={getValue()}
            onChange={onChange}
            hideSelectedOptions={false}
            closeMenuOnSelect={false}
            className="react-select-container bg-red"
            isMulti
            classNames={{
                control: () => "border-none",
                valueContainer: () => valueContainerStyles,
                multiValue: () => 'dark:text-[#000]',
              }}
        />
    );
};
export default CountriesSelect