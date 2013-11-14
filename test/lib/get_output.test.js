'use strict';

var expect = require('chai').expect,
    getOutput = require('../../lib/get_output');

describe('getOutput', function() {

    it('handles the case where there are no groups', function() {
        var output = [],
            formatted = 'formatted default task name';
        getOutput(output, {}, 'default', formatted);

        expect(output).to.have.length(1);
        expect(output[0]).to.eql({
            log: formatted
        });
    });

});