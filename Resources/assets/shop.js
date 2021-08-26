import { Tooltip, Toast, Popover, Alert } from 'bootstrap';
import inlineForm from './modules/inlineForm';
import productVariant from './modules/productVariant';
import checkout from './modules/checkout';

[].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function (tooltipTriggerEl) {
    return new Tooltip(tooltipTriggerEl);
});

import feather from 'feather-icons';
feather.replace();

import GLightbox from 'glightbox';
import addressBookFill from "./modules/addressBookFill";
GLightbox({
    selector: '.glightbox',
});

inlineForm();
productVariant();
checkout();
addressBookFill();
