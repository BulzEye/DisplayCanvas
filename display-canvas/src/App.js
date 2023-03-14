import { useState, useRef } from 'react';
import './App.css';
import Header from './components/Header';

let screenx = 128;
let screeny = 64;
let zoom = 5;
let margin = zoom;

function App() {
    const [coordinates, setCoordinates] = useState({x:0, y:0});
    const updatePosition = (event) => {
        const rect = canvasRef.current.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        // console.log(x, y);
        x = Math.floor(x/zoom);
        y = Math.floor(y/zoom);
        // console.log(x, y);
        if(x<0) x = 0;
        else if(x>screenx) x = screenx;
        if(y<0) y = 0;
        else if(y>screeny) y = screeny;
        setCoordinates({x,y});

    }

    const options = {
        height: 2*margin + screeny * zoom,
        width: 2*margin + screenx * zoom
    }

    const canvasRef = useRef(null);
    const context = canvasRef.current && canvasRef.current.getContext("2d");

    return (
        <div className="App">
            <Header />
            <canvas ref={canvasRef} onClick={updatePosition} style={{ backgroundColor: "#000000" }} {...options}></canvas>
            <div>{`(${coordinates.x}, ${coordinates.y})`}</div>
        </div>
    );
}

export default App;
