'use strict';

var _s    = require('underscore.string'),
    chalk = require('chalk');

function markdownReporter (options) {
    var meta        = options.meta,
        task        = options.currentTask,
        targets     = '',
        indentlevel = '';

    if (meta.header && meta.groupCount) {
        indentlevel = '#';
        console.log('## ' + task.group + '\n');
    }

    if (task.targets.length > 1) {
        targets = indentlevel + '### Targets: `' + task.targets.join('`, `') + '`';
    }

    console.log(indentlevel + '## ' + task.name + '\n' + targets + '\n' + task.info + '\n');
}

function defaultReporter (options) {
    var meta    = options.meta,
        task    = options.currentTask,
        targets = '';

    if (meta.header && meta.groupCount) {
        console.log('\n' + chalk.bold(task.group));
    }

    if (task.targets.length > 1) {
        targets = '(' + task.targets.join('|') + ')';
    }

    console.log(
        chalk.cyan(_s.rpad(task.name, meta.longest)),
        chalk.white(_s.center(task.type, 4)),
        task.info,
        chalk.green(targets)
    );
}

module.exports.default  = defaultReporter;
module.exports.markdown = markdownReporter;
