import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GameClient } from '../../Game/GameClient';
import { api } from "../../LobbyAPI";

const Room = (props) => {
	const { history } = props;
	const { id } = useParams();
	const [players, setPlayers] = useState([]);
	const [show, setShow] = useState(false);

	// check for newly joined players by comparing against the two players
	// array (front-end and the api, and api is always slightly ahead)
	useEffect(() => {
		const interval = setInterval(() => {
			api.getPlayers(id).then(
				(players) => {
					setPlayers(players);
					// only current players have a name field
					const currPlayers = players.filter((player) => player.name);
					if (currPlayers.length === players.length) {
						setShow(true); // everyone has joined, show them the board
					}
				},
				() => {
					// failed to join because room doesn't exist -> return user to homepage
					history.push("", { invalidRoom: true });
				}
			);
		}, 500);
		if (show) {
			clearInterval(interval);
		}
		return () => {
			clearInterval(interval);
		};
	}, [show, players.length, id, history]);

	const leaveRoom = () => {
		api
			.leaveRoom(id, localStorage.getItem("id"), localStorage.getItem("credentials"))
			.then(() => {
				history.push("/");
			});
	};

	if (show) {
		return (
			<GameClient
				gameID={id}
				numPlayers={players.length}
				playerID={localStorage.getItem("id")}
				credentials={localStorage.getItem("credentials")}
			/>
		);
	} else {
		return (
			<div className="lobby-container">
				<h1>Escape from the Aliens in Outer Space</h1>
				<div className="lobby-forms">
					<div className="lobby-form">
						<h2>Room ID: {id}</h2>
						<div className="lobby-players-list">
							{players.map((player) => {
								if (player.name) {
									return player.name + `${player.name === localStorage.getItem("name") ? " (You)" : ""}\n`;
								} else {
									return "...\n";
								}
							})}
						</div>
						<div className="lobby-room-info">
							Game will begin once all
							{players.length === 0 ? "" : ` ${players.length}`} players have joined.
						</div>
						<button onClick={leaveRoom}>
							Leave
						</button>
					</div>
				</div>
			</div>
		);
	}
};

export default Room;
