import React, { useState, useEffect } from 'react';
import imageSectorAlien from '../images/sector-alien.svg';
import imageSectorHuman from '../images/sector-human.svg';
import imageSectorEscape from '../images/sector-escape.svg';

const Message = (props) => {
	const { G, playerID } = props;

	const lastTurn = G.turnLog[G.turnLog.length - 1];
	const [ msg, setMsg ] = useState('');

	useEffect(() => {
		let m = '';

		console.log(lastTurn);
		if(lastTurn.action === 'start') {
			let team = G.players[playerID].team;
			if(team === 'ALIEN') {
				m = <>
					<p>You are an <span className="red">alien</span>.</p>
					<p>Hunt down and kill all humans.</p>
					<p>
						You start at the
						<img src={imageSectorAlien} alt="alien sector" />
						symbol.
					</p>
					<p>You may move up to two spaces.</p>
				</>
			} else {
				m = <>
					<p>You are a <span className="green">human</span>.</p>
					<p>
						Evade the aliens and make your way to an escape hatch.
						<img src={imageSectorEscape} alt="escape hatch" />
					</p>
					<p>
						You start at the
						<img src={imageSectorHuman} alt="human sector" />
						symbol.
					</p>
					<p>You may only move one space.</p>
				</>
			}
			setMsg(m);
		} else {
			const playerName = G.players[lastTurn.player].name;
			if(lastTurn.action === 'move-safe') {
				m = <>
					<p>{playerName} moved to a safe sector.</p>
				</>
			}
			if(lastTurn.action === 'move-dangerous') {
				let hand = G.players[lastTurn.player].hand;
				let card = hand[hand.length - 1];
				if(card === 'RED') {
					m = <>
						<p>{playerName} moved to a dangerous sector.</p>
						{ (lastTurn.player === playerID) &&
							<>
								<p>You drew a <span className="red">{card}</span> card</p>
								<p>Instructions:</p>
								<p>Announce "Noise heard in sector ..." and then your actual location</p>
							</>
						}
					</>
				} else if(card === 'GREEN') {
					m = <>
						<p>{playerName} moved to a dangerous sector.</p>
						{ (lastTurn.player === playerID) &&
							<>
								<p>You drew a <span className="green">{card}</span> card</p>
								<p>Instructions:</p>
								<p>Announce "Noise heard in sector ..." and then say <em>any</em> location--you may lie</p>
							</>
						}
					</>
				} else if(card === 'WHITE') {
					m = <>
						<p>{playerName} moved to a dangerous sector.</p>
						{ (lastTurn.player === playerID) &&
							<>
								<p>You drew a <span className="white">{card}</span> card</p>
								<p>Instructions:</p>
								<p>Announce "Silence in all sectors"</p>
							</>
						}
					</>
				}
			}
			if(lastTurn.action === 'attack') {
				let team = G.players[playerID].team;
				if(lastTurn.player === playerID) {
					m = <>
						<p>{playerName} attacks!</p>
						{ (lastTurn.player === playerID) &&
							<>
								<p>Instructions:</p>
								<p>Announce the sector that you are attacking</p>
								<p>If this is your first kill, you may now move up to <em>three</em> spaces.</p>
							</>
						}
					</>
				} else {
					if(team === 'HUMAN') {
						m = <>
							<p>{playerName} attacks!</p>
							<p>Instructions:</p>
							<p>If the attacking alien says the sector you're in, declare that you are dead, then click the "Die" button on your next turn.</p>
						</>
					} else {
						m = <>
							<p>{playerName} attacks!</p>
						</>
					}
				}
			}
			if(lastTurn.action === 'escape') {
				m = <>
					<p>{playerName} escapes!</p>
				</>
			}
			if(lastTurn.action === 'die') {
				m = <>
					<p>{playerName} is dead.</p>
				</>
			}
			setMsg(m);
		}
	}, [ lastTurn.action, lastTurn.player, G.players, playerID ]);

	return (
		<div className="message">
			{ msg }
		</div>
	);
}

export default Message;
