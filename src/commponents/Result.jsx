import { Container } from "@mui/material";
import WebSocket from "./WebSocket";
import { useNavigate, useLocation } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    } from "chart.js";

    ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
    );

	export const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
			position: "top",
			},
		},
	};

function Result() {
	const navigate = useNavigate();
	const location = useLocation();

	let playerName1 = "player1"
	let playerName2 = "player2"


	const datasets= location.state

	const hr1 = datasets.heartRate1
	const hr2 = datasets.heartRate2
	console.log(hr1 + " "+ hr2)
	const labels1 = Array.from({ length: hr1.length }, (_, i) => i + 1);
	const labels2 = Array.from({ length: hr2.length }, (_, i) => i + 1);
	console.log(labels1 + " " + labels2)

	
	const data1 = {
		labels: labels1,
		datasets: [
			{
			label: 'heartbeat1',
			data: hr1,
			fill: false,
			borderColor: 'rgb(75, 192, 192)',
			tension: 0.1
		}
	]
	  };

	  const data2 = {
		labels: labels2,
		datasets: [
			{
			label: 'heartbeat1',
			data: hr2,
			fill: false,
			borderColor: 'rgb(75, 192, 192)',
			tension: 0.1
		}
	]
	  };
	

  return (
	<>
    	<button onClick={() => navigate('/')}>button</button>
		<p style={{ paddingTop:"1vh"}}>{playerName1}</p>
		<div style={{ width: "70vw", height: "auto", paddingTop: "3vh"}}>
			<Line data = {data1} options={options}/>
		</div>
		<p style={{ paddingTop:"1vh"}}>{playerName2}</p>
		<div style={{ width: "70vw", height: "auto", paddingTop: "3vh"}}>
			<Line data = {data2} options={options}/>
		</div>
	</>
  );
}

export default Result;
