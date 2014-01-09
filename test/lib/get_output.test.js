/* global describe, it, beforeEach */

'use strict';

var expect = require('chai').expect,
    getOutput = require('../../lib/get_output');

describe('getOutput', function () {

    beforeEach(function() {
        this.output = [];
        this.task   = {
            name : 'mocha'
        };
    });

    it('handles the case when there are no groups', function () {
        getOutput(this.output, {}, this.task);
        expect(this.output).to.have.length(1);
        expect(this.output[0].name).to.eql('mocha');
    });

    it('handles the case where there are groups', function () {
        var groups = {
            'Lint tools' : ['jshint', 'mocha']
        };
        getOutput(this.output, groups, this.task);
        getOutput(this.output, groups, {
            name : 'jshint'
        });

        expect(this.output).to.have.length(2);
        expect(this.output[1].group).to.eql('Lint tools');
    });
});
