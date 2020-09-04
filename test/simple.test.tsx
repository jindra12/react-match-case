import React from 'react';
import { Match } from '../src/components/Match';
import { Case } from '../src/components/Case';
import renderer from 'react-test-renderer';

describe("Can match simple patterns", () => {
    test("Won't crash on empty match", () => {
        const rendered = renderer.create(
            <Match item="Hello world" kind="all">
            </Match>
        );
        expect(rendered.toJSON()?.toString()).toBeFalsy();
    });
    test("Can match string patterns", () => {
        const rendered = renderer.create(
            <Match item="Hello world" kind="all">
                <Case pattern={/^Hello/}>
                    1{" "}
                </Case>
                <Case pattern="Nope">
                    2{" "}
                </Case>
                <Case pattern="Hello world">
                    3
                </Case>
            </Match>
        );
        expect(rendered.toJSON()?.toString()).toBe("1, ,3");
    });
    test("Can match numeric patterns", () => {
        const rendered = renderer.create(
            <Match item={5} kind="all">
                <Case pattern={Number}>
                    1{" "}
                </Case>
                <Case pattern={6}>
                    2{" "}
                </Case>
                <Case pattern={5}>
                    3
                </Case>
            </Match>
        );
        expect(rendered.toJSON()?.toString()).toBe("1, ,3");
    });
    test("Can match Date patterns", () => {
        const date = new Date();
        const wrong = new Date(date);
        wrong.setFullYear(2000);
        const rendered = renderer.create(
            <Match item={date} kind="all">
                <Case pattern={Date}>
                    1{" "}
                </Case>
                <Case pattern={wrong}>
                    2{" "}
                </Case>
                <Case pattern={date}>
                    3{" "}
                </Case>
                <Case pattern={/202/}>
                    4
                </Case>
            </Match>
        );
        expect(rendered.toJSON()?.toString()).toBe("1, ,3, ,4");
    });
});