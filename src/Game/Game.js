import { GAME_SLUG } from "../config";

export const Game = {
	name: `${GAME_SLUG}`,
	setup: ({ numPlayers }) => {
		let deck = [];
		for(let i = 0; i < 27; i ++) {
			deck.push('RED');
		}
		for(let i = 0; i < 27; i ++) {
			deck.push('GREEN');
		}
		for(let i = 0; i < 23; i ++) {
			deck.push('WHITE');
		}
		deck = shuffle(deck);

		let players = [];
		let teams = [];
		for(let i = 0; i < numPlayers; i++) {
			if(i + 1 <= Math.ceil(numPlayers / 2)) {
				teams.push('ALIEN');
			} else {
				teams.push('HUMAN');
			}

		}
		teams = shuffle(teams);
		for(let i = 0; i < numPlayers; i++) {
			players.push({
				name: '',
				hand: [],
				id: `${i}`,
				status: 1,
				team: teams[i]
			});
		}

		return {
			deck: deck,
			players: players,
			turnLog: [{
				action: 'start'
			}]
		}
	},
	turn: {
		moveLimit: 1
	},
	moves: {
		drawCard: (G, ctx, id) => {
			let card = G.deck.pop();
			G.players[ctx.currentPlayer].hand.push(card);
			G.turnLog.push({ action: 'draw', player: ctx.currentPlayer });
		},
		changeNames: (G, ctx, playerList) => {
			for (let i = 0; i < playerList.length; i++) {
				G.players[i].name = playerList[i].name;
			}
		},
		attackLocation: (G, ctx, playerList) => {
			G.turnLog.push({ action: 'attack', player: ctx.currentPlayer });
		},
		declareEscape: (G, ctx) => {
			G.turnLog.push({ action: 'escape', player: ctx.currentPlayer });
		},
		declareDead: (G, ctx) => {
			G.players[ctx.currentPlayer].status = 0;
			G.turnLog.push({ action: 'die', player: ctx.currentPlayer });
		}
	},
	order: {
		first: (G, ctx) => 0,
		// skip over players who are out
		next: (G, ctx) => {
			for (let i = 1; i <= G.numPlayers; i++) {
				const nextIndex = (ctx.playOrderPos + i) % G.numPlayers;
				const nextPlayer = ctx.playOrder[nextIndex];
				if (G.players[nextPlayer].status === 1) {
					return nextIndex;
				}
			}
		}
	},
};

const shuffle = (arr) => {
	for (let i = arr.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
};
