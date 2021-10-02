import React, { Component } from "react";
import axios from "axios";
import Joke from "./Joke.js";
import "./JokeList.css";
import mainEmoji from "./laughing-emoji.png";

class JokeList extends Component {
	static defaultProps = {
		numOfJokesToGet: 5,
	};

	constructor(props) {
		super(props);
		this.state = {
			jokes: JSON.parse(localStorage.getItem("dadJokes") || "[]"),
			isLoading: false,
		};

		this.alreadySeen = new Set(this.state.jokes.map((j) => j.joke));

		this.fetchJokes = this.fetchJokes.bind(this);
		this.vote = this.vote.bind(this);
	}

	componentDidMount() {
		if (this.state.jokes.length === 0) {
			this.fetchJokes();
		}
	}

	async fetchJokes() {
		try {
			this.setState({
				isLoading: true,
			});

			let fetchedJokes = [];
			while (fetchedJokes.length < this.props.numOfJokesToGet) {
				const config = { headers: { Accept: "application/json" } };
				const res = await axios.get("https://icanhazdadjoke.com/", config);
				const newJoke = res.data;

				if (!this.alreadySeen.has(newJoke.joke)) {
					fetchedJokes.push({ ...newJoke, votes: 0 });
				} else {
					console.log("Already saw this joke!");
					console.log(newJoke.joke);
				}
			}

			this.setState(
				(prevState) => ({
					jokes: [...prevState.jokes, ...fetchedJokes],
					isLoading: false,
				}),
				() => localStorage.setItem("dadJokes", JSON.stringify(this.state.jokes))
			);
		} catch (err) {
			console.log(err);
		}
	}

	vote(id, delta) {
		this.setState(
			(prevState) => ({
				jokes: prevState.jokes.map((j) =>
					j.id === id ? { ...j, votes: j.votes + delta } : j
				),
			}),
			() => {
				localStorage.setItem("dadJokes", JSON.stringify(this.state.jokes));
			}
		);
	}

	render() {
		const loader = (
			<div className="JokeList__loader">
				<i className="far fa-5x fa-laugh fa-spin" />
				<h1>Loading...</h1>
			</div>
		);

		const jokes = this.state.jokes
			// Sort jokes in descending order of votes
			.sort((a, b) => b.votes - a.votes)
			.map((j) => (
				<Joke
					key={j.id}
					id={j.id}
					votes={j.votes}
					joke={j.joke}
					upVote={this.vote}
					downVote={this.vote}
				/>
			));

		return (
			<main className="JokeList">
				<div className="JokeList__sidebar">
					<h1 className="JokeList__title">
						Dad <span>Jokes</span>
					</h1>
					<img
						className="JokeList__main-emoji"
						src={mainEmoji}
						alt="Main Emoji"
					/>
					<button
						className="JokeList__more-jokes-btn"
						type="button"
						onClick={this.fetchJokes}
					>
						Fetch More Jokes
					</button>
				</div>

				<div className="JokeList__jokes-container">
					{this.state.isLoading ? loader : jokes}
				</div>
			</main>
		);
	}
}

export default JokeList;
