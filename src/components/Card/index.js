import * as React from 'react';
import './Card.css';

class Card extends React.Component {
	render() {
		return (
			<div className="city__list__item">
				<div className="city__list__item__inner">
					<div className="city__list__item__top">
						<div className="city__list__item__name">Washington</div>
						<div className="city__list__item__icon"></div>
					</div>

					<div className="city__list__item__bottom">
						<div className="city__list__item__degree__outer">
							<div className="city__list__item__degree">38
								<span className="city__list__item__degree__icon"></span>
							</div>
						</div>

						<div className="city__list__item__time">16:37</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Card;
