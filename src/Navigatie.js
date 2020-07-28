window.Navigatie = ( function(){
    var app = {};
    var _init = false;
    var settings = {
      triggerSelector: '.js-menu-trigger',
      subnavTriggerSelector: '.js-submenu-trigger',
      placeOpenClassOnSelector: 'body',
      subnavSelector: '.js-submenu',
      subnavParentSelector: '.js-menu-item',
      openClass: 'navigation-open',
      openSubnavParentClass: 'submenu-open',
      openSubnavClass: 'submenu-open',
      toggleCallback: function( navigationOpen, trigger ){},
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
        console.log( parent, subnav );
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
      console.log( elements, className );
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