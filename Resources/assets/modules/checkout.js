function toggleShippingAddress(root) {
  const differentShippingAddress = root.querySelector(`input[name="sylius_checkout_address[differentShippingAddress]"]`);
  const shippingAddress = root.querySelector('#sylius-shipping-address');
  if(differentShippingAddress) {
    shippingAddress.style.display = differentShippingAddress.checked ? 'block' : 'none';
    differentShippingAddress.addEventListener('change', () => {
      shippingAddress.style.display = differentShippingAddress.checked ? 'block' : 'none';
    });
  }
}

export default function(root = document) {
  toggleShippingAddress(root);
};
