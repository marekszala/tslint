/*
 * Copyright 2013 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as Lint from "../lint";

describe("<triple-equals>", () => {
    const fileName = "rules/eqeqeq.test.ts";
    const TripleEqualsRule = Lint.Test.getRule("triple-equals");
    let actualFailures: Lint.RuleFailure[];

    before(() => {
        actualFailures = Lint.Test.applyRuleOnFile(fileName, TripleEqualsRule, [true, "allow-null-check"]);
        assert.equal(actualFailures.length, 2);
    });

    it("ensures ===", () => {
        const failureString = TripleEqualsRule.EQ_FAILURE_STRING;
        const expectedFailure = Lint.Test.createFailure(fileName, [4, 33], [4, 35], failureString);

        Lint.Test.assertContainsFailure(actualFailures, expectedFailure);
    });

    it("ensures !==", () => {
        const failureString = TripleEqualsRule.NEQ_FAILURE_STRING;
        const expectedFailure = Lint.Test.createFailure(fileName, [8, 21], [8, 23], failureString);

        Lint.Test.assertContainsFailure(actualFailures, expectedFailure);
    });
});
