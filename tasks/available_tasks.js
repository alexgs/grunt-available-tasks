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
    grunt.registerTask('available_tasks', 'List available Grunt tasks & targets.', function() {
        var _       = grunt.util._,
            tasks   = grunt.task._tasks;

        var longest = _.max(tasks, function(task) {
            return task.name.length;
        });

        _.each(_.sortBy(tasks, ['name']), function(task) {
            var type,
                colour,
                name = task.name,
                multi = (task.multi) ? '->' : '>',
                config = grunt.config(name),
                targets = '';
            // test if the task is a local config or something installed
            if (_.str.include(task.meta.info, 'local Npm module')) {
                type = multi;
            } else {
                type = '=>';
            }
            if (typeof config === 'object' && task.multi) {
                delete config.options;
                var conf = Object.keys(config);
                // No point showing just one multi task target
                if (conf.length > 1) {
                    targets = ' (' + conf.join('|') + ')';
                }
            }
            // Grey out available_tasks itself.
            colour = (name !== 'available_tasks') ? true : false;
            grunt.log.writeln(formatOutput({
                colour :  colour,
                name :    _.rpad(name, longest.name.length),
                type :    _.center(type, 4),
                info :    task.info,
                targets : targets
            }));
        });
    });
};
