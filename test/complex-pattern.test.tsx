import React from 'react';
import { Pattern } from '../src/components/Pattern';
import renderer from 'react-test-renderer';
import { utils } from '../src/index';

describe("Can match complex patterns using Pattern (exact/not/guard conditions)", () => {
    test("Can use .not() function", () => {
        const rendered = renderer.create(
            <>
                <Pattern item="Hello world" to={"Hello city"} not>
                    1{" "}
                </Pattern>
                <Pattern item="Hello world" to={String} not>
                    2{" "}
                </Pattern>
            </>
        );
        expect(rendered.toJSON()?.toString()).toBe("1, ");
    });
    test("Can use guard condition", () => {
        const rendered = renderer.create(
            <>
                <Pattern item="Hello world" to={String} guard={s => s.length > 5}>
                    1{" "}
                </Pattern>
                <Pattern item="Hello world" to={String} guard={s => s.length <= 5}>
                    2{" "}
                </Pattern>
            </>
        );
        expect(rendered.toJSON()?.toString()).toBe("1, ");
    });
    test("Can use deep compare", () => {
        const rendered = renderer.create(
            <>
                <Pattern item={{ a: 5, b: 10 }} to={{ a: 5, b: 10 }} exact>
                    1{" "}
                </Pattern>
                <Pattern item={{ a: 5, b: 10 }} to={{ a: 5 }} exact>
                    2{" "}
                </Pattern>
            </>
        );
        expect(rendered.toJSON()?.toString()).toBe("1, ");
    });
    test("Can use matchto package utilities", () => {
        const rendered = renderer.create(
            <>
                <Pattern item={{ a: 5, b: 10 }} to={utils.Any}>
                    1{" "}
                </Pattern>
                <Pattern item={{ a: 5, b: 10 }} to={{ a: 6 }}>
                    2{" "}
                </Pattern>
            </>
        );
        expect(rendered.toJSON()?.toString()).toBe("1, ");
    });
    test("Can use combination of deep compare and guard", () => {
        const rendered = renderer.create(
            <>
                <Pattern item={{ a: 5, b: 10 }} to={{ a: 5, b: 10 }} exact guard={item => item.a === 5}>
                    1{" "}
                </Pattern>
                <Pattern item={{ a: 5, b: 10 }} to={{ a: 5 }} exact>
                    2{" "}
                </Pattern>
            </>
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
                <Pattern item={arrays[0]} to={null}>
                    null
                </Pattern>
                <Pattern item={arrays[0]} to={[]}>
                    {() => arrays[0]!.length}
                </Pattern>
                <Pattern item={arrays[1]} to={null}>
                    null
                </Pattern>
                <Pattern item={arrays[1]} to={[]}>
                    {() => arrays[1]!.length}
                </Pattern>
            </>
        );
        expect(rendered.toJSON()?.toString()).toBe("3,null");
    });
});