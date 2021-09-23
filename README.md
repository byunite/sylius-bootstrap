# Sylius Bootstrap Template

Sylius bootstrap frontend based on https://github.com/SyliusCrafts/BootstrapTheme, but using latest bootstrap and 
deeper symfony template override integration.

## Installation

1. Install webpack encore
See https://docs.sylius.com/en/1.10/cookbook/frontend/webpack.html


2. Install this bundle:
```bash
composer require unite/sylius-bootstrap-bundle
```

3. Enable the bundle:
```bash
Unite\SyliusBootstrapBundle\UniteSyliusBootstrapBundle::class => ['all' => true],
```


```javascript
// assets/shop/shop-entry.js
import 'unite-sylius-bootstrap/Resources/assets/shop';
import './shop.scss';
import './img/logo.svg';
```


```scss
// assets/shop/shop.scss
// @import "scss/variables" override all bootstrap variables
@import "~unite-sylius-bootstrap/Resources/assets/shop";
```
