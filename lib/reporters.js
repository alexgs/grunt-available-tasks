'use strict';

var _s = require('underscore.string');

module.exports = function(grunt, reporter, options) {
    var t       = options.currentTask,
        m       = options.meta,
        targets = '';
    if (reporter === 'default') {
        if (m.header && m.groupCount) {
            grunt.log.subhead(t.group);
        }
        if (t.targets.length > 1) {
            targets = ' (' + t.targets.join('|') + ')';
        }
        grunt.log.writeln(_s.rpad(t.name, m.longest).cyan + _s.center(t.type, 4).white + t.info + targets.green);
    } else if (reporter === 'markdown') {
        var indentlevel = '';
        if (m.header && m.groupCount) {
            indentlevel = '#';
            grunt.log.writeln('## ' + t.group + '\n');
        }
        if (t.targets.length > 1) {
            targets = indentlevel + '### Targets: `' + t.targets.join('`, `') + '`';
        }
        grunt.log.writeln(indentlevel + '## ' + t.name + '\n' + targets + '\n' + t.info + '\n');
    }
};
