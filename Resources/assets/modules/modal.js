import { Modal } from 'bootstrap';

export default function(root = document) {
  root.querySelectorAll('*[bs-modal]').forEach((el) => {
    el.modal = new Modal(el);
  });
}
