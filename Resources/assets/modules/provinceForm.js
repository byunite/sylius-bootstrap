const getProvinceInputValue = function getProvinceInputValue(valueSelector) {
  return valueSelector == undefined ? '' : `value="${valueSelector}"`;
};

const prepareInput = function(content) {
  content = content
    .replace('<label', '<label class="form-label"')
    .replace('<input type="text"', '<input type="text" class="form-control"')
    .replace('<select', '<select class="form-select"');
  return `<div class="mb-3">${content}</div>`;
}

export default function(root = document) {

  const countrySelect = root.querySelector('select[name$="[countryCode]"]');

  if(!countrySelect) {
    return;
  }

  countrySelect.addEventListener('change', (event) => {
    const provinceContainer = root.querySelector('div.province-container');

    if(!countrySelect.value) {
      provinceContainer.innerHTML = '';
    } else {

      const provinceSelectFieldName = countrySelect.name.replace('country', 'province');
      const provinceInputFieldName = countrySelect.name.replace('countryCode', 'provinceName');

      const provinceSelectFieldId = countrySelect.id.replace('country', 'province');
      const provinceInputFieldId = countrySelect.id.replace('countryCode', 'provinceName');

      fetch(`${provinceContainer.dataset.url}?countryCode=${countrySelect.value}`).then((response) => {
        return response.json();
      }).then((content) => {

        if (content.content.indexOf('select') !== -1) {
          const input = provinceContainer.querySelector('select > option[selected$="selected"]');
          const provinceSelectValue = getProvinceInputValue(input ? input.value : undefined);
          provinceContainer.innerHTML = prepareInput(content.content)
            .replace('name="sylius_address_province"', `name="${provinceSelectFieldName}"${provinceSelectValue}`)
            .replace('id="sylius_address_province"', `id="${provinceSelectFieldId}"`)
            .replace('option value="" selected="selected"', 'option value=""')
            .replace(`option ${provinceSelectValue}`, `option ${provinceSelectValue}" selected="selected"`);
        } else {
          const input = provinceContainer.querySelector('input');
          const provinceInputValue = getProvinceInputValue(input ? input.value : undefined);
          provinceContainer.innerHTML = prepareInput(content.content)
              .replace('name="sylius_address_province"', `name="${provinceInputFieldName}"${provinceInputValue}`)
              .replace('id="sylius_address_province"', `id="${provinceInputFieldId}"`);
        }
      });
    }
  });
}
