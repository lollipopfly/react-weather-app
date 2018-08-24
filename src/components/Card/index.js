import * as React from "react";
import { connect } from "react-redux";
import tzlookup from "tz-lookup";
import moment from "moment-timezone";

import { DataSet } from "../../helpers/weather";
import "./Card.css";
import "weather-icons/css/weather-icons.css";

class Card extends React.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);

		let iconKey = this.props.card.weather[0].icon;
		let date = new Date();
		let tz = tzlookup(this.props.card.coord.lat, this.props.card.coord.lon);
		let mt = moment(date);
		let time = mt.tz(tz).format("HH:mm");

		this.props.card.colorClass = DataSet[iconKey].colorClass;
		this.props.card.time = time;
		this.props.card.icon = DataSet[iconKey].class;
	}

	handleClick() {
		this.props.onRemoveCard(this.props.id);
	}

	render() {
		return (
			<div className="city__list__item col-md-4 col-xs-6">
				<div className={"city__list__item__inner " + this.props.card.colorClass}>

					<button className="city__list__item__close" onClick={this.handleClick} />

					<div className="city__list__item__top">
						<div className="city__list__item__name">{this.props.card.name}
							{this.props.card.isCurrentLocation ? (
								<i className="wi wi-alien city__list__item__current__loc__icon" title="Current location" />
							) : null}
						</div>
						<i className={"city__list__item__icon wi " + this.props.card.icon} />
					</div>

					<div className="city__list__item__bottom">
						<div className="city__list__item__degree__outer">
							<div className="city__list__item__degree">
								{this.props.card.main.temp}
								<span className="city__list__item__degree__icon" />
							</div>
							<div className="city__list__item__wind">
								<i className="wi wi-strong-wind" />
								{this.props.card.wind.speed + " m/s"}
							</div>
						</div>

						<div className="city__list__item__time">{this.props.card.time}</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	state => ({}),
	dispatch => ({
		onRemoveCard: id => {
			dispatch({ type: "REMOVE_CARD", payload: id });
		}
	})
)(Card);
