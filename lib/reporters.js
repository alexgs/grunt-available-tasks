'use strict';

var _s = require('underscore.string');

function writeConsoleOutput(grunt, t, m, targets) {
    grunt.log.writeln(_s.rpad(t.name, m.longest).cyan + _s.center(t.type, 4).white + t.info + targets.green);
}

function consoleLogWriter(grunt, t, m, displayAll) {
    var targets = '';

    if (m.header !== false && m.groupCount > 0) {
        grunt.log.subhead(t.group);
    }
    if (t.targets.length > 1) {
        targets = ' (' + t.targets.join('|') + ')';
    }
    if (!displayAll) {
        if (t.type === '=>') {
            writeConsoleOutput(grunt, t, m, targets);
        }
    } else {
        writeConsoleOutput(grunt, t, m, targets);
    }
}

module.exports = function(grunt, reporter, options) {
    var t       = options.currentTask,
        m       = options.meta,
        targets = '';
    if (reporter === 'default') {
        consoleLogWriter(grunt, t, m, true);
    } else if (reporter === 'markdown') {
        var indentlevel = '';
        if (m.header !== false && m.groupCount > 0) {
            indentlevel = '#';
            grunt.log.writeln('## ' + t.group + '\n');
        }
        if (t.targets.length > 1) {
            targets = indentlevel + '### Targets: `' + t.targets.join('`, `') + '`';
        }
        grunt.log.writeln(indentlevel + '## ' + t.name + '\n' + targets + '\n' + t.info + '\n');
    } else if (reporter === 'project') {
        consoleLogWriter(grunt, t, m, false);
    }
};
