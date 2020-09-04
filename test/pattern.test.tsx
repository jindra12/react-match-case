import React from 'react';
import { Pattern } from '../src/components/Pattern';
import renderer from 'react-test-renderer';

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
});