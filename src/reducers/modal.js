let initialState = {
	status: false
};

export default function modal(state = initialState, action) {
	switch (action.type) {
		case "TOGGLE_MODAL":
			return {
				...state,
				status: !state.status
			};
		default:
			return state;
	}
}
