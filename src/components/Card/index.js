import * as React from "react";
import tzlookup from "tz-lookup";
import "./Card.css";
import "weather-icons/css/weather-icons.css";
import { DataSet } from "../../helpers/weather";
import moment from "moment-timezone";

class Card extends React.Component {
	constructor(props) {
		super(props);

		let iconKey = this.props.card.weather[0].icon;
		let date = new Date();
		let tz = tzlookup(this.props.card.coord.lat, this.props.card.coord.lon);
		let mt = moment(date);
		let time = mt.tz(tz).format("HH:mm");

		this.state = {
			time: time,
			icon: DataSet[iconKey].class,
			colorClass: DataSet[iconKey].colorClass,
			name: this.props.card.name,
			temp: this.props.card.main.temp,
			windPeed: this.props.card.wind.speed + "m/s"
		};
	}

	render() {
		return (
			<div className="city__list__item">
				<div className={"city__list__item__inner " + this.state.colorClass}>
					<div className="city__list__item__top">
						<div className="city__list__item__name">{this.state.name}</div>
						<i className={"city__list__item__icon wi " + this.state.icon} />
					</div>

					<div className="city__list__item__bottom">
						<div className="city__list__item__degree__outer">
							<div className="city__list__item__degree">
								{this.state.temp}
								<span className="city__list__item__degree__icon" />
							</div>
							<div className="city__list__item__wind">
								<i className="wi wi-strong-wind" />
								{this.state.windPeed}
							</div>
						</div>

						<div className="city__list__item__time">{this.state.time}</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Card;
