'use strict';

var expect = require('chai').expect,
    getOutput = require('../../lib/get_output');

describe('getOutput', function () {

    it('handles the case when there are no groups', function () {
        var output = [],
            formatted = 'formatted default task name';
        getOutput(output, {}, 'default', formatted);

        expect(output).to.have.length(1);
        expect(output[0]).to.eql({
            log : formatted
        });
    });

    it('adds multiple tasks when there are no groups', function () {
        var output = [],
            formatted1 = 'formatted default task name 1',
            formatted2 = 'formatted default task name 2';

        getOutput(output, {}, 'default', formatted1);
        getOutput(output, {}, 'default', formatted2);

        expect(output).to.have.length(2);
        expect(output).to.eql([
            {
                log : formatted1
            },
            {
                log : formatted2
            }
        ]);
    });

    it('handles the case where there are groups', function () {
        var output = [],
            groupedTaskName = 'grouped-task',
            ungroupedTaskName = 'ungrouped-task',
            formattedInGroup = 'formatted task in group',
            formattedUngrouped = 'formatted task ungrouped',
            groups = {
                groupA : [groupedTaskName]
            };

        getOutput(output, groups, groupedTaskName, formattedInGroup);
        getOutput(output, groups, ungroupedTaskName, formattedUngrouped);

        expect(output).to.have.length(2);
        expect(output).to.eql([
            {
                group : 'GroupA',
                log   : formattedInGroup
            },
            {
                group : 'Ungrouped',
                log   : formattedUngrouped
            }
        ]);
    });

});
