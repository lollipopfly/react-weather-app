import React, { Component } from "react";
import Card from "./components/Card";
import AddCardBtn from "./components/AddCardBtn";
import "./App.css";
import axios from "axios";

class App extends Component {
	constructor(props) {
		super(props);

		this.getLocation();
	}

	getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.getWeather);
		} else {
			console.log("Geolocation is not supported by this browser.");
		}
	}

	getWeather(position) {
		let lat = position.coords.latitude;
		let lon = position.coords.longitude;

		let apiKey = "a173498d2790019f6d3cc67d5b5acd0e";
		let apiUrl =
			"https://api.openweathermap.org/data/2.5/weather?lat=" +
			lat +
			"&lon=" +
			lon +
			"&appid=" +
			apiKey;

		axios
			.get(apiUrl)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {

			});
	}

	render() {
		return (
			<div>
				<header>
					<span className="logo">My Places</span>
				</header>

				<main>
					<div className="main__inner">
						<div className="city__list">
							<Card />
							<Card />
							<Card />
							<Card />
							<Card />
							<Card />
							<Card />
						</div>
					</div>
				</main>

				<footer>
					<AddCardBtn />
				</footer>
			</div>
		);
	}
}

export default App;
