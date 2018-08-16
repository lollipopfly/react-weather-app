let storageCards = JSON.parse(localStorage.getItem("cards"));

let initialState = {
	cards: storageCards ? storageCards : [],
	isCurrentLocationExists: false
};

export default function reducer(state = initialState, action) {
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
			return {
				...state,
				cards: [...state.cards, action.payload]
			};
		case "CHANGE_CURRENT_LOCATION_EXISTS_STATUS":
			return {
				...state,
				isCurrentLocationExists: action.payload
			};
		default:
			return state;
	}
}
