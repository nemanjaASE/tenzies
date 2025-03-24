import React from "react"
import "./Die.css"

const Die = ({ props }) => {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return (
        <button 
            style={styles} 
            className="die"
            aria-pressed={props.isHeld}
            onClick={() => props.hold(props.id)}
            aria-label={`Die with value ${props.value},
            ${props.isHeld ? "held" : "not held"}`}
        >{props.value}</button>
    )
}

export default Die