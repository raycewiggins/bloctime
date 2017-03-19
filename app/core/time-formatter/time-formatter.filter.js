'use strict';

//formats seconds to minutes in 00:00 format
angular.
  module('core').
  filter('timeFormatter', function() {
    return function(timeInSeconds) {
      return(timeInSeconds-(timeInSeconds%=60))/60+(9<timeInSeconds?':':':0')+timeInSeconds
    };
  });
