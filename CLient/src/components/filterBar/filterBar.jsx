import React from 'react';
import PropTypes from 'prop-types';
import './FilterBar.css';

const FilterBar = ({ filters, onSearch, onFilter, onSort }) => {
    const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Desserts'];
    const sortOptions = [
        { value: 'newest', label: 'Newest First' },
        { value: 'oldest', label: 'Oldest First' },
        { value: 'az', label: 'A to Z' },
        { value: 'za', label: 'Z to A' }
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
FilterBar.propTypes = {
    filters: PropTypes.shape({
        search: PropTypes.string,
        category: PropTypes.string,
        sortBy: PropTypes.string
    }).isRequired,
    onSearch: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired
};

export default FilterBar;