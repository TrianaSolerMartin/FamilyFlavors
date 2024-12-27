import React from 'react';
import './FilterBar.css';

const FilterBar = ({ filters, onSearch, onFilter, onSort }) => {
    const sortOptions = [
        { value: 'newest', label: 'Más recientes' },
        { value: 'oldest', label: 'Más antiguos' },
        { value: 'az', label: 'A-Z' },
        { value: 'za', label: 'Z-A' }
    ];

    return (
        <div className="filter-bar">
            <div className="search-container">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Buscar recetas..."
                        value={filters.search}
                        onChange={(e) => onSearch(e.target.value)}
                        className="search-input"
                    />
                    <i className="fas fa-search search-icon"></i>
                </div>
            </div>

            <select
                value={filters.sortBy}
                onChange={(e) => onSort(e.target.value)}
                className="sort-select"
            >
                {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FilterBar;