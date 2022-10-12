
const socket = new WebSocket(`ws://${window.location.host}`);

export function initSocket() {
	return socket;
}
export default socket;