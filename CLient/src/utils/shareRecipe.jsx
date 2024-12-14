import { Toast } from './notificationUtilities';

export const shareRecipe = async (recipe, platform) => {
    const recipeUrl = `${window.location.origin}/recipe/${recipe.id}`;
    const message = `¡Mira esta deliciosa receta de ${recipe.title}!`;

    try {
        switch (platform) {
            case 'whatsapp':
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message + '\n' + recipeUrl)}`, '_blank');
                break;
            case 'email':
                window.open(`mailto:?subject=${encodeURIComponent('Receta Compartida')}&body=${encodeURIComponent(message + '\n\n' + recipeUrl)}`, '_blank');
                break;
            case 'copy':
                await navigator.clipboard.writeText(recipeUrl);
                Toast.fire({
                    icon: 'success',
                    title: '¡Link copiado al portapapeles!'
                });
                break;
            default:
                throw new Error('Método de compartir no válido');
        }
        return true;
    } catch (error) {
        Toast.fire({
            icon: 'error',
            title: 'Error al compartir la receta'
        });
        return false;
    }
};