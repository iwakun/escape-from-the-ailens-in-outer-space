import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import { DEFAULT_PORT, APP_PRODUCTION } from "../config";
import { Game } from './Game';
import Board from './Board';

const { origin, protocol, hostname } = window.location;
const SERVER_URL = APP_PRODUCTION ? origin : `${protocol}//${hostname}:${DEFAULT_PORT}`;

export const GameClient = Client({
	game: Game,
	board: Board,
	debug: false,
	multiplayer: SocketIO({ server: SERVER_URL }),
});

