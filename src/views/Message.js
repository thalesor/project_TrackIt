import Swal from "sweetalert2";

const message = Swal.mixin();

const toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

export const displayToast = (type, title) => 
{
      toast.fire(
  {
          icon: type,
          title: title,
      });
};

export const displayMessage = (
    type,
    title,
    text,
    fn = null,
    showCancelButton = false,
confirmText = null,
cancelText = null
) => {
const colors = {
  error: '#fa5f5f',
  success: '#65b844',
  warning: '#d98621',
  info: '#037bfc'
}
const titles = {
  error: 'Ocorreu um erro',
  success: 'Tudo correu bem',
  warning: 'Hey, você tem certeza?',
  info: 'Um aviso importante!'
}
    message.fire({
        title: titles[type],
        text: text,
        icon: type,
  background: colors[type], 
  color: '#FFF',
  iconColor: '#FFF',
  confirmButtonColor: '#AAA',
  cancelButtonColor: '#1c1b1b',
        showCancelButton: showCancelButton,
        confirmButtonText: confirmText || "Ok",
        cancelButtonText: cancelText || "Cancel",
        reverseButtons: true,
    }).then((result) => {
            if (result.isConfirmed) {
                fn();
            } 
        });
};