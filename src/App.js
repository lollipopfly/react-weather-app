import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "./components/Card";
import AddCardBtn from "./components/AddCardBtn";
import "./App.css";
import axios from "axios";
import Modal from './components/Modal';
class App extends Component {
	constructor(props) {
		super(props);

		this.getCurrentLocationWeather = this.getCurrentLocationWeather.bind(this);
		this.currentLocationCardAdded = this.currentLocationCardAdded.bind(this);
		this.changeCurrentLocationStatus = this.changeCurrentLocationStatus.bind(this);

		// Sync current location status
		this.changeCurrentLocationStatus();

		let isCurrentLocation = this.props.isCurrentLocationExists;

		if (!isCurrentLocation) {
			// Get location access if current location doesn't exists
			this.getCurrentLocation();
		}
	}

	getCurrentLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.getCurrentLocationWeather);
		} else {
			alert("Geolocation is not supported by this browser.");
		}
	}

	getCurrentLocationWeather(position) {
		let self = this;
		let lat = position.coords.latitude;
		let lon = position.coords.longitude;

		axios
			.get(process.env.REACT_APP_API_URL, {
				params: {
					lat: lat,
					lon: lon,
					units: "metric",
					appid: process.env.REACT_APP_API_KEY
				}
			})
			.then(response => {
				let card = response.data;
				card.isCurrentLocation = true;

				// Save to store
				self.currentLocationCardAdded(card);
			})
			.catch(error => {});
	}

	changeCurrentLocationStatus() {
		let status = false;
		let cards = this.props.cards;

		for (let i in cards) {
			if (cards[i].isCurrentLocation) {
				status = true;
				break;
			}
		}

		this.props.onChangeCurrentLocationStatus(status);
	}

	currentLocationCardAdded(card) {
		this.props.onCurrentLocationCardAdded(card);
	}

	render() {
		return (
			<div>
				<header className="container">
					<div className="row">
						<div className="col-xs-12">
							<span className="logo">My Places</span>
							<AddCardBtn />
						</div>
					</div>
				</header>

				<main className="container">
					<div className="row">
						{this.props.cards.length > 0 ? (
							<div className="city__list">{this.props.cards.map((card, i) => <Card key={i} id={i} card={card} />)}</div>
						) : (
							<div className="empty__message">No cities yet.</div>
						)}
					</div>
				</main>

				<Modal />
			</div>
		);
	}
}

export default connect(
	state => ({
		cards: state.cards.cards,
		isCurrentLocationExists: state.cards.isCurrentLocationExists,
	}),
	dispatch => ({
		onCurrentLocationCardAdded: card => {
			dispatch({ type: "ADD_CURRENT_LOCATION_CARD", payload: card });
		},
		onChangeCurrentLocationStatus: status => {
			dispatch({ type: "CHANGE_CURRENT_LOCATION_EXISTS_STATUS", payload: status });
		},
	})
)(App);
