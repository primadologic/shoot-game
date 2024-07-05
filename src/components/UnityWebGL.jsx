
import { Fragment, useCallback} from "react"
import { Unity, useUnityContext } from "react-unity-webgl";
import useWebSocket from "./useWebSocket";

const WEBSOCKET_URL = 'ws://192.168.0.108:8080';

export default function UnityWebGL() {

    // const { messages, isConnected, sendMessageSocket } = useWebSocket(WEBSOCKET_URL)
    // const [inputMessage, setInputMessage] = useState('')



    const { unityProvider, sendMessage, loadingProgression, isLoaded } =  useUnityContext({
        loaderUrl: "/build/Shoot_em_up.loader.js",
        dataUrl: "/build/Shoot_em_up.data.unityweb",
        frameworkUrl: "/build/Shoot_em_up.framework.js.unityweb",
        codeUrl: "/build/Shoot_em_up.wasm.unityweb"
    })

    // const sendCursorPosition = (x, y) => {
    //     sendMessage('GameController', 'UpdateCursorPosition', JSON.stringify({ x: 1000, y: 200 }))
    // function sendCursorPosition(x, y) { unityInstance.SendMessage('CursorController', 'UpdateCursorPosition', JSON.stringify({ x: x, y: y })); }
    
    
      
    
    // const sendCursorPosition = useCallback((x, y) => {
    //     // Correctly use the sendMessage method from useUnityContext to send data to Unity
    //     // sendMessage(JSON.stringify({ x: x, y: y }));
    //     sendMessage(x, y);
    // }, [sendMessage]); // Dependency to ensure it updates if sendMessage changes
    
    const handleWebSocketMessage = useCallback((data) => {
        console.log('WebSocket message received:', data);
        try {
            console.log("Websock data", JSON.parse(data));
        
            const { x, y, state } = JSON.parse(data);
            console.log('Parsed data:', { x, y });
            
            // sendCursorPosition(x, y); // Send cursor position to Unity
            sendMessage('CursorController', 'UpdateCursorPosition', `${x}, ${y}`, `${state}`)
            console.log("passed");
        } catch (e) {
            console.error('Error parsing WebSocket message:', e);
        }
    }, [sendMessage]); // Now correctly referencing an external function
    

    const { isConnected } = useWebSocket(WEBSOCKET_URL, handleWebSocketMessage);


    return (
        <Fragment >
            {isConnected && (<p>Connected to Websocket</p>)}
            {!isLoaded && (
                <p className="text-xl font-semibold">Loading Application...{Math.round(loadingProgression * 100)}%</p>
            )}
            <Unity 
                unityProvider={unityProvider} 
                style={{visibility: isLoaded ? "visible" : "hidden", width: 960, height: 600}}
            />
        </Fragment>
    )
}
