'use strict';

var _  = require('lodash'),
    _s = require('underscore.string');

function getOutput(output, groups, name, formatted) {
    var hasGroup = false;

    console.log(arguments);

    _.each(Object.keys(groups), function(group) {
        // Use contains to make sure that the task name is an exact match:
        // i.e. we don't want to match tasks and availabletasks as true
        if (_.contains(groups[group], name)) {
            hasGroup = true;
            output.push({ group: _s.capitalize(group), log: formatted });
        }
    });
    if (!hasGroup) {
        if (Object.keys(groups).length > 0) {
            output.push({ group: 'Ungrouped', log: formatted });
        } else {
            output.push({ log: formatted });
        }
    }
}

module.exports = getOutput;
