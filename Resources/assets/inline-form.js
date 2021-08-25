export default function(root = document) {
  root.querySelectorAll('[data-form-action]').forEach((form) => {
    form.querySelector('button').addEventListener('click', () => {
      console.log(form.dataset);

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
};
