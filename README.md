# grunt-available-tasks

Want all of your registered tasks in a nice, alphabetized, colour coded list? Think the task list outputted by `grunt --help` could be more descriptive? `grunt-available-tasks` to the rescue!

## Usage

Using this thing is straightforward. Simply add it to your `package.json` and then register it in your `Gruntfile` through `grunt.loadNpmTasks()`, or the matchdep trick (`require('matchdep').filterDev('grunt-').forEach(grunt.loadNpmTasks)`) or by using load-grunt-tasks (`require('load-grunt-tasks')(grunt)`). You'll then get to run `grunt available_tasks`. No initConfig section for this plugin is required!

From left to right, this plugin outputs the task name, the type of the task, then the description and finally a list of multitask targets should you have configured two or more. The type of the task is registered with arrows:

* `  > ` denotes a single target task.
* ` -> ` denotes a multi target task.
* ` => ` denotes a user defined task.

## What does it look like?

![screenshot](screenshot.png)
