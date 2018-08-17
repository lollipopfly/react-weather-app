import * as React from "react";
import "./AddCardBtn.css";
import { connect } from "react-redux";

class AddCardBtn extends React.Component {
	showModal() {
		this.props.onToggleModal();
	}

	render() {
		return (
			<button className="add__card__btn" onClick={this.showModal.bind(this)}>
				+
			</button>
		);
	}
}

export default connect(
	state => ({}),
	dispatch => ({
		onToggleModal: () => {
			dispatch({ type: "TOGGLE_MODAL" });
		}
	})
)(AddCardBtn);
