'use strict';

// Register `tasks` component, along with its associated controller and template
angular.
  module('tasks').
  component('tasks', {
    templateUrl: 'tasks/tasks.template.html',
    controller: [ 'Task',
      function TasksController(Task) {
        var self = this;

        this.addTask = function() {
          Task.add(this.newTask);
          this.newTask = '';
        }
        this.removeTask = function(task) {
          Task.remove(task);
        }

        this.allTasks = Task.all;

      }
    ]
  });
