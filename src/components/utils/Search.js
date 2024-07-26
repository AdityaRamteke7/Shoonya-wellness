import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext.js';
import './Search.css';

const SearchBar = () => {
    const { handleSearch } = useContext(DataContext);
    const [titleQuery, setTitleQuery] = useState('');
    const [locationQuery, setLocationQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(titleQuery, locationQuery);
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search retreats by title"
                value={titleQuery}
                onChange={(e) => setTitleQuery(e.target.value)}
            />
           
        </form>
    );
};

export default SearchBar;
