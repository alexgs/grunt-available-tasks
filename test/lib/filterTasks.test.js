/* global describe, it, beforeEach */

'use strict';

var expect = require('chai').expect,
    filterTasks = require('../../lib/filterTasks'),
    tasks;

describe('filterTasks', function () {

    beforeEach(function() {
        tasks = [{
            name : 'available'
        }, {
            name : 'tasks'
        }, {
            name : 'is'
        }, {
            name : 'being'
        }, {
            name : 'tested'
        }];
    });

    it('should pass through if no filter was specified', function() {
        expect(filterTasks(false, false, tasks)).to.equal(tasks);
    });

    it('should pass through if a filter was specified but no tasks were in the list', function() {
        expect(filterTasks(false, [], tasks)).to.equal(tasks);
    });

    it('should exclude tasks from the filter list', function() {
        // Check that the task was removed from the array
        expect(filterTasks('exclude', ['being'], tasks).length).to.equal(4);
    });

    it('should include tasks from the filter list', function() {
        // Check that all tasks but this task was removed from the array
        expect(filterTasks('include', ['tested'], tasks).length).to.equal(1);
    });

});
