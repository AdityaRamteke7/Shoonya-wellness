import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [allData, setAllData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState({ title: '', location: '' });
    const [filters, setFilters] = useState({ date: '', type: '' });
    const itemsPerPage = 3;

    useEffect(() => {
        fetchAllRetreats();
    }, []);

    useEffect(() => {
        paginateData();
    }, [allData, currentPage, searchQuery, filters]);

    const fetchAllRetreats = async () => {
        try {
            const response = await axios.get('https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats');
            setAllData(response.data);
        } catch (error) {
            console.error('Error fetching retreats:', error);
        }
    };

    const convertUnixToYear = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.getFullYear();
    };

    const paginateData = () => {
        let filteredData = allData;

        if (searchQuery.title || searchQuery.location) {
            filteredData = filteredData.filter((retreat) =>
                retreat.title.toLowerCase().includes(searchQuery.title.toLowerCase()) &&
                retreat.location.toLowerCase().includes(searchQuery.location.toLowerCase())
            );
        }

        if (filters.date) {
            if (filters.date === '2023') {
                filteredData = filteredData.filter((retreat) => {
                    const year = convertUnixToYear(retreat.date);
                    return year >= 2023 && year <= 2024;
                });
            } else if (filters.date === '2024') {
                filteredData = filteredData.filter((retreat) => {
                    const year = convertUnixToYear(retreat.date);
                    return year >= 2024 && year <= 2025;
                });
            }
        }

        if (filters.tag) {
            filteredData = filteredData.filter((retreat) =>
                retreat.type.toLowerCase() === filters.type.toLowerCase()
            );
        }

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setData(filteredData.slice(startIndex, endIndex));
    };

    const handleSearch = (title, location) => {
        setSearchQuery({ title, location });
        setCurrentPage(1);
    };

    const handleFilterChange = (name, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
        setCurrentPage(1);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(allData.length / itemsPerPage)));
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const value = {
        data,
        currentPage,
        totalPages: Math.ceil(allData.length / itemsPerPage),
        handleNextPage,
        handlePreviousPage,
        handleSearch,
        handleFilterChange,
        filters,
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

export { DataContext, DataProvider };
