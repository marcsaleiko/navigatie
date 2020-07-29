# Navigatie
Helper tool for everyday navigation building.

## Installation

Install via npm `npm install @marcsaleiko/navigatie --save`. There are no dependencies, just plain vanilla javascript.

## Usage

Include file in your script file and run `Navigatie.init();`. You may use the options below

### Options

You may provide additional options and default overrides via an object passed to the `init` method. Here is a list of all available options and their default values:

```javascript
Navigatie.init({
    // Selector that triggers the main navigation. May be off canvas or plain
    // navigation burger for mobile. Ignore that if you only have a subnav.
    triggerSelector: '.js-menu-trigger',
    // Selector that triggers a subnavigation open.
    subnavTriggerSelector: '.js-submenu-trigger',
    // There will be a global point where we place the openClass
    // to indicate that the main navigation is open. Defaults to body
    placeOpenClassOnSelector: 'body',
    // This is the selector of the subnavigation itself. When the subnav
    // triggers, we look for the subnavParentSelector and after that inside
    // the subnavSelector. The subnav will receive openSubnavClass on open.
    subnavSelector: '.js-submenu',
    // When the subnav triggers, we look for a container parent element, we can place
    // the openSubnavParentClass on. May be the main nav item or any other parent of 
    // the subnav and subnav trigger.
    subnavParentSelector: '.js-menu-item',
    // The placeOpenClassOnSelector will receive this class on main navigation open
    openClass: 'navigation-open',
    // The subnavParentSelector will receive this class on subnavigation open
    openSubnavParentClass: 'submenu-open',
    // The subnavSelector will receive this class on subnavigation open
    openSubnavClass: 'submenu-open',
    /**
    * This callback will be triggered on each triggerSelector click.
    * @param {boolean} navigationOpen Is the main navigation open
    * @param {NodeList} trigger The main navigation trigger nodelist 
    */
    toggleCallback: function( navigationOpen, trigger ){},
    /**
    * This calback will be triggered on each subnavTriggerSelector click.
    * @param {boolean} subnavOpen Was this subnav opened or closed
    * @param {boolean} anySubnavOpen Is at least one subnav open
    * @param {boolean} navigationOpen Is the main navigation open
    * @param {Node} subnav The subnav that has been triggered
    * @param {Node} parent The parent container element which contains the subnav and the trigger
    * @param {NodeList} subnavTrigger The subnav trigger nodelist
    */
    toggleSubnavCallback: function( subnavOpen, anySubnavOpen, navigationOpen, subnav, parent, subnavTrigger ){},
});
```

You may also use `Navigatie.active();` to receive whether the module found at least a trigger or subnavTrigger. It indicates whether the app is somehow actice and may respond to interaction.