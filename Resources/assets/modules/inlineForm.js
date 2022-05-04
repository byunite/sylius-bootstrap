import Cookies from 'js-cookie'

export default function(root = document) {
  const openCartDropdown = Cookies.get('open_cart_dropdown');
  if (openCartDropdown === '1' && document.getElementById('cartDropdown')) {
    Cookies.remove('open_cart_dropdown');
    document.getElementById('cartDropdown').click();
  }

  root.querySelectorAll('[data-form-action]').forEach((form) => {
    const button = form.querySelector('button');
    button.addEventListener('click', () => {
      button.disabled = true;
      const data = JSON.parse(form.dataset.formData);
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      fetch(form.dataset.formAction, { method: form.dataset.formMethod || 'POST', body: formData, headers: { 'ajax-form': true } })
        .then(() => {
          location.reload();
        });
    });
  });

  root.querySelectorAll('[data-ajax-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();

      if(!form.reportValidity()) {
        return;
      }

      form.querySelectorAll('button').forEach((button) => { button.disabled = true; });
      form.querySelectorAll('.ajax-form-added').forEach((el) => {
        el.remove();
      });
      fetch(form.action, { method: form.method || 'POST', body: new FormData(form), headers: { 'ajax-form': true }, redirect: 'manual' })
        .then((response) => {
          return response.type === 'opaqueredirect' ? null : response.json();
        }).then((res) => {
          if(res) {
            form.querySelectorAll('button').forEach((button) => { button.disabled = false; });
            res.errors.errors.forEach((error) => {
              const errorEl = document.createElement('DIV');
              errorEl.classList.add('alert');
              errorEl.classList.add('alert-danger');
              errorEl.classList.add('ajax-form-added');
              errorEl.innerText = error;
              form.prepend(errorEl);
            });
          } else {
            if (form.dataset.reloadAndOpenCart === '1') {
              Cookies.set('open_cart_dropdown', '1');
              location.reload();
            } else {
              window.location.href = form.dataset.redirect;
            }
          }
      }).catch((error) => {
          console.log(error);
          location.reload();
      });
    });
  });

};
