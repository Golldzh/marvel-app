const ErrorMessage = () => {
  return (
    <img style={{ display: 'block', height: '250px', width: '250px', objectFit: 'contain', margin: '0 auto' }} src={process.env.PUBLIC_URL + '/error.gif'} alt={'error'}/>
  )
}

export default ErrorMessage;