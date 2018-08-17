import * as React from "react";
import { connect } from "react-redux";
import axios from "axios";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import "./Modal.css";
import TeleportAutocomplete from "teleport-autocomplete";
import "teleport-autocomplete/dist/teleport-autocomplete.min.css";

class Modal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			city: null
		};

		this.onInputChange = this.onInputChange.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.addCity = this.addCity.bind(this);
	}

	componentDidUpdate() {
		this._input.focus();
	}

	componentDidMount() {
		let self = this;

		// Save city to state
		new TeleportAutocomplete({ el: ".custom__modal__typeahead", maxItems: 5, geoLocate: false }).on("change", value => {
			self.setState({ city: value });
		});
	}

	// Watch for the props
	componentWillReceiveProps(props) {
		if (props.toggleModal) {
			this.clearInput();
		}
	}

	hideModal() {
		let preloader = document.querySelector(".custom__modal .lds-dual-ring");
		preloader.classList.remove("active");

		this.props.onToggleModal();
	}

	addCity() {
		if (this.state.city) {
			this.getCityWeather(this.state.city.latitude, this.state.city.longitude);
		} else {
			this.throwInputError();
		}
	}

	getCityWeather(lat, lon) {
		let self = this;
		let apiKey = "a173498d2790019f6d3cc67d5b5acd0e";
		let apiUrl = "https://api.openweathermap.org/data/2.5/weather";
		let preloader = document.querySelector(".lds-dual-ring");
		preloader.classList.add("active");

		axios
			.get(apiUrl, {
				params: {
					lat: lat,
					lon: lon,
					units: "numeric",
					appid: apiKey
				}
			})
			.then(response => {
				let card = response.data;
				card.isCurrentLocation = false;

				// Save to store
				self.locationCardAdded(card);

				// Hide modal
				this.hideModal();
			})
			.catch(error => {
				preloader.classList.remove("active");
			});
	}

	locationCardAdded(card) {
		this.props.onlocationCardAdded(card);
	}

	onInputChange(e) {
		let input = document.querySelector(".custom__modal__typeahead");

		if (e.target.value && input.classList.contains("error")) {
			this.removeInputError();
		}
	}

	clearInput() {
		let input = document.querySelector(".custom__modal__typeahead");
		let list = document.querySelector(".custom__modal .tp-ac__list");

		setTimeout(function() {
			input.value = "";
			list.innerHTML = "";
		}, 20);
	}

	throwInputError() {
		let input = document.querySelector(".custom__modal__typeahead");
		input.classList.add("error");
	}

	removeInputError() {
		let input = document.querySelector(".custom__modal__typeahead");
		input.classList.remove("error");
	}

	render() {
		return (
			<Rodal visible={this.props.toggleModal} onClose={this.hideModal} animation="slideDown" className="custom__modal">
				<div>
					<h3>Choose location</h3>
					<div className="custom__modal__typeahead__block">
						<input
							type="text"
							autoFocus="true"
							onChange={this.onInputChange}
							ref={c => (this._input = c)}
							className="custom__modal__typeahead"
						/>
					</div>

					<div className="text-center">
						<div className="custom__modal__btn__block">
							<button type="button" className="custom__modal__btn" onClick={this.addCity}>
								Choose
							</button>
							<div className="lds-dual-ring" />
						</div>
					</div>
				</div>
			</Rodal>
		);
	}
}

export default connect(
	state => ({
		cards: state.cards,
		toggleModal: state.toggleModal
	}),
	dispatch => ({
		onToggleModal: () => {
			dispatch({ type: "TOGGLE_MODAL" });
		},
		onlocationCardAdded: card => {
			dispatch({ type: "ADD_CARD", payload: card });
		}
	})
)(Modal);
