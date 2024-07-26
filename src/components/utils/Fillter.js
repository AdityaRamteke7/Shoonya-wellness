import React, { useContext } from 'react';
import './Filter.css';
import { DataContext } from '../context/DataContext';

const Filter = () => {
    const { filters, handleFilterChange } = useContext(DataContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        handleFilterChange(name, value);
    };

    return (
        <div className="filter">
            <label>
                <select name="date" value={filters.date} onChange={handleChange}>
                    <option value="">Filter by date</option>
                    <option value="2023">2023-2024</option>
                    <option value="2024">2024-2025</option>
                </select>
            </label>
            <label>
                <select name="type" value={filters.type} onChange={handleChange}>
                    <option value="">Filter by type</option>
                    <option value="Yoga">Yoga</option>
                    <option value="Meditation">Meditation</option>
                    <option value="Detox">Detox</option>
                </select>
            </label>
        </div>
    );
};

export default Filter;
