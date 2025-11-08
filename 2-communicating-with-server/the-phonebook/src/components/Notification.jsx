const Notification = ({ message, notificationType }) => {
    const notificationStyle = {
        whiteSpace: 'pre-wrap',
        padding: '12px',
        borderRadius: '4px',
        marginBottom: '12px'
    }

    if (notificationType === 'error') {
        notificationStyle.color = 'red'
        notificationStyle.background = 'lightgrey'
        notificationStyle.border = '1px solid red'
    } else if (notificationType === 'success') {
        notificationStyle.color = 'green'
        notificationStyle.background = 'lightgrey'
        notificationStyle.border = '1px solid green'
    }

    if (message === null) {
        return null
    }

    return (
        <div className={`notification ${notificationType}`} style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification