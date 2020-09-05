import React from 'react';
import { Pattern } from '../src/components/Pattern';
import renderer from 'react-test-renderer';
import { utils } from '../src';

describe("Can match simple patterns using single pattern component", () => {
    test("Can match string patterns", () => {
        const rendered = renderer.create(
            <>
                <Pattern item="Hello world" to={/^Hello/}>
                    1{" "}
                </Pattern>
                <Pattern item="Hello world" to="Nope">
                    2{" "}
                </Pattern>
                <Pattern item="Hello world" to="Hello world">
                    3
                </Pattern>
            </>
        );
        expect(rendered.toJSON()?.toString()).toBe("1, ,3");
    });
    test("Can match numeric patterns", () => {
        const rendered = renderer.create(
            <>
                <Pattern item={5} to={Number}>
                    1{" "}
                </Pattern>
                <Pattern item={5} to={6}>
                    2{" "}
                </Pattern>
                <Pattern item={5} to={5}>
                    3
                </Pattern>
            </>
        );
        expect(rendered.toJSON()?.toString()).toBe("1, ,3");
    });
    test("Can match Date patterns", () => {
        const date = new Date();
        const wrong = new Date(date);
        wrong.setFullYear(2000);
        const rendered = renderer.create(
            <>
                <Pattern item={date} to={Date}>
                    1{" "}
                </Pattern>
                <Pattern item={date} to={wrong}>
                    2{" "}
                </Pattern>
                <Pattern item={5} to={5}>
                    3
                </Pattern>
            </>
        );
        expect(rendered.toJSON()?.toString()).toBe("1, ,3");
    });
    test("Can perform null checks", () => {
        const arrays = [
            null,
            [1, 2, 3],
            undefined,
        ];
        const rendered = renderer.create(
            <>
                <Pattern item={arrays[0]} to={null}>
                    1{" "}
                </Pattern>
                <Pattern item={arrays[0]} to={[]}>
                    2{" "}
                </Pattern>
                <Pattern item={arrays[0]} to={utils.Any}>
                    3
                </Pattern>
                <Pattern item={arrays[1]} to={null}>
                    4{" "}
                </Pattern>
                <Pattern item={arrays[1]} to={undefined}>
                    5{" "}
                </Pattern>
                <Pattern item={arrays[1]} to={[1, 2]}>
                    6
                </Pattern>
                <Pattern item={arrays[2]} to={undefined}>
                    7{" "}
                </Pattern>
                <Pattern item={arrays[2]} to={[]}>
                    8{" "}
                </Pattern>
                <Pattern item={arrays[2]} to={utils.Any}>
                    9
                </Pattern>
                <Pattern item={null} to={utils.Any}>
                    10
                </Pattern>
            </>
        );
        expect(rendered.toJSON()?.toString()).toBe("1, ,3,6,7, ,9,10");
    });
});