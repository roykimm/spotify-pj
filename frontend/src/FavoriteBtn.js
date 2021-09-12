import React from 'react'

const FavoriteBtn = ({setSearchName,value}) => {
    return (
        <button onClick={setSearchName} className="btn btn-primary btn-sm m-1" value={value}>{value}</button>
    )
}

export default FavoriteBtn
