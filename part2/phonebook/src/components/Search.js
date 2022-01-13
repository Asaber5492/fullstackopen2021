import React, { useState } from 'react'



const Search = ({ searchItem,handleSearch }) => {

    return (
        <div>
        <input
          value={searchItem}
          onChange= {handleSearch}
        />
      </div>
    )
}
export default Search