/*
 * grunt-available-tasks
 * https://github.com/ben-eb/grunt-available-tasks
 *
 * Copyright (c) 2013 Ben Briggs
 * Licensed under the MIT license.
 */

'use strict';

var _  = require('lodash'),
    _s = require('underscore.string');

function formatOutput(opts) {
    return (opts.colour) ? opts.name.cyan + opts.type.white + opts.info + opts.targets.green : (opts.name + opts.type + opts.info + opts.targets).grey;
}

function setTaskInfo(grunt, name, info) {
    grunt.task._tasks[name].info = info;
}

module.exports = function(grunt) {
    grunt.registerTask('availabletasks', 'List available Grunt tasks & targets.', function() {
        var getOutput = require('../lib/get_output'),
            shouldLogTask = require('../lib/should_log_task'),
            ids = require('../lib/taskIdentifiers'),
            tasks   = grunt.task._tasks,
            output  = [],
            heading = '',
            options = this.options({
                filter       : false,
                tasks        : false,
                dimmed       : true,
                sort         : true,
                groups       : {},
                descriptions : {}
            }),
            longest = _.max(tasks, function(task) {
                return task.name.length;
            });
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
                targets = '',
                // test if the task is a local config or something installed
                type = (_s.include(task.meta.info, 'local Npm module')) ? (task.multi) ? ids.singleTarget : ids.multiTarget : ids.userDefined;

            if (typeof config === 'object' && task.multi) {
                delete config.options;
                var conf = Object.keys(config);
                // No point showing just one multi task target
                if (conf.length > 1) {
                    targets = ' (' + conf.join('|') + ')';
                }
            }

            if (shouldLogTask(options.filter, options.tasks, name)) {
                // By default, dim availabletasks itself.
                getOutput(output, options.groups, name, formatOutput({
                    colour  : (options.dimmed) ? !_s.include(name, 'availabletasks') : true,
                    name    : _s.rpad(name, longest.name.length),
                    type    : _s.center(type, 4),
                    info    : task.info,
                    targets : targets
                }));
            }
        });
        output = _.sortBy(output, 'group');
        _.each(output, function(o) {
            // Make sure that we defined some groups
            if (heading !== o.group && typeof o.group !== 'undefined') {
                grunt.log.subhead(o.group);
                heading = o.group;
            }
            grunt.log.writeln(o.log);
        });
    });
};
