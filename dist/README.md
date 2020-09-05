# react-match-case

Components allowing you to use pattern matching in react, without any hassle.


This package uses package matchto (link: https://www.npmjs.com/package/matchto). For matchto utility functions, import { utils } from package.

## Example (from unit tests)

```JSX

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

```

## Example of delayed evaluation (useful for null checks)

```JSX

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

```

## Example of one-line pattern matching using Pattern component

```JSX

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

```

## Footer

If you have any ideas on how to improve this package, or have discovered any bugs, please fill out an issue or pull request.