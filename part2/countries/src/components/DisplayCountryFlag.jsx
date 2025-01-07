const DisplayCountryFlag = ({ png, alt }) => {
  
    return (
      <div>
        <img src={png} alt={alt} style={{ width: '200px', height: 'auto' }} />
      </div>
    )
  }
  
  export default DisplayCountryFlag