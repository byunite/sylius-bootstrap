<?php

namespace Unite\SyliusBootstrapBundle\EventListener;

use Sylius\Bundle\UiBundle\Menu\Event\MenuBuilderEvent;
use Symfony\Component\HttpFoundation\RequestStack;

class AccountMenuEventListener
{
    /**
     * @var RequestStack $requestStack
     */
    protected $requestStack;

    public function __construct(RequestStack $requestStack)
    {
        $this->requestStack = $requestStack;
    }

    public function alterMenu(MenuBuilderEvent $event) : void {
        $menu = $event->getMenu();
        $current = $this->requestStack->getCurrentRequest();
        foreach($menu->getChildren() as $item) {

            if($current && str_starts_with($current->getRequestUri(), $item->getUri())) {
                $item->setCurrent(true);
            }

            if($item->getLabelAttribute('icon') === 'cart') {
                $item->setLabelAttribute('icon', 'shopping-cart');
            }
        }
    }
}
