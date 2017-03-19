'use strict';

angular.
  module('core.task').
  factory('Task', ['$firebaseArray',
    function($firebaseArray) {
      var ref = firebase.database().ref();

      // download tasks into a synchronized array
      var tasks = $firebaseArray(ref);

      return {
        all: tasks,
        add: function(task) {
          this.all.$add(task)
        },
        remove: function(task) {
          this.all.$remove(task)
        }
        // remaining logic for tasks
      };
    }
  ]);
