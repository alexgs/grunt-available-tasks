'use strict';

var _  = require('lodash'),
    _s = require('underscore.string');

function getOutput (output, groups, taskOptions, hideUngrouped) {
    var hasGroup = false;
    Object.keys(groups).forEach(function (group) {
        // Use contains to make sure that the task name is an exact match:
        // i.e. we don't want to match tasks and availabletasks as true
        if (_.contains(groups[group], taskOptions.name)) {
            hasGroup = true;
            var newobj = _.clone(taskOptions);
            output.push(_.extend(newobj, {
                group : _s.capitalize(group)
            }));
        }
    });
    if (!hasGroup) {
        if (Object.keys(groups).length) {
            if (!hideUngrouped) {
                output.push(_.extend(taskOptions, {
                    group : 'Ungrouped'
                }));
            }
        } else {
            output.push(taskOptions);
        }
    }
}

module.exports = getOutput;
