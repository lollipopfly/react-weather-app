import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "./components/Card";
import AddCardBtn from "./components/AddCardBtn";
import { getCards } from "./actions/cards";
import "./App.css";
import axios from "axios";
import Modal from "./components/Modal";

class App extends Component {
	constructor(props) {
		super(props);

		let self = this;

		this.getCurrentLocationWeather = this.getCurrentLocationWeather.bind(this);
		this.currentLocationCardAdded = this.currentLocationCardAdded.bind(this);

		// Check Geolocation
		navigator.permissions.query({ name: "geolocation" }).then(function(result) {
			if (result.state === "prompt") {
				self.getCurrentLocation();
			}
		});
	}

	componentDidMount() {
		// Fetch data
		this.props.onGetCards();
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
			.get(process.env.REACT_APP_API_WEATHER_URL, {
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
						) : null}

						{!this.props.loading && this.props.cards.length === 0 ? (
							<div className="empty__message">No cities yet.</div>
						) : null}
						{this.props.loading ? <div className="lds-dual-ring cards__preloader"></div> : null}
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
		loading: state.cards.loading
	}),
	dispatch => ({
		onGetCards: () => {
			dispatch(getCards());
		},
		onCurrentLocationCardAdded: card => {
			dispatch({ type: "ADD_CURRENT_LOCATION_CARD", payload: card });
		}
	})
)(App);
