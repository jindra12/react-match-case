import React from 'react';
import { Match } from '../src/components/Match';
import { Case } from '../src/components/Case';
import { utils } from '../src/index';
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
    test("Can perform null checks", () => {
        const arrays = [
            null,
            [1, 2, 3],
            undefined,
        ];
        const rendered = renderer.create(
            <>
                <Match item={arrays[0]} kind="all">
                    <Case pattern={null}>
                        1{" "}
                    </Case>
                    <Case pattern={[]}>
                        2{" "}
                    </Case>
                    <Case pattern={utils.Any}>
                        3
                    </Case>
                </Match>
                <Match item={arrays[1]} kind="all">
                    <Case pattern={null}>
                        4{" "}
                    </Case>
                    <Case pattern={undefined}>
                        5{" "}
                    </Case>
                    <Case pattern={[1, 2]}>
                        6
                    </Case>
                </Match>
                <Match item={arrays[2]} kind="all">
                    <Case pattern={undefined}>
                        7{" "}
                    </Case>
                    <Case pattern={[]}>
                        8{" "}
                    </Case>
                    <Case pattern={utils.Any}>
                        9
                    </Case>
                </Match>
            </>
        );
        expect(rendered.toJSON()?.toString()).toBe("1, ,3,6,7, ,9");
    });
});