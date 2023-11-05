const assert = require("assert")
const { createSandbox } = require ("sinon")
const Fibonacci = require("./fibonacci")

const sinon = createSandbox()
const fibonacci = new Fibonacci()

;(async () => {
  {
    const spy = sinon.spy(
      fibonacci,
      fibonacci.execute.name
    )

    for (const sequence of fibonacci.execute(5)) { }
    const expectedCallCount = 6
    assert.strictEqual(spy.callCount, expectedCallCount)
    const expectedParams = [3, 1, 2]
    const { args } = spy.getCall(2)
    assert.deepStrictEqual(args, expectedParams)
  }

})()