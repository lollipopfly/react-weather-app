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
		this.handleSubmit = this.handleSubmit.bind(this);
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

	handleSubmit(e) {
		e.preventDefault();

		if (this.state.city) {
			this.getCityWeather(this.state.city.latitude, this.state.city.longitude);
		} else {
			this.throwInputError();
		}
	}

	getCityWeather(lat, lon) {
		let self = this;
		let preloader = document.querySelector(".lds-dual-ring");
		preloader.classList.add("active");

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
				card.isCurrentLocation = false;

				// Save to store
				self.props.onlocationCardAdded(card);

				// Hide modal
				this.hideModal();
			})
			.catch(error => {
				preloader.classList.remove("active");
			});
	}

	onInputChange(e) {
		let input = document.querySelector(".custom__modal__typeahead");

		// TODO: use e.currentTarget - best practice (need to save it)
		if (e.target.value && input.classList.contains("error")) {
			this.removeInputError();
		}
	}

	clearInput() {
		let input = document.querySelector(".custom__modal__typeahead");
		let list = document.querySelector(".custom__modal .tp-ac__list");

		this.setState({ city: null }, () => {
			input.value = "";
			list.innerHTML = "";
		});
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
					<form onSubmit={this.handleSubmit}>
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
								<input type="submit" className="custom__modal__btn" value="Choose" />
								<div className="lds-dual-ring" />
							</div>
						</div>
					</form>
				</div>
			</Rodal>
		);
	}
}

export default connect(
	state => ({
		cards: state.cards.items,
		toggleModal: state.modal.status
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
