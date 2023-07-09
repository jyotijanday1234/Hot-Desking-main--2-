import React,{useState} from 'react'

import ClipLoader from "react-spinners/ClipLoader";
const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
const Loader = () => {
    let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  return (
    <div className="sweet-loading" style={{marginTop:'250px'}}>

    <ClipLoader
      color={color}
      loading={loading}
      cssOverride={override}
      size={80}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>
  )
}

export default Loader