const SearchFilter = ( {searchFilter, onChange} ) => {
    //console.log(searchFilter)
    return (
        <form>
            <label>Look up <input id="search-filter" value={searchFilter} onChange={onChange} /> </label>
        </form>
    )
}

export default SearchFilter