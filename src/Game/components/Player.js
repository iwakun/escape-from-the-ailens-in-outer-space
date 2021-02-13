import React from 'react';

const Player = (props) => {
	const { G, playerID, ctx, moves, i } = props;

	const moveSafe = () => {
		moves.moveSafe();
	};
	const moveDangerous = () => {
		moves.moveDangerous();
	};
	const attackLocation = () => {
		moves.attackLocation();
	};
	const declareEscape = () => {
		moves.declareEscape();
	};
	const declareDead = () => {
		moves.declareDead();
	};

	let playerClass = 'player';
	if(ctx.currentPlayer === G.players[i].id) {
		playerClass += ' active';
	}

	let playerTeam = '';
	if(parseInt(playerID) === i) {
		playerTeam = G.players[i].team.toLowerCase();
	}

	return (
		<div className={playerClass} key={G.players[i].id}>
			<h2 className="player-name">
				{G.players[i].name}
				{ parseInt(playerID) === i &&
					<span className="player-info">(You)</span>
				}
			</h2>
			{ parseInt(playerID) === i &&
				<h3 className={ playerTeam }>
					{G.players[i].team}
				</h3>
			}
			{ (
				parseInt(playerID) === i &&
				G.players[playerID].status === 1 &&
				ctx.currentPlayer === playerID
			) &&
				<div className="player-actions">
					<button onClick={moveSafe}>
						Move (safe sector)
					</button>
					<button onClick={moveDangerous}>
						Move (dangerous sector)
					</button>
					{ (G.players[playerID].team === 'ALIEN')
						?
							<button onClick={attackLocation}>
								Attack
							</button>
						:
							<button onClick={declareEscape}>
								Escape
							</button>
					}
					<button onClick={declareDead}>
						Die
					</button>

				</div>
			}
		</div>
	);
}

export default Player;
