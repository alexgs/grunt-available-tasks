'use strict';

var _ = require('lodash');

// Filtering rules. These are optional, so just log if filter & tasks aren't in the expected format.
function shouldLogTask(filter, tasks, name) {
    if (typeof filter === 'string' && typeof tasks === 'object') {
        var exists = _.indexOf(tasks, name);
        if (filter === 'include' && exists > -1) {
            return true;
        } else if (filter === 'exclude' && exists === -1) {
            return true;
        }
    } else {
        return true;
    }
}

module.exports = shouldLogTask;
