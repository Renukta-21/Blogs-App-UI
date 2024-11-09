import { useState } from 'react'

function Toggable(props) {
  const [visible, setVisible] = useState(false)
    const text = visible ? 'cancel' : 'Want to login'
    
  return (
    <div>
      {visible && <div>{props.children}</div>}
      <button style={{marginTop:'10px'}} onClick={() => setVisible(!visible)}>
        {text}
      </button>
    </div>
  )
}

export default Toggable
