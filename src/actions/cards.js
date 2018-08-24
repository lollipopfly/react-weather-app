import axios from "axios";

export const getCards = () => (dispatch) => {
	let cards = JSON.parse(localStorage.getItem("cards"));
	let cardIds = getCardsIds(cards);
	let currentLocationId = getCurrentLocationId(cards);

	if (cardIds) {
		axios
			.get(process.env.REACT_APP_API_GROUP_URL, {
				params: {
					id: cardIds,
					units: "metric",
					appid: process.env.REACT_APP_API_KEY
				}
			})
			.then(response => {
				let cards = response.data.list;

				cards.map((item, i) => {
					if(currentLocationId === item.id) {
						item.isCurrentLocation = true;
					}

					return item;
				});

				dispatch({ type: "FETCH_CARDS", payload: cards, currentLocationId: currentLocationId});
			})
			.catch(error => {
				dispatch({ type: "FETCH_CARDS", payload: [], currentLocationId: null });
			});
	} else {
		dispatch({ type: "FETCH_CARDS", payload: [], currentLocationId: null });
	}
};

function getCurrentLocationId(cards) {
	let id = false;

	for (let i in cards) {
		if (cards[i].isCurrentLocation) {
			id = cards[i].id;
			break;
		}
	}

	return id;
}

function getCardsIds(cards) {
	let ids = [];

	if (cards) {
		for (let key in cards) {
			let card = cards[key];

			ids.push(card.id);
		}

		ids = ids.join(",");
	}

	return ids;
}
