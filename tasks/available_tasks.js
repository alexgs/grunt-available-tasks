/*
 * grunt-available-tasks
 * https://github.com/ben-eb/grunt-available-tasks
 *
 * Copyright (c) 2013-2014 Ben Briggs
 * Licensed under the MIT license.
 */

'use strict';

var _  = require('lodash'),
    _s = require('underscore.string');

function setTaskInfo(grunt, name, info) {
    grunt.task._tasks[name].info = info;
}

module.exports = function(grunt) {
    grunt.registerMultiTask('availabletasks', 'List available Grunt tasks & targets.', function() {
        var getOutput   = require('../lib/get_output'),
            filterTasks = require('../lib/filterTasks'),
            ids         = require('../lib/taskIdentifiers'),
            reporter    = require('../lib/reporters'),
            output      = [],
            header      = '',
            options     = this.options({
                filter       : false,
                tasks        : false,
                sort         : true,
                groups       : {},
                descriptions : {},
                showTasks    : ['single', 'multi', 'user'],
                reporter     : 'default'
            }),
            // Delete tasks that don't pass a filter
            tasks = filterTasks(options.filter, options.tasks, grunt.task._tasks);

        // Override descriptions with our own values
        _.each(Object.keys(options.descriptions), function(description) {
            setTaskInfo(grunt, description, options.descriptions[description]);
        });
        // Sort the tasks by name if sorting is enabled
        if (options.sort !== false) {
            tasks = _.sortBy(tasks, 'name');
        }
        // Did we define a custom sort?
        if (typeof options.sort === 'object') {
            tasks = _.sortBy(tasks, function(task) {
                var index = _.indexOf(options.sort, task.name);
                return (index === -1) ? options.sort.length : index;
            });
        }
        _.each(tasks, function(task) {
            var name    = task.name,
                config  = grunt.config(name),
                targets = [],
                type    = ids.user;
            // test if the task is a local config or something installed
            if (_s.include(task.meta.info, 'local Npm module')) {
                type = (task.multi) ? ids.multi : ids.single;
            }
            // Delete global options from the task targets
            if (typeof config === 'object' && task.multi) {
                delete config.options;
                targets = Object.keys(config);
            }
            // Get the output of the task
            var allowedTypes = _.map(Object.keys(ids), function(id) {
                if (_.contains(options.showTasks, id)) {
                    return ids[id];
                }
            });
            if (_.contains(allowedTypes, type)) {
                getOutput(output, options.groups, {
                    name    : task.name,
                    type    : type,
                    info    : task.info,
                    targets : targets
                });
            }
        });
        _.chain(output)
            .sortBy(function(value) {
                return (value.group === 'Ungrouped') ? 1 : 0;
            })
            .groupBy('group')
            .each(function(group) {
                header = group.group;
                _.each(group, function(o) {
                    var reportoptions = {
                        currentTask : o,
                        meta        : {
                            taskCount  : Object.keys(tasks).length,
                            groupCount : Object.keys(options.groups).length,
                            header     : header !== '',
                            longest    : _.max(tasks, function(task) {
                                return task.name.length;
                            }).name.length
                        }
                    };
                    header = '';
                    if (typeof options.reporter === 'function') {
                        options.reporter(reportoptions);
                    } else {
                        reporter(grunt, options.reporter, reportoptions);
                    }
                });
            });
    });
};
