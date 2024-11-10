import React, { useImperativeHandle, useState } from 'react'

function Toggable(props, ref) {
  const [visible, setVisible] = useState(false)
  
  const text = visible ? 'cancel' : props.labelText ? props.labelText: 'Login'  
  
  useImperativeHandle(ref,()=>({
    toggleVisibility: ()=>setVisible(!visible)
  }))
  return (
    <div>
      {visible && <div>{props.children}</div>}
      <button style={{marginTop:'10px'}} onClick={() => setVisible(!visible)}>
        {text}
      </button>
    </div>
  )
}

export default React.forwardRef(Toggable)
