'use strict';

// Register `timer` component, along with its associated controller and template
angular.
  module('timer').
  component('timer', {
    templateUrl: 'timer/timer.template.html',
    controller: [ '$interval',
      function TimerController($interval) {
        var self = this;

        //initial conditions
        this.workTime = 5;
        this.breakTime = 3;
        this.timerIsOff = true;
        this.currentSeconds = this.workTime;
        this.breakPossible = false;
        this.onBreak = false;
        this.completedSessions = 0;
        this.longerBreakTime = 8;
        this.mySound = new buzz.sound( "timer/ding.mp3", {
          preload: true
        });

        //starts the timer and contains a method to reset it
        this.timerStart = function() {
            var promise = $interval(function() {
              self.currentSeconds -= 1;
              self.timerIsOff = false;
              if (self.currentSeconds === 0) {
                self.breakPossible = true;
                self.completedSessions += 1;
                self.mySound.play();
              }
            }, 1000, self.currentSeconds);

            this.timerReset = function() {
              $interval.cancel(promise);
              self.currentSeconds = self.workTime;
              self.timerIsOff = true;
              self.breakPossible = false;
            };
        };

        //starts the timer for breaks and contains a method to reset it
        this.breakTimer = function() {
          if (this.completedSessions === 4) {
            this.currentSeconds = this.longerBreakTime;
            this.completedSessions = 0;
          } else {
            this.currentSeconds = this.breakTime;
          }
          this.canCancel = true;
          this.onBreak = true;

          var promise = $interval(function() {
            self.currentSeconds -= 1;
            self.timerIsOff = false;

            if (self.currentSeconds === 0) {
              self.canCancel = false;
              self.onBreak = false;
              self.mySound.play();
            } else {
              self.canCancel = true;
            }
          }, 1000, self.currentSeconds);

          this.breakReset = function() {
            $interval.cancel(promise);
            self.currentSeconds = self.breakTime;
            self.timerIsOff = true;
            self.canCancel = false;
          };
        };
      }
    ]
  });
