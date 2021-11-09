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
  let first = true;
  thumbnails.forEach((thumb) => {
    const variants = [];
    thumb.querySelectorAll('.sylius-image-variants *[data-variant-code]').forEach((v) => {
      variants.push(v.dataset.variantCode);
    });
    thumb.querySelectorAll('.sylius-image-variants *[data-variant-options]').forEach((v) => {
      variants.push(v.dataset.variantOptions);
    });

    if (variants.length === 0 || variants.includes(variant)) {
      if (first) {
        first = false;
        thumb.querySelector('a').classList.remove('glightbox');
        thumb.style.display = 'none';
      } else {
        thumb.style.display = 'block';
        thumb.querySelector('a').classList.add('glightbox');
      }
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

function updateUrl(container, variant) {
  const href = new URL(document.URL);
  if (href.searchParams.get('variant') !== variant) {
    href.searchParams.set('variant', variant);
    window.history.replaceState(null, null, href.toString());
  }
}

function updateVariant(input) {
  const container = findParentWithClass(input, 'product');
  updatePrice(container, input.value, input.dataset);
  updateImages(container, input.value, input.dataset);
  updateUrl(container, input.value, input.dataset);
}

function handleVariantOption(form) {
  const container = findParentWithClass(form, 'product');

  let selector = '';
  let variant = '';
  container.querySelectorAll('select[data-option]').forEach((selectOption) => {
    let option = selectOption.value;
    selector += '[data-' + selectOption.dataset.option + '="' + option + '"]';
    variant += option + ' ';
  });

  const priceContainer = container.querySelector('.sylius-variants-pricing');
  const priceOption = priceContainer.querySelector(selector);
  let price = '';
  if (priceOption) {
    price = priceOption.dataset.value;
    container.querySelector('button[type=submit]').disabled = false;
  } else {
    price = priceContainer.dataset.unavailableText;
    container.querySelector('button[type=submit]').disabled = true;
  }
  form.dataset.price = price;
  updatePrice(container, form.value, form.dataset);
  updateImages(container, variant);
}

export default function(root = document) {
  root.querySelectorAll(`input[name="sylius_add_to_cart[cartItem][variant]"]`).forEach((input) => {

    if(input.dataset.default) {
      input.checked = true;
      updateVariant(input);
    }

    input.addEventListener('change', () => { updateVariant(input); });
  });
  document.querySelectorAll('.sylius-product-adding-to-cart').forEach((form) => {
    handleVariantOption(form);
    form.querySelectorAll('select[data-option]').forEach((select) => {
      select.addEventListener('change', () => { handleVariantOption(form); });
    });
  });
};
