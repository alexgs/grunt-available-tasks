'use strict';

var _ = require('lodash');

// Filtering rules are optional; delete those tasks that don't pass a filter
function filterTasks (type, tasks, alltasks) {
    var contains = function (task) {
        return _.includes(tasks, task.name);
    };

    if (type === 'include') {
        return _.filter(alltasks, contains);
    } else if (type === 'exclude') {
        return _.reject(alltasks, contains);
    }
    return alltasks;
}

module.exports = filterTasks;
