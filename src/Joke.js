import React, { Component } from "react";
import "./Joke.css";

class Joke extends Component {
	constructor(props) {
		super(props);

		this.handleUpVote = this.handleUpVote.bind(this);
		this.handleDownVote = this.handleDownVote.bind(this);
	}

	handleUpVote() {
		this.props.upVote(this.props.id, 1);
	}

	handleDownVote() {
		this.props.downVote(this.props.id, -1);
	}

	getColor() {
		if (this.props.votes >= 15) {
			return "#4CAF50";
		} else if (this.props.votes >= 12) {
			return "#8BC34A";
		} else if (this.props.votes >= 9) {
			return "#CDDC39";
		} else if (this.props.votes >= 6) {
			return "#FFEB3B";
		} else if (this.props.votes >= 3) {
			return "#FFC107";
		} else if (this.props.votes >= 0) {
			return "#FF9800";
		} else {
			return "#f44336";
		}
	}

	getEmoji() {
		if (this.props.votes >= 15) {
			return "em em-rolling_on_the_floor_laughing";
		} else if (this.props.votes >= 12) {
			return "em em-laughing";
		} else if (this.props.votes >= 9) {
			return "em em-smiley";
		} else if (this.props.votes >= 6) {
			return "em em-slightly_smiling_face";
		} else if (this.props.votes >= 3) {
			return "em em-neutral_face";
		} else if (this.props.votes >= 0) {
			return "em em-confused";
		} else {
			return "em em-angry";
		}
	}

	render() {
		const { joke, votes } = this.props;

		return (
			<div className="Joke">
				<div className="Joke__vote">
					<button className="Joke__vote-btn up" onClick={this.handleUpVote}>
						<i className="far fa-thumbs-up" />
					</button>
					<span
						className="Joke__votes"
						style={{ borderColor: this.getColor() }}
					>
						{votes}
					</span>
					<button className="Joke__vote-btn down" onClick={this.handleDownVote}>
						<i className="far fa-thumbs-down" />
					</button>
				</div>

				<p className="Joke__text">{joke}</p>

				<div className="Joke__emoji">
					<i className={this.getEmoji()} />
				</div>
			</div>
		);
	}
}

export default Joke;
