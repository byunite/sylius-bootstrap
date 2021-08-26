<?php

declare(strict_types=1);

namespace Unite\SyliusBootstrapBundle\DependencyInjection;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;
use Symfony\Component\DependencyInjection\Extension\PrependExtensionInterface;
use Symfony\Component\DependencyInjection\Loader\YamlFileLoader;
use Symfony\Component\Config\FileLocator;

class UniteSyliusBootstrapExtension extends Extension implements PrependExtensionInterface
{
    /**
     * @inheritDoc
     */
    public function load(array $config, ContainerBuilder $container): void {
        $loader = new YamlFileLoader($container, new FileLocator(__DIR__ . '/../Resources/config'));
        $loader->load('services.yaml');
    }

    /**
     * @inheritDoc
     */
    public function prepend(ContainerBuilder $container) : void
    {
        if (!$container->hasExtension('twig')) {
            return;
        }

        $bundleLocator = (new FileLocator(__DIR__ . '/../Resources/views/bundles'));

        $container->prependExtensionConfig('twig', ['paths' => [
            '%kernel.project_dir%/templates/bundles/SyliusShopBundle' => 'SyliusShop',
            '%kernel.project_dir%/templates/bundles/SyliusUiBundle' => 'SyliusUi',
            '%kernel.project_dir%/templates/bundles/TwigBundle' => 'Twig',
            $bundleLocator->locate('SyliusShopBundle') => 'SyliusShop',
            $bundleLocator->locate('SyliusUiBundle') => 'SyliusUi',
            $bundleLocator->locate('TwigBundle') => 'Twig',
            $bundleLocator->locate('SetonoSyliusTermsPluginBundle') => 'SetonoSyliusTermsPlugin',
        ]]);
    }
}
