import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import { DEFAULT_PORT } from "../config";
import { Game } from './Game';
import Board from './Board';

const { protocol, hostname } = window.location;
const SERVER_URL = `${protocol}//${hostname}:${DEFAULT_PORT}`;

export const GameClient = Client({
	game: Game,
	board: Board,
	debug: false,
	multiplayer: SocketIO({ server: SERVER_URL }),
});

