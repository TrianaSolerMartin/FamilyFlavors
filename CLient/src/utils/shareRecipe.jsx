import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

export const shareViaWhatsApp = (message, url) => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message + '\n' + url)}`, '_blank');
};

export const shareViaFacebook = (url) => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
};

export const shareViaX = (message, url) => {
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`, '_blank');
};

export const shareViaEmail = (subject, message, url) => {
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message + '\n\n' + url)}`, '_blank');
};

export const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        return false;
    }
};

export const shareRecipe = async (recipe, platform) => {
    const recipeUrl = `${window.location.origin}/recipe/${recipe.id}`;
    const message = `¡Mira esta deliciosa receta de ${recipe.title}!`;

    try {
        switch (platform) {
            case 'whatsapp':
                shareViaWhatsApp(message, recipeUrl);
                Toast.fire({ icon: 'success', title: 'Compartiendo en WhatsApp' });
                break;
            case 'facebook':
                shareViaFacebook(recipeUrl);
                Toast.fire({ icon: 'success', title: 'Compartiendo en Facebook' });
                break;
                case 'x':
                    shareViaX(message, recipeUrl);
                    Toast.fire({ icon: 'success', title: 'Compartiendo en X' });
                    break;
            case 'email':
                shareViaEmail('Receta Compartida', message, recipeUrl);
                Toast.fire({ icon: 'success', title: 'Abriendo cliente de correo' });
                break;
            case 'copy': {
                const copied = await copyToClipboard(recipeUrl);
                if (copied) {
                    Toast.fire({ icon: 'success', title: '¡Link copiado!' });
                } else {
                    throw new Error('Error al copiar');
                }
                break;
            }
            default:
                throw new Error('Método de compartir no válido');
        }
        return true;
    } catch (error) {
        Toast.fire({ icon: 'error', title: 'Error al compartir la receta' });
        return false;
    }
};