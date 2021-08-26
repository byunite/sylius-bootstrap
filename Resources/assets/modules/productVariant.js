function updatePrice(root, input) {
  const price = root.querySelector('[data-js-product-price]');
  if(price) {
    price.innerText = input.dataset.price;
  }
}

export default function(root = document) {
  let variant = null;
  const queryStr = document.location.search.split('?');
  if(queryStr.length > 1) {
    queryStr[1].split('&').forEach((part) => {
      const parts = part.split('=');
      if(parts[0] === 'variant') {
        variant = parts[1];
      }
    });
  }

  root.querySelectorAll(`input[name="sylius_add_to_cart[cartItem][variant]"]`).forEach((input) => {

    input.addEventListener('change', () => { updatePrice(root, input); });

    if(variant.length > 0 && input.value === variant) {
      input.checked = true;
      updatePrice(root, input);
    }
  });
};
