const Notification = ({ notification, type }) => {
    if (notification === null) {
      return null
    }

    if(type === 'success') {
      return (
        <div className='success'>
          {notification}
        </div>
      )
    }

    return (
      <div className='error'>
        {notification}
      </div>
    )

}

export default Notification