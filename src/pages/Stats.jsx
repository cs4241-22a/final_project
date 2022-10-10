import React, {useState} from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
// import * as d3 from 'd3'
// import * as d3Collection from 'd3-collection'

ChartJS.register(ArcElement, Tooltip, Legend)

export const stockfish_data = {
  labels: ['Wins', 'Losses', 'Draws'],
  datasets: [
    {
      label: '# of Games',
      data: [200, 50, 25],
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
      ],
      borderWidth: 2,
    },
  ],
}

export const leela_data = {
  labels: ['Wins', 'Losses', 'Draws'],
  datasets: [
    {
      label: '# of Games',
      data: [100, 100, 75],
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
      ],
      borderWidth: 2,
    },
  ],
}
export const komodo_data = {
  labels: ['Wins', 'Losses', 'Draws'],
  datasets: [
    {
      label: '# of Games',
      data: [150, 105, 20],
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
      ],
      borderWidth: 2,
    },
  ],
}

const Stats = () => {
  const [data, setData] = useState(stockfish_data)
  function changeto(dataset) {
    let pie = document.getElementById('piechart')
    if (dataset === 'stockfish') {
      setData(stockfish_data)
    }
    if (dataset === 'leela') {
      setData(leela_data)
    }
    if (dataset === 'komodo') {
      setData(komodo_data)
    }
  }
  let container = document.getElementById('piecontainer')
  //container.style += "width:50%;"
  return (
    <div>
      <h1>Stats for "user"</h1>
      <p>Gather stats from games played</p>
      <button
        onClick={function (e) {
          changeto('stockfish')
        }}
      >
        Stockfish
      </button>
      <button
        onClick={function (e) {
          changeto('leela')
        }}
      >
        Leela
      </button>
      <button
        onClick={function (e) {
          changeto('komodo')
        }}
      >
        Komodo
      </button>
      <div id="piecontainer">
        <Pie 
          id="piechart" 
          data={data}
          options={{ maintainAspectRatio: false }}
        />
      </div>
      {/*<p>Pie chart for all games, wins/loss/draws</p>
      <p>Pie chart for games vs Stockfish, wins/loss/draws</p>
      <p>Pie chart for games vs Leela, wins/loss/draws</p>
      <p>Pie chart for games vs Komodo, wins/loss/draws</p>
      <p>Maybe some cool opening data since we are saving the PGNs of games</p>*/}
    </div>
  )
}

export default Stats