# grunt-available-tasks

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

### Sample configuration

In this project, running `availabletasks` will exclude *jshint* and *lintspaces* and list `availabletasks` and `default`. Changing the filter to *include* would exclude `availabletasks` and `default`.

    availabletasks: {
        options: {
            filter: 'exclude',
            tasks: ['jshint', 'lintspaces']
        }
    }

## Output

From left to right, this plugin outputs the task name, the type of the task, then the description and finally a list of multitask targets should you have configured two or more. The type of the task is registered with arrows:

* `  > ` denotes a single target task.
* ` -> ` denotes a multi target task.
* ` => ` denotes a user defined task.

## What does it look like?

![screenshot](screenshot.png)
