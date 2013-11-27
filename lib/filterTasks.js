'use strict';

var _ = require('lodash');

// Filtering rules are optional; delete those tasks that don't pass a filter
function filterTasks(type, tasks, alltasks) {
    if (type === 'include') {
        return (_.filter(alltasks, function(task) {
            return _.contains(tasks, task.name);
        }));
    } else if (type === 'exclude') {
        return (_.reject(alltasks, function(task) {
            return _.contains(tasks, task.name);
        }));
    }
    return alltasks;
}

module.exports = filterTasks;
