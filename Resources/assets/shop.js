import { Tooltip, Toast, Popover, Alert } from 'bootstrap';
import inlineForm from './modules/inlineForm';
import productVariant from './modules/productVariant';
import checkout from './modules/checkout';
import feather from 'feather-icons';
import GLightbox from 'glightbox';
import addressBookFill from "./modules/addressBookFill";
import provinceForm from "./modules/provinceForm";

[].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function (tooltipTriggerEl) {
    return new Tooltip(tooltipTriggerEl);
});

feather.replace();

(() => {
  GLightbox({
    selector: '.glightbox',
  });
  inlineForm();
  productVariant();
  checkout();
  addressBookFill();
  provinceForm();
})();
