/*
 * grunt-available-tasks
 * https://github.com/ben-eb/grunt-available-tasks
 *
 * Copyright (c) 2013 Ben Briggs
 * Licensed under the MIT license.
 */

'use strict';

function formatOutput(opts) {
    return (opts.colour) ? opts.name.cyan + opts.type.white + opts.info + opts.targets.green : (opts.name + opts.type + opts.info + opts.targets).grey;
}

module.exports = function(grunt) {
    grunt.registerTask('availabletasks', 'List available Grunt tasks & targets.', function() {
        var _       = grunt.util._,
            _s      = _.str,
            tasks   = grunt.task._tasks,
            options = this.options({
                filter : false,
                tasks  : false,
                dimmed : true
            }),
            longest = _.max(tasks, function(task) {
                return task.name.length;
            });

        _.each(_.sortBy(tasks, ['name']), function(task) {
            var name    = task.name,
                multi   = (task.multi) ? '->' : '>',
                config  = grunt.config(name),
                targets = '',
                log = function() {
                    // By default, dim availabletasks itself.
                    grunt.log.writeln(formatOutput({
                        colour  : (options.dimmed) ? !_s.include(name, 'availabletasks') : true,
                        name    : _.rpad(name, longest.name.length),
                        type    : _.center(type, 4),
                        info    : task.info,
                        targets : targets
                    }));
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
    });
};
