/*
 * grunt-available-tasks
 * https://github.com/ben-eb/grunt-available-tasks
 *
 * Copyright (c) 2013 Ben Briggs
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        jscs: {
            options: {
                config: '.jscs.json'
            },
            source: [
                'lib/**/*.js',
                'tasks/**/*.js',
                'test/**/*.js'
            ]
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/**/*.js',
                'lib/**/*.js'
            ],
            test: {
                src: ['test/**/*.js'],
                options: {
                    'predef' : ['describe', 'it', 'beforeEach']
                }
            },
            options: {
                jshintrc: true
            },
        },
        lintspaces: {
            source: {
                src: [
                    'tasks/**/*.js',
                    'test/**/*.js',
                    'lib/**/*.js',
                    'Gruntfile.js',
                    'README.md'
                ],
                options: {
                    newline         : true,
                    trailingspaces  : true,
                    indentation     : 'spaces',
                    spaces          : 4,
                    ignores         : ['js-comments']
                }
            }
        },
        availabletasks: {
            options: {
                filter: 'include',
                tasks: ['tasks', 'default'],
                sort: ['tasks']
            },
            defaultreporter: {},
            markdownreporter: {
                options: {
                    reporter: 'markdown'
                }
            },
            customreporter: {
                options: {
                    reporter: function(options) {
                        grunt.log.writeln(options.currentTask.name);
                    }
                }
            }
        },
        mochaTest: {
            unit: ['test/lib/**/*.js'],
            options: {
                reporter: 'spec'
            }
        }
    });
    // Lint all the things
    grunt.registerTask('default', 'Run code validation tasks', ['lintspaces', 'jshint', 'jscs', 'mochaTest', 'tasks']);
    // Alias availabletasks with tasks for easier typing
    grunt.registerTask('tasks', ['availabletasks:defaultreporter']);
    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');
};
