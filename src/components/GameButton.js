import './GameButton.css'

export default function GameButton(props) {
    function handleClick() {
        props.action();
    }

    return (
        <button className='GameButton-button' onClick={handleClick}>{props.text}</button>
    )
}
