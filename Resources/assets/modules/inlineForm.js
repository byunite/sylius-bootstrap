export default function(root = document) {

  root.querySelectorAll('[data-form-action]').forEach((form) => {
    const button = form.querySelector('button');
    button.addEventListener('click', () => {
      button.disabled = true;
      const data = JSON.parse(form.dataset.formData);
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      fetch(form.dataset.formAction, { method: form.dataset.formMethod || 'POST', body: formData })
        .then(() => {
          location.reload();
        });
    });
  });

  root.querySelectorAll('[data-ajax-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();
      form.querySelectorAll('button').forEach((button) => { button.disabled = true; });
      form.querySelectorAll('.ajax-form-added').forEach((el) => {
        el.remove();
      });
      fetch(form.action, { method: form.method || 'POST', body: new FormData(form) })
        .then((response) => {
          return response.redirected ? null : response.json();
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
            window.location.href = form.dataset.redirect;
          }
      }).catch((error) => {
          console.log(error);
          location.reload();
      });
    });
  });

};