import React from 'react'
import { BeatLoader } from 'react-spinners'

const override = {
    display: "block",
    margin: "100px auto"
}

const Spinner = ({ loading }) => {
  return (
    <BeatLoader cssOverride={override}
        loading={loading}
        size={20}
    />
  )
}

export default Spinner