'use strict';

var expect = require('chai').expect,
    shouldLogTask = require('../../lib/should_log_task');

describe('shouldLogTask', function () {

    it('should log the task if filter is not a string', function() {
        expect(shouldLogTask(null, [], 'foo')).to.equal(true);
    });

    it('should log the task if tasks is not an object', function() {
        expect(shouldLogTask('exclude', null, 'foo')).to.equal(true);
    });

    it('should log the task if filter = include and tasks does include this task', function() {
        var taskName = 'task-foo';
        expect(shouldLogTask('include', [taskName], taskName)).to.equal(true);
    });

    it('should not log the task if filter = include and tasks does not include this task', function() {
        var taskName = 'task-foo';
        expect(shouldLogTask('include', [], taskName)).to.not.be.ok;
    });

    it('should not log the task if filter = exclude and tasks does include this task', function() {
        var taskName = 'task-foo';
        expect(shouldLogTask('exclude', [taskName], taskName)).to.not.be.ok;
    });

    it('should log the task if filter = exclude and tasks does not include this task', function() {
        var taskName = 'task-foo';
        expect(shouldLogTask('exclude', [], taskName)).to.equal(true);
    });

});