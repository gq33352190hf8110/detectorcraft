/**
 */
var Craft = (function() {
  'use strict';

  var measurements = ['Tracking', 'ECal'];

  var Detector = function() {
    this.components = [];
  };

  Detector.prototype.insertComponent = function(index, component) {
    this.components.splice(index, 0, component);
  };

  Detector.prototype.removeComponent = function(index) {
    return this.components.splice(index, 1);
  };

  Detector.prototype.moveComponent = function(from, to) {
    this.insertComponent(to, this.removeComponent(from));
  };

  Detector.prototype.measureParticle = function(particleId) {
    var performance = {};
    for (var m in measurements) {
      performance[m] = 1.0;
    }
    for (var i=0; i < this.components.length; i++) {
      var comp = this.components[i];
      var meas = comp.measurements[particleId];
      for (var m in measurements) {
        performance[m] *= 1.0 - meas[m];
      }
      if (comp.stops.contains(particleId)) {
        break;
      };
    }
    for (var m in measurements) {
      performance[m] = 1.0 - performance[m];
    }
    return performance;
  };

  return {
    Detector: Detector
  };
}) ();
