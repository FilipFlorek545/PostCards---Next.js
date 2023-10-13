
export const postSocket = () => {
    if(window?.WSS?.readyState === 1) return window.WSS;
    let ws = {
        init: () => {
            try {
                ws = new WebSocket('ws://localhost:3000');
                ws.onopen = () => {
                    console.log('[open] PostSocket connection is now open.')
                    ws.send('Posts requested')
                }
                ws.onmessage = (event) => { // swap later type
                    console.log(`[message] Data received from server: ${event.data}`)
                    window.WSS.data = event.data
                }
                ws.onclose = (event) => {
                    if (event.wasClean) {
                        console.log('[close] PostSocket connection is now closed.')
                    } else {
                        console.log('[close] Connection died')
                    }
                }
                window.WSS = ws;
            } catch (e) {
                console.error('WebSocket initialization error:', e);
            }
        }
    }
    ws.init();
}