import React, { Component } from "react";
import Card from "./components/Card";
import AddCardBtn from "./components/AddCardBtn";
import "./App.css";

class App extends Component {
	render() {
		return (
			<div>
				<header>
					<span className="logo">My Places</span>
				</header>

				<main>
					<div className="main__inner">
						<div className="city__list">
							<Card />
							<Card />
							<Card />
							<Card />
							<Card />
							<Card />
							<Card />
						</div>
					</div>
				</main>

				<footer>
					<AddCardBtn />
				</footer>
			</div>
		);
	}
}

export default App;
