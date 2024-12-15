import React from 'react';
import './FilterBar.css';

const FilterBar = ({ filters, onSearch, onFilter, onSort }) => {
    const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Desserts'];
    const sortOptions = [
        { value: 'newest', label: 'Newest' },
        { value: 'oldest', label: 'Oldest' },
        { value: 'az', label: 'A-Z' },
        { value: 'za', label: 'Z-A' }
    ];

    return (
        <div className="filter-bar">
            <div className="search-container">
                <i className="fas fa-search"></i>
                <input
                    type="text"
                    placeholder="Search recipes..."
                    onChange={(e) => onSearch(e.target.value)}
                    value={filters.search}
                />
            </div>
            
            <div className="categories">
                {categories.map(category => (
                    <button
                        key={category}
                        className={`category-btn ${filters.category === category.toLowerCase() ? 'active' : ''}`}
                        onClick={() => onFilter(category.toLowerCase())}
                    >
                        {category}
                    </button>
                ))}
            </div>
            
            <select
                className="sort-select"
                value={filters.sortBy}
                onChange={(e) => onSort(e.target.value)}
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