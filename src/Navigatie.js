/*!
 * Navigatie v0.1.2
 * Track viewport changes and react to them via callbacks
 * MIT License
 */
window.Navigatie = ( function(){
    var app = {};
    var _init = false;
    var settings = {
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
    };
    var trigger = false;
    var subnavTrigger = false;
    var placeOpenClassOn = false;
    var active = false;
    var navigationOpen = false;
    var anySubnavOpen = false;
    var subnavOpenCounter = 0;
  
    app.init = function( options ) {
      if(_init){return;}
      _init = true;
      // extend settings by options
      settings = Object.assign(settings, options);
  
      trigger = $$( settings.triggerSelector );
      subnavTrigger = $$( settings.subnavTriggerSelector );
  
      if( trigger.length > 0 || subnavTrigger.length > 0 ) {
        placeOpenClassOn = $$(settings.placeOpenClassOnSelector);
        on(trigger, 'click', toggleEvent );
        on(subnavTrigger, 'click', toggleSubnavEvent );
        active = true;
      }
    };
  
    app.active = function() {
      return active;
    };
  
    var toggleEvent = function( e ) {
      if( navigationOpen ) {
        removeClass(placeOpenClassOn, settings.openClass);
        navigationOpen = false;
      }
      else {
        addClass(placeOpenClassOn, settings.openClass);
        navigationOpen = true;
      }
      if( typeof settings.toggleCallback === 'function' ) {
        settings.toggleCallback( navigationOpen, trigger );
      }
    };
  
    var toggleSubnavEvent = function( e ) {
      e.preventDefault();
      var parent = closest( this, settings.subnavParentSelector );
      if( parent !== null ) {
        var subnavOpen = hasClass( parent, settings.openSubnavParentClass );
        var subnav = parent.querySelectorAll(settings.subnavSelector);
        if( subnavOpen ) {
          parent.classList.remove( settings.openSubnavParentClass );
          removeClass( subnav, settings.openSubnavClass );
          subnavOpenCounter--;
          updateAnySubnavOpen();
        }
        else {
          parent.classList.add( settings.openSubnavParentClass );
          addClass( subnav, settings.openSubnavClass );
          subnavOpenCounter++;
          updateAnySubnavOpen();
        }
        if( typeof settings.toggleSubnavCallback === 'function' ) {
          settings.toggleSubnavCallback( subnavOpen, anySubnavOpen, navigationOpen, subnav, parent, subnavTrigger );
        }
      }
    };
  
    var updateAnySubnavOpen = function() {
      if( subnavOpenCounter > 0 ) {
        anySubnavOpen = true;
      }
      else {
        anySubnavOpen = false;
      }
    }
  
    var $$ = function( selector ) {
      return document.querySelectorAll( selector );
    }
  
    var on = function( nodeList, type, functionName ) {
      for (var i = 0, len = nodeList.length; i < len; i++) {
        nodeList[i].addEventListener(type, functionName, false);
      }
    };
  
    function closest(el, selector) {
      var matchesFn;
  
      // find vendor prefix
      ['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn) {
        if (typeof document.body[fn] == 'function') {
          matchesFn = fn;
          return true;
        }
        return false;
      })
  
      var parent;
  
      // same element?
      if( el[matchesFn](selector) ) {
        return el;
      }
  
      // traverse parents
      while (el) {
        parent = el.parentElement;
        if (parent && parent[matchesFn](selector)) {
          return parent;
        }
        el = parent;
      }
  
      return null;
    }
  
    var addClass = function( elements, className ) {
      for( var i = 0, len = elements.length; i < len; i++) {
        elements[i].classList.add( className );
      }
    };
  
    var removeClass = function( elements, className ) {
      for( var i = 0, len = elements.length; i < len; i++) {
        elements[i].classList.remove( className );
      }
    };
  
    var hasClass = function( element, className ) {
      return element.classList.contains( className );
    }
  
    return app;
  
  })();