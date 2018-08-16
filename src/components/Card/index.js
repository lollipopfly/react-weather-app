import * as React from "react";
import "./Card.css";

class Card extends React.Component {
	render() {
		return (
			<div className="city__list__item">
				<div className="city__list__item__inner">
					<div className="city__list__item__top">
						<div className="city__list__item__name">{this.props.card.name}</div>
						<div className="city__list__item__icon" />
					</div>

					<div className="city__list__item__bottom">
						<div className="city__list__item__degree__outer">
							<div className="city__list__item__degree">
								{this.props.card.main.temp}
								<span className="city__list__item__degree__icon" />
							</div>
						</div>

						<div className="city__list__item__time">16:37</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Card;
