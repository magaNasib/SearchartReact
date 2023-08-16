import React, { useRef } from 'react'
import * as d3 from "d3";
import { useD3 } from '../../Hooks/useD3';
import './Amountchart.css'
function AmountD3({ data, countries }) {
  const tooltipRef = useRef(null)
  const ref = useD3(
    (svg) => {

      svg.select('.plot-area').selectAll("*").remove();
      svg.selectAll('.axis-grid').remove();
      const height = 200;
      const width = 450;
      const margin = { top: 20, right: 10, bottom: 30, left: 40 };


      var myColor = d3.scaleOrdinal()
        .domain(countries ? countries.split(';') : [])
        .range(d3.schemeSet2)

      const x = d3
        .scaleBand()
        .domain(d3.range(data.year1, data.year2))
        .rangeRound([margin.left, width - margin.right])
        .padding(.1)

      const y1 = d3
        .scaleLinear()
        .domain([data.min_amount - 1, data.max_amount + 1])
        .rangeRound([height - margin.bottom, margin.top]);


      const yAxisGridAmount = d3.axisLeft(y1).tickSize(-width / 1.23).tickFormat('').ticks(4);


      const xAxis = (g) => {
        g.attr("transform", `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom(x)
            .tickValues(
              d3
                .ticks(...d3.extent(x.domain()), width / 60)
                .filter((v) => x(v) !== undefined)
            )
            .tickSizeOuter(0)
          ).call((g) => g.select(".domain").remove());
        // g.call((g) => g.select("line").remove())
      }

      // .call((g) => g.select("line").style('color','transparent'))
      const y1Axis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .style("color", "white")
          .call(d3.axisLeft(y1).ticks(4, "s"))
          .call((g) => g.select(".domain").remove())
          .call((g) =>
            g
              .append("text")
              .attr("x", -margin.left)
              .attr("y", 10)
              .attr("fill", "currentColor")
              .attr("text-anchor", "start")
              .text(data.y1)
          );

      svg.select(".x-axis").call(xAxis);
      svg.select(".y-axis").call(y1Axis);
      svg.select('.plot-area').append('g')
        .attr('class', 'y axis-grid amount')
        .attr('transform', 'translate(0,0)')
        .attr('stroke-width', '0')
        .call(yAxisGridAmount);
      data
        && data.countries_data
        && data.countries_data.map((eachCountry, index) => {
          let eachCountryData = eachCountry.country;
          let currentColor = '';


          svg.select(".plot-area").append('path')
            .attr("class", "newclass")
            .datum(eachCountryData)
            .transition()
            .duration(1000)
            .attr('d', d3.line()
              .x(function (d) {
                return x(d.Year)
              })
              .y(function (d) {
                return y1(+d.Amount)
              })
            )
            .attr('stroke', function (d) {
              currentColor = myColor(countries[index]);

              return currentColor;
            })
            .style("stroke-width", 2)
            .style("fill", "none")
            .style("cursor", "pointer")
       


          svg.select('.plot-area').append("g")
            .selectAll(".symbol")
            .data(eachCountryData)
            .enter()
            .append("circle")
            .attr("cx", d => x(+d.Year))
            .attr("cy", d => y1(+d.Amount))
            .attr("r", 5)
            .attr("class", 'pointer')
            .style('opacity', '0')
            .style("cursor", "pointer")
            .attr("fill", currentColor)
            .on("mouseover", (event, d) => {
              // Show the tooltip on mouseover
              const tooltip = tooltipRef.current
              event.target.style = 'opacity:1'
              tooltip.style.display = "block";
              tooltip.style.color = "black";
              console.log(event);
              tooltip.style.left = event.screenX -70+ "px";
              tooltip.style.top = event.pageY -40 + "px";
              tooltip.innerHTML = `<p>Country:${d.Country}</p><p> Year: ${d.Year}</p><p> Amount: ${d.Amount}</p>`;
              // console.log(`Country:${d.country} Date: ${d.Year} Value: ${d.Rank}` );
            })
            .on("mouseout", (event) => {
              // Hide the tooltip on mouseout
              event.target.style = 'opacity:0'

              const tooltip = tooltipRef.current
              tooltip.style.display = "none";
            });

        })



    },
    [data]
  );
  return (
    <div>
      <div ref={tooltipRef} className="hidden fixed pointer-events-none  border-gray-700 dark:bg-chartCardHeader border-2 p-2 text-sm z-40 bg-gray-100 rounded-2xl"></div>

      <svg
        ref={ref}
        style={{
          height: 190,
          width: '31.5rem',
          marginRight: "0px",
          marginLeft: "0px",
          overflow: 'auto'
        }}
      >
        <g className="plot-area" style={{
          width: "100%", overflow: 'auto'
        }} />
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  )
}

export default AmountD3