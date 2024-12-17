const Notification = ({ notification }) => {
    if (notification === null) {
      return null
    }

    return (
      <div className='success'>
        {notification}
      </div>
    )

}

export default Notification