import React, { useEffect } from 'react';
import Player from './components/Player';
import Message from './components/Message';

const Board = (props) => {
	useEffect(() => {
		if (props.playerID === "0") {
			props.moves.changeNames(props.gameMetadata);
		}
	}, [props.playerID, props.moves, props.gameMetadata]);

	let players = [];
	for(let i = 0; i < props.ctx.numPlayers; i++) {
		players.push(
			<Player {...props} i={i} key={i} />
		);
	}

	return (
		<div className="game-container">
			<Message {...props} />
			<div className="players">
				{players}
			</div>
		</div>
	);
};


export default Board;
