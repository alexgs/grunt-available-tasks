# grunt-available-tasks

![screenshot](screenshot.png)

[![Build Status](https://travis-ci.org/ben-eb/grunt-available-tasks.png?branch=master)](https://travis-ci.org/ben-eb/grunt-available-tasks) [![NPM version](https://badge.fury.io/js/grunt-available-tasks.png)](http://badge.fury.io/js/grunt-available-tasks) [![Dependency Status](https://gemnasium.com/ben-eb/grunt-available-tasks.png)](https://gemnasium.com/ben-eb/grunt-available-tasks) [![Code Climate](https://codeclimate.com/github/ben-eb/grunt-available-tasks.png)](https://codeclimate.com/github/ben-eb/grunt-available-tasks)

Want all of your registered tasks in a nice, alphabetized, colour coded list? Think the task list outputted by `grunt --help` could be more descriptive? `grunt-available-tasks` to the rescue!

## Usage

Once the plugin has been installed via `npm install grunt-available-tasks --save-dev`, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-available-tasks');
```

Alternatively, use a plugin such as [https://github.com/sindresorhus/load-grunt-tasks](load-grunt-tasks); specify `require('load-grunt-tasks')(grunt);` in your Gruntfile and you don't need a separate line for every plugin you use. Once installed, simply run `grunt availabletasks`.

Optionally, if you have a long list of tasks and only want to show a subset of those to others who might have cloned your project, you can specify a section in the initConfig to include, or to exclude the tasks you specify. The options are as follows:

### Options

#### options.filter
Type: `String`
Default value: `false`

Define either 'include', or 'exclude'.

#### options.tasks
Type: `Object`
Default value: `false`

The list of tasks to either include or exclude.

#### options.dimmed (DEPRECATED)
Type: `Boolean`
Default value: `true`

Whether to grey out availabletasks from the list or not. _This feature has been deprecated and will be removed from 0.4.x; if you don't want `availabletasks` to show, simply list it in your filter config_.

#### options.groups
Type: `Object`
Default value: `{}` (empty)

You may choose to group similar tasks if you'd like. See below for an example configuration.

#### options.descriptions
Type: `Object`
Default value: `{}` (empty)

Override any task name, including aliases, with any description that you like. See below for an example configuration.

#### options.sort
Type: `Boolean|Object`
Default value: `true`

Setting this to `false` will maintain the original sort order for the tasks. `true` will sort alphabetically, and specifying an object will allow you to do your own custom sorting. See below for an example configuration.

### Filter configuration

Running `availabletasks` in this project will show only the `availabletasks` and `default` tasks.

    availabletasks: {
        options: {
            filter: 'include',
            tasks: ['availabletasks', 'default']
        }
    }

The filter configuration will override the group, description and sort configurations; so if you have filtered out a task it will not show up in any groups, it won't receive a custom description and it won't appear at the top of your task list.

### Group configuration

In this project, we group similar tasks together under a heading, so that newcomers to the code will know what the tasks are for.

    availabletasks: {
        options: {
            groups: {
                'Run code validation tasks': ['lintspaces', 'jshint', 'jscs']
            }
        }
    }

Additionally, the same task can appear in multiple groups.

### Description configuration

Descriptions for tasks in this project have been replaced with our own custom descriptions.

    availabletasks: {
        options: {
            descriptions: {
                'availabletasks' : 'A really nice task list helper for your Grunt enabled projects.'
            }
        }
    }

### Sort configuration

In this project, we want `lintspaces`, then `availabletasks` to show at the top of the list:

    availabletasks: {
        options: {
            sort: ['lintspaces', 'availabletasks']
        }
    }

## Output

From left to right, this plugin outputs the task name, the type of the task, then the description and finally a list of multitask targets should you have configured two or more. The type of the task is registered with arrows:

* `  > ` denotes a single target task.
* ` -> ` denotes a multi target task.
* ` => ` denotes a user defined task.
