import React, { useState } from 'react'
import PropagateLoader from "react-spinners/PropagateLoader";


function Loader() {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#000000");


   
  return (
    <div className="sweet-loading text-center" style={{marginTop:"200px"}}>
    
<PropagateLoader
        color={color}
        loading={loading}
        
        size={40}
        aria-label="Loading Spinner"
        data-testid="loader"
        speedMultiplier="0.8"
      />
        
    </div>
  )
}

export default Loader