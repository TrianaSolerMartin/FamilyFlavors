import Swal from 'sweetalert2';

export const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
});

export const showSuccess = (message) => {
    Toast.fire({
        icon: 'success',
        title: message
    });
};

export const showError = (message) => {
    Toast.fire({
        icon: 'error',
        title: message
    });
};

export const showConfirm = async (title, text) => {
    const result = await Swal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4CAF50',
        cancelButtonColor: '#f44336',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    });
    return result.isConfirmed;
};