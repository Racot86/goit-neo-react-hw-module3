import styles from "./SearchBox.module.css";
import PropTypes from "prop-types";


const SearchBox = ({handleSearch})=>{
    return (
        <>
            <input className={styles.searchBox} placeholder='search' onChange={ (e) => handleSearch(e.target.value)}/>
        </>
    )
}

export default SearchBox;

SearchBox.propTypes = {
    handleSearch: PropTypes.func.isRequired
}