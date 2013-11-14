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
            tasks   = _.sortBy(grunt.task._tasks, 'name'),
            output  = [],
            heading = '',
            options = this.options({
                filter       : false,
                tasks        : false,
                dimmed       : true,
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
        _.each(tasks, function(task) {
            var name    = task.name,
                multi   = (task.multi) ? '->' : '>',
                config  = grunt.config(name),
                targets = '',
                log = function() {

                    // By default, dim availabletasks itself.
                    var formatted = formatOutput({
                            colour  : (options.dimmed) ? !_s.include(name, 'availabletasks') : true,
                            name    : _s.rpad(name, longest.name.length),
                            type    : _s.center(type, 4),
                            info    : task.info,
                            targets : targets
                        });
                    getOutput(output, options.groups, name, formatted);
                },
                // test if the task is a local config or something installed
                type = (_s.include(task.meta.info, 'local Npm module')) ? multi : '=>';
            if (typeof config === 'object' && task.multi) {
                delete config.options;
                var conf = Object.keys(config);
                // No point showing just one multi task target
                if (conf.length > 1) {
                    targets = ' (' + conf.join('|') + ')';
                }
            }
            // Filtering rules. These are optional, so just log if filter & tasks aren't in the expected format.
            if (typeof options.filter === 'string' && typeof options.tasks === 'object') {
                var exists = _.indexOf(options.tasks, name);
                if (options.filter === 'include' && exists > -1) {
                    log();
                } else if (options.filter === 'exclude' && exists === -1) {
                    log();
                }
            } else {
                log();
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
