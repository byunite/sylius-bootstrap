function findParentWithClass(element, className) {
  if(element.classList.contains(className)) {
    return element;
  }
  if(element === document.body) {
    return element;
  }
  return findParentWithClass(element.parentElement, className);
}

function updatePrice(container, variant, dataset) {
  const price = container.querySelector('[data-js-product-price]');
  if (price) {
    price.innerText = dataset.price;
  }
}

function updateImages(container, variant) {
  const availableThumbs = [];
  const thumbnails = container.querySelectorAll('[data-js-product-thumbnail]');
  thumbnails.forEach((thumb) => {
    const variants = [];
    thumb.querySelectorAll('.sylius-image-variants *[data-variant-code]').forEach((v) => {
      variants.push(v.dataset.variantCode);
    });
    if (variants.length === 0 || variants.includes(variant)) {
      thumb.style.display = 'block';
      thumb.querySelector('a').classList.add('glightbox');
      availableThumbs.push(thumb.querySelector('a'));
    } else {
      thumb.querySelector('a').classList.remove('glightbox');
      thumb.style.display = 'none';
    }
  });

  if (availableThumbs.length > 0) {
    const img = container.querySelector('.product--image');
    if (img) {
      img.style.display = 'block';
      img.href = availableThumbs[0].href;
      img.querySelector('img').src = availableThumbs[0].querySelector('img').dataset.largeThumbnail;
    } else {
      img.style.display = 'none';
    }
  }
  document.gLightbox.reload();
}

function updateVariant(input) {
  const container = findParentWithClass(input, 'product');
  updatePrice(container, input.value, input.dataset);
  updateImages(container, input.value, input.dataset);
}

export default function(root = document) {
  root.querySelectorAll(`input[name="sylius_add_to_cart[cartItem][variant]"]`).forEach((input) => {

    if(input.dataset.default) {
      input.checked = true;
      updateVariant(input);
    }

    input.addEventListener('change', () => { updateVariant(input); });
  });
};
