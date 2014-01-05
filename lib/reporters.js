'use strict';

var _s = require('underscore.string');

module.exports = function(grunt, reporter, options) {
    var t       = options.currentTask,
        m       = options.meta,
        targets = '';
    if (reporter === 'default') {
        if (m.header !== false && m.groupCount > 0) {
            grunt.log.subhead(t.group);
        }
        if (t.targets.length > 1) {
            targets = ' (' + t.targets.join('|') + ')';
        }
        grunt.log.writeln(_s.rpad(t.name, m.longest).cyan + _s.center(t.type, 4).white + t.info + targets.green);
    }
};
