import { Tooltip, Toast, Popover, Alert } from 'bootstrap';

[].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function (tooltipTriggerEl) {
    return new Tooltip(tooltipTriggerEl);
});

import feather from 'feather-icons';
feather.replace();

import GLightbox from 'glightbox';
GLightbox({
    selector: '.glightbox',
});
