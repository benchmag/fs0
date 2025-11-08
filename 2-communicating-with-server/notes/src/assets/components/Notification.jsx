const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error' style={{ whiteSpace: 'pre-wrap' }}>
      {message}
    </div>
  )
}

export default Notification