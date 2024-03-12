import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import * as d3 from 'd3';
import "./ResultsPage.css"

export default function ResultsPage() {
  const [results, setResults] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [range, setRange] = useState([])

  const fetchResults = async () => {
    await getDocs(collection(db, "results")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      const visResults = new Map()

      let csvData = "data:text/csv;charset=utf-8,"
      csvData += "type,correct,user_answer,difference,error\r\n"


      //parse results 
      for (let trial of newData) {
        for (let field in trial) {
          const vis = trial[field]

          if (visResults.has(vis.type)) {
            const curr = visResults.get(vis.type)
            curr.push(vis.error)
          } else {
            visResults.set(vis.type, [vis.error])
          }

          let currRow = "";
          currRow += vis.type + ",";
          currRow += vis.correct + ",";
          currRow += vis.user_answer + ",";
          currRow += vis.difference + ",";
          currRow += vis.error + "\r\n";
          csvData += currRow;
        }
      }
      setRawData(encodeURI(csvData))

      const resultsMap = new Map()
      let min = 99999
      let max = -1
      for (const key of visResults.keys()) {
        const errors = visResults.get(key);
        const n = errors.length
        const mean = errors.reduce((a, b) => a + b) / n
        const stdDev = Math.sqrt(errors.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
        resultsMap.set(key, [mean, stdDev])

        //get range for plot
        min = Math.min(mean - (2.5 * stdDev), min)
        max = Math.max(mean + (2.5 * stdDev), max)
      }
      setResults(resultsMap);
      setRange([max, min])
    });
  };

  useEffect(() => {
    fetchResults();
  }, []);


  useEffect(() => {
    d3.select('svg').remove()

    if (results.size === 0) {
      return
    }

    var margin = { top: 10, right: 30, bottom: 30, left: 40 },
      width = 800 - margin.left - margin.right,
      height = 200 - margin.top - margin.bottom;
    //    const svg = d3.select("svg")
    var svg = d3.select("#vis")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
    let center = 50;

    const y = d3.scaleLinear()
      .domain(range)
      .range([width, 0]);
    svg.call(d3.axisBottom(y))


    for (const key of results.keys()) {
      const data = results.get(key)
      const mean = data[0]
      const min = mean - (2 * data[1])
      const max = mean + (2 * data[1])

      svg.append("line")
        .attr("x1", y(min))
        .attr("x2", y(max))
        .attr("y1", center)
        .attr("y2", center)
        .attr("stroke", "black")

      svg.selectAll('n')
        .data([min, max])
        .enter()
        .append('line')
        .attr("y1", center - 10)
        .attr("y2", center + 10)
        .attr("x1", function(d) { return y(d) })
        .attr("x2", function(d) { return y(d) })
        .attr("stroke", "black")

      svg
        .append('circle')
        .attr("cy", center)
        .attr("cx", y(mean))
        .attr("r", 3)
        .attr("stroke", "black")
        .attr('fill', 'black')


      const textCenter = (min + mean) / 2
      svg.append('text')
        .attr("x", y(textCenter))
        .attr("y", center - 10)
        .text(key)
        .style("font-size", "10px")
        .style("fill", "black")

      center += 50
    }
  }, [results, range])

  return (
    <div>
      <h2>
        <br />
        <br />
        Thank you for participating!
      </h2>
      <p>
        Below are the current results for our experiment:
      </p>
      <p>
        The following graph shows a 95% confidence interval of participant accuracy.
      </p>
      <p>
        Accuracy is calculated with the equation: log<sub>2</sub>( | judged percent - true percent | + 1/8)
      </p>
      {
        results.size === 0 ? <div><p style={{ color: "red" }}><br /><br />[no results recorded yet]</p></div> : null
      }
      <div id="vis">
      </div>
      {
        results.size === 0 ? null : <a id="download" download="raw_data.csv" href={rawData}>Download Raw Data</a>
      }
    </div>
  );
}
