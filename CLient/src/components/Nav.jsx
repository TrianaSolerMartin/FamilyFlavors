import react from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav>
        <ul>
            <li>
            <Link to="/">Home</Link>
            </li>
            <li>
            <Link to="/recipe/:id">Recipe</Link>
            </li>
            <li>
            <Link to="/add-recipe">Add recipe</Link>
            </li>
        </ul>
        </nav>
    );
    };

export default Nav;