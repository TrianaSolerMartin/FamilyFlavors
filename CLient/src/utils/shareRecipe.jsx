import Swal from 'sweetalert2';

export const shareRecipe = async (recipe) => {
    const { value: shareOption } = await Swal.fire({
        title: '¿Dónde deseas compartir la receta?',
        input: 'radio',
        inputOptions: {
            whatsapp: 'WhatsApp',
            twitter: 'Twitter',
            facebook: 'Facebook',
            copy: 'Copiar enlace'
        },
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Compartir'
    });

    if (shareOption) {
        const text = `¡Mira esta receta!\n${recipe.title}\n${recipe.description}`;
        
        switch(shareOption) {
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
                break;
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
                break;
            case 'copy':
                navigator.clipboard.writeText(text);
                Swal.fire('¡Enlace copiado!', '', 'success');
                break;
        }
    }
};