export default function addressBookFill(root = document) {
  document.querySelectorAll('.address-book-select .dropdown-item').forEach((item) => {
    item.addEventListener('click', () => {
      for (const key in item.dataset) {
        const input = document.querySelector(`[name="sylius_checkout_address[billingAddress][${key}]"]`);
        if(input) {
          input.value = item.dataset[key];
        }
      }
    });
  });
}
