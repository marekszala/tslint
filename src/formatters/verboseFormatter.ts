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
import {AbstractFormatter} from "../language/formatter/abstractFormatter";

export class Formatter extends AbstractFormatter {
    public format(failures: Lint.RuleFailure[]): string {

        const outputLines = failures.map((failure: Lint.RuleFailure) => {
            const fileName = failure.getFileName();
            const failureString = failure.getFailure();
            const ruleName = failure.getRuleName();

            const lineAndCharacter = failure.getStartPosition().getLineAndCharacter();
            const positionTuple = "[" + (lineAndCharacter.line + 1) + ", " + (lineAndCharacter.character + 1) + "]";

            return `(${ruleName}) ${fileName}${positionTuple}: ${failureString}`;
        });

        return outputLines.join("\n") + "\n";
    }
}
