import React from 'react';
import { Match } from '../src/components/Match';
import { Case } from '../src/components/Case';
import renderer from 'react-test-renderer';
import { utils } from '../src/index';

describe("Can match complex patterns using match (exact/not/guard conditions)", () => {
    test("Can use .not() function", () => {
        const rendered = renderer.create(
            <Match item="Hello world">
                <Case pattern={Number} not>
                    1{" "}
                </Case>
                <Case pattern={String} not>
                    2{" "}
                </Case>
            </Match>
        );
        expect(rendered.toJSON()?.toString()).toBe("1, ");
    });
    test("Can use guard condition", () => {
        const rendered = renderer.create(
            <Match item="Hello world">
                <Case pattern={String} guard={s => s.length > 5}>
                    1{" "}
                </Case>
                <Case pattern={String} guard={s => s.length <= 5}>
                    2{" "}
                </Case>
            </Match>
        );
        expect(rendered.toJSON()?.toString()).toBe("1, ");
    });
    test("Can use deep compare", () => {
        const rendered = renderer.create(
            <Match item={{ a: 5, b: 10 }}>
                <Case pattern={{ a: 5, b: 10 }} exact>
                    1{" "}
                </Case>
                <Case pattern={{ a: 5 }} exact>
                    2{" "}
                </Case>
            </Match>
        );
        expect(rendered.toJSON()?.toString()).toBe("1, ");
    });
    test("Can use prolog-like cut", () => {
        const rendered = renderer.create(
            <Match item={{ a: 5, b: 10 }} kind="all">
                <Case pattern={{ a: 5, b: 10 }} cut>
                    1{" "}
                </Case>
                <Case pattern={{ a: 5 }}>
                    2{" "}
                </Case>
            </Match>
        );
        expect(rendered.toJSON()?.toString()).toBe("1, ");
    });
    test("Can use matchto package utilities", () => {
        const rendered = renderer.create(
            <Match item={{ a: 5, b: 10 }}>
                <Case pattern={utils.Any}>
                    1{" "}
                </Case>
                <Case pattern={{ a: 6 }}>
                    2{" "}
                </Case>
            </Match>
        );
        expect(rendered.toJSON()?.toString()).toBe("1, ");
    });
    test("Can use 'last' kind of match", () => {
        const rendered = renderer.create(
            <Match item={{ a: 5, b: 10 }} kind="last">
                <Case pattern={utils.Any}>
                    1{" "}
                </Case>
                <Case pattern={utils.Any}>
                    2{" "}
                </Case>
            </Match>
        );
        expect(rendered.toJSON()?.toString()).toBe("2, ");
    });
    test("Can use combination of deep compare and guard", () => {
        const rendered = renderer.create(
            <Match item={{ a: 5, b: 10 }}>
                <Case pattern={{ a: 5, b: 10 }} exact guard={item => (item as { a: number, b: number }).a === 5}>
                    1{" "}
                </Case>
                <Case pattern={{ a: 5 }} exact>
                    2{" "}
                </Case>
            </Match>
        );
        expect(rendered.toJSON()?.toString()).toBe("1, ");
    });
    test("Can use delayed execution to prevent errors on render", () => {
        const arrays = [
            [1, 2, 3],
            null,
        ];
        const rendered = renderer.create(
            <>
                <Match item={arrays[0]}>
                    <Case pattern={null}>
                        null
                    </Case>
                    <Case pattern={[]}>
                        {() => arrays[0]!.length}
                    </Case>
                </Match>
                <Match item={arrays[1]}>
                    <Case pattern={null}>
                        null
                    </Case>
                    <Case pattern={[]}>
                        {() => arrays[1]!.length}
                    </Case>
                </Match>
            </>
        );
        expect(rendered.toJSON()?.toString()).toBe("3,null");
    });
    test("Can create recursive pattern match", () => {
        const rendered = renderer.create(
            <Match item={[1, 2, 3, 4]}>
                <Case pattern={[]} exact></Case>
                <Case pattern={[utils.Any]} rematch={item => item.slice(1)}>
                    {(items: number[]) => items[0]}
                </Case>
            </Match>
        );
        expect(rendered.toJSON()?.toString()).toBe("1,2,3,4");
    });
});