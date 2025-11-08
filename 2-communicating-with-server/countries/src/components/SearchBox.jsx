const SearchBox = ( {value, onChange, placeholder, loading} ) => {
  return (
    <>
      <label htmlFor="country-search">Search Countries: </label>
      <input 
        id="country-search" 
        name="country-search" 
        type="text" 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
        disabled={loading} />
    </>
  )
}

export default SearchBox