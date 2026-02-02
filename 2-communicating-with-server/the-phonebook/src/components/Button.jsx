const Button = ({ onClick, text, id }) => {
    return (
        <button id={id} onClick={onClick}>{text}</button>
    )
}

export default Button