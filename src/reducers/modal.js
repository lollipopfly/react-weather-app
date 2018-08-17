let initialState = {
	toggleModal: false
};

export default function modal(state = initialState, action) {
	switch (action.type) {
		case "TOGGLE_MODAL":
			return {
				...state,
				toggleModal: !state.toggleModal
			};
		default:
			return state;
	}
}
