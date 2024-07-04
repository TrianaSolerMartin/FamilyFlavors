import react from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav>
        <ul>
            <li>
            <Link to="/home">Home</Link>
            </li>
            <li>
            <Link to="/recipe/:id">Recipe</Link>
            </li>
            <li>
            <Link to="recipeForm">Add recipe</Link>
            </li>
        </ul>
        </nav>
    );
    };

export default Nav;