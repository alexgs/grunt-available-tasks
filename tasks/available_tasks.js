/*
 * grunt-available-tasks
 * https://github.com/ben-eb/grunt-available-tasks
 *
 * Copyright (c) 2013-2015 Ben Briggs
 * Licensed under the MIT license.
 */

'use strict';

var filterTasks = require('../lib/filterTasks'),
    getOutput   = require('../lib/get_output'),
    reporter    = require('../lib/reporters'),
    ids         = require('../lib/taskIdentifiers'),
    _           = require('lodash');

module.exports = function (grunt) {
    grunt.registerMultiTask('availabletasks', 'List available Grunt tasks & targets.', function () {
        var output  = [],
            header  = '',
            options = this.options({
                filter        : false,
                tasks         : false,
                sort          : true,
                hideUngrouped : false,
                groups        : {},
                descriptions  : {},
                showTasks     : ['single', 'multi', 'user'],
                reporter      : 'default'
            }),
            // Delete tasks that don't pass a filter
            tasks = filterTasks(options.filter, options.tasks, grunt.task._tasks);

        // Override descriptions with our own values
        Object.keys(options.descriptions).forEach(function (description) {
            var task = _.find(tasks, { name : description });
            if (task) {
                task.info = options.descriptions[description];
            }
        });
        // Sort the tasks by name if sorting is enabled
        if (options.sort) {
            tasks = _.sortBy(tasks, 'name');
        }
        // Did we define a custom sort?
        if (options.sort instanceof Array) {
            tasks = _.sortBy(tasks, function (task) {
                var index = options.sort.indexOf(task.name);
                return (!~index) ? options.sort.length : index;
            });
        }
        _.each(tasks, function (task) {
            var name    = task.name,
                config  = grunt.config.getRaw(name),
                targets = [],
                type    = ids.user;
            // test if the task is a local config or something installed
            if (~task.meta.info.indexOf('local Npm module')) {
                type = (task.multi) ? ids.multi : ids.single;
            }
            // Delete global options from the task targets
            if (typeof config === 'object' && task.multi) {
                delete config.options;
                targets = Object.keys(config);
            }
            // Get the output of the task
            var allowedTypes = _.map(Object.keys(ids), function (id) {
                if (_.includes(options.showTasks, id)) {
                    return ids[id];
                }
            });
            if (_.includes(allowedTypes, type)) {
                getOutput(output, options.groups, {
                    name    : task.name,
                    type    : type,
                    info    : task.info,
                    targets : targets
                }, options.hideUngrouped);
            }
        });
        _.chain(output)
            .sortBy(function (value) {
                return (value.group === 'Ungrouped') ? 1 : 0;
            })
            .groupBy('group')
            .each(function (group) {
                header = group.group;
                _.each(group, function (o) {
                    var reportoptions = {
                        currentTask : o,
                        meta        : {
                            taskCount  : Object.keys(tasks).length,
                            groupCount : Object.keys(options.groups).length,
                            header     : header !== '',
                            longest    : _.maxBy(tasks, function (task) {
                                return task.name.length;
                            }).name.length
                        }
                    };
                    header = '';
                    var reportFn = (typeof options.reporter === 'function') ? options.reporter : reporter[options.reporter];
                    reportFn.call(this, reportoptions);
                });
            })
            .value();
    });
};
