function findParentWithClass(element, className) {
  if(element.classList.contains(className)) {
    return element;
  }
  if(element === document.body) {
    return element;
  }
  return findParentWithClass(element.parentElement, className);
}

function updatePrice(input) {
  const container = findParentWithClass(input, 'product');
  const price = container.querySelector('[data-js-product-price]');
  if(price) {
    price.innerText = input.dataset.price;
  }
}

export default function(root = document) {
  root.querySelectorAll(`input[name="sylius_add_to_cart[cartItem][variant]"]`).forEach((input) => {

    if(input.dataset.default) {
      input.checked = true;
      updatePrice(input);
    }

    input.addEventListener('change', () => { updatePrice(input); });
  });
};
