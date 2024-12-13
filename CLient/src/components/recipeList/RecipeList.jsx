// import React, { useRef } from 'react';
// import { Link } from 'react-router-dom';
// import './RecipeList.css'; // Importar el archivo CSS

// const RecipeList = ({ recipes }) => {
//   const listRef = useRef(null);

//   const scrollLeft = () => {
//     listRef.current.scrollBy({ left: -300, behavior: 'smooth' });
//   };

//   const scrollRight = () => {
//     listRef.current.scrollBy({ left: 300, behavior: 'smooth' });
//   };

//   if (!recipes || recipes.length === 0) {
//     return <p>No recipes found.</p>;
//   }

//   return (
//     <div className="recipe-list-container">
//       <h1 className="recipe-list-title">Recipes</h1>
//       <div className="recipe-list-wrapper">
//         <button className="nav-arrow left-arrow" onClick={scrollLeft}>{'<'}</button>
//         <div className="recipe-list" ref={listRef}>
//           {recipes.map((recipe) => (
//             <div className="recipe-card" key={recipe.id}>
//               <div className="recipe-image">
//                 <img src={recipe.image} alt={recipe.name} /> 
//               </div>
//               <Link className="recipe-link" to={`recipe/${recipe.id}`}>
//                 <div className="recipe-name">{recipe.name}</div>
//                 <div className="recipe-description">{recipe.description.slice(0, 20)}...</div>
//               </Link>
//             </div>
//           ))}
//         </div>
//         <button className="nav-arrow right-arrow" onClick={scrollRight}>{'>'}</button>
//       </div>
//     </div>
//   );
// };

// export default RecipeList;

import React from 'react';
import './RecipeList.css';

const RecipeList = ({ recipes, onRecipeClick }) => {
    return (
        <div className="recipe-list-container">
            <h1 className="recipe-list-title">Recipes</h1>
            <div className="recipe-list-wrapper">
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="recipe-card" onClick={() => onRecipeClick(recipe)}>
                        <div className="recipe-image">
                            <img src={recipe.image} alt={recipe.name} />
                        </div>
                        <div className="recipe-text">
                            <h3 className="recipe-name">{recipe.name}</h3>
                            <p className="recipe-description">{recipe.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeList;