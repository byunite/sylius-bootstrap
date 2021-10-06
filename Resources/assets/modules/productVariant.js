function updatePrice(root, input) {
  const price = root.querySelector('[data-js-product-price]');
  if(price) {
    price.innerText = input.dataset.price;
  }
}

export default function(root = document) {
  root.querySelectorAll(`input[name="sylius_add_to_cart[cartItem][variant]"]`).forEach((input) => {

    if(input.dataset.default) {
      input.checked = true;
      updatePrice(root, input);
    }

    input.addEventListener('change', () => { updatePrice(root, input); });
  });
};
