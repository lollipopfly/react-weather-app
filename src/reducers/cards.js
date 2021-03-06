let initialState = {
	items: [],
	currentCardId: null,
	loading: true,
}

export default function cards(state = initialState, action) {
	switch (action.type) {
		case "FETCH_CARDS":
			localStorage.setItem("cards", JSON.stringify(action.payload));

			return {
				...state,
				items: action.payload,
				currentCardId: action.currentLocationId,
				loading: false,
			}

		case "ADD_CURRENT_LOCATION_CARD":
			let cards = JSON.parse(localStorage.getItem("cards"));

			if (cards.undefined || cards.length === 0) {
				cards = [];
			}

			cards.push(action.payload);

			localStorage.setItem("cards", JSON.stringify(cards));

			return {
				...state,
				items: [...state.items, action.payload],
				currentCardId: action.payload.id
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
				items: [...state.items, action.payload]
			};
		case "REMOVE_CARD":
			let newCards = state.items.filter((item, key) => key !== action.payload);

			localStorage.setItem("cards", JSON.stringify(newCards));

			return {
				...state,
				items: newCards,
			};
		default:
			return state;
	}
}
