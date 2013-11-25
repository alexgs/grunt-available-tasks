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
                    'predef' : ['describe', 'it']
                }
            },
            options: {
                'expr'              : true,
                'node'              : true,
                'strict'            : true,
                'trailing'          : true,
                'undef'             : true,
                'curly'             : true,
                'eqeqeq'            : true,
                'immed'             : true,
                'latedef'           : true,
                'noarg'             : true,
                'noempty'           : true,
                'unused'            : true,
                'indent'            : 4
            },
        },
        lintspaces: {
            source: {
                src: [
                    'tasks/**/*.js',
                    'test/**/*.js',
                    'lib/**/*.js',
                    'Gruntfile.js',
                    'package.json',
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
    grunt.registerTask('default', 'Run code validation tasks', ['lintspaces', 'jshint', 'jscs', 'mochaTest', 'availabletasks']);
    // Alias availabletasks with tasks for easier typing
    grunt.registerTask('tasks', ['availabletasks']);
    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');
};
