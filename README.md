# Sylius Bootstrap Template

Sylius bootstrap frontend based on https://github.com/SyliusCrafts/BootstrapTheme, but using latest bootstrap and 
deeper symfony template override integration.

## Installation

```bash
composer require unite/sylius-bootstrap-bundle
```

Enable the bundle:
```bash
Unite\SyliusBootstrapBundle\UniteSyliusBootstrapBundle::class => ['all' => true],
```

Setting up webpack encore integration
```json
// package.json
{
    ...
    "dependencies": {
        ...
        "unite-sylius-bootstrap": ".vendor/unite/sylius-bootstrap-bundle"
    }
}
```

```javascript
// webpack.config.js
const path = require('path');
const Encore = require('@symfony/webpack-encore');

const syliusBundles = path.resolve(__dirname, 'vendor/sylius/sylius/src/Sylius/Bundle/');
const uiBundleScripts = path.resolve(syliusBundles, 'UiBundle/Resources/private/js/');
const uiBundleResources = path.resolve(syliusBundles, 'UiBundle/Resources/private/');

// Shop config
Encore
    .setOutputPath('public/build/shop/')
    .setPublicPath('/build/shop')
    .addEntry('shop', './assets/shop/shop.js')
    .disableSingleRuntimeChunk()
    .cleanupOutputBeforeBuild()
    .enableSassLoader()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .enableSassLoader();

const shopConfig = Encore.getWebpackConfig();
shopConfig.name = 'shop';
module.exports = [shopConfig];
```

```javascript
// assets/shop/shop.js
import 'unite-sylius-bootstrap/Resources/assets/shop';
import './shop.scss';
import './img/logo.svg';
```


```scss
// assets/shop/shop.scss
// @import "scss/variables" override all bootstrap variables
@import "~unite-sylius-bootstrap/Resources/assets/shop";
```
