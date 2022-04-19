import React from 'react'

export default function GameButton(props) {
    function handleClick() {
        props.action();
    }

    return (
        <button onClick={handleClick}>{props.text}</button>
    )
}
