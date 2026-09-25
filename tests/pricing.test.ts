import {test} from 'node:test';import assert from 'node:assert/strict';import {calculate} from '../lib/pricing';
test('discounted subtotal controls free shipping',()=>{assert.deepEqual(calculate(120000,20000),{subtotal:120000,discount:20000,shipping:0,tax:0,total:100000});assert.equal(calculate(100000,1).shipping,9900)});
