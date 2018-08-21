let storageCards = JSON.parse(localStorage.getItem("cards"));

let initialState = {
	cards: storageCards ? storageCards : [],
	isCurrentLocationExists: false,
};

export default function cards(state = initialState, action) {
	switch (action.type) {
		case "ADD_CURRENT_LOCATION_CARD":
			let cards = JSON.parse(localStorage.getItem("cards"));

			if (!cards) {
				cards = [];
				cards.push(action.payload);
			}

			localStorage.setItem("cards", JSON.stringify(cards));

			return {
				...state,
				isCurrentLocationExists: true,
				cards: [...state.cards, action.payload]
			};
		case "ADD_CARD":
			let cardsList = JSON.parse(localStorage.getItem("cards"));

			if (!cardsList) {
				cardsList = [];
			}
			cardsList.push(action.payload);

			localStorage.setItem("cards", JSON.stringify(cardsList));

			return {
				...state,
				cards: [...state.cards, action.payload]
			};
		case "REMOVE_CARD":
			let newCards = state.cards.filter((item, key) => key !== action.payload);

			localStorage.setItem("cards", JSON.stringify(newCards));

			return {
				...state,
				cards: newCards
			}
		case "CHANGE_CURRENT_LOCATION_EXISTS_STATUS":
			return {
				...state,
				isCurrentLocationExists: action.payload
			};
		default:
			return state;
	}
}
