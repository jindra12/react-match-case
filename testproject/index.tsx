import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import { Match, Case, Pattern, utils } from 'react-match-case';

export const Test: FunctionComponent = () => {
    const arrays = [
        [1],
        [1, 2, 3],
        [4, 5, 6],
        [5, 6, 7, 8],
        null,
    ];
    return (
        <div>
            {arrays.map((array, i) => (
                <div key={i}>
                    <label>Test number {i}</label>
                    {/* Match statement directs, renders and evaluates all cases */}
                    <Match item={array} kind="all"> {/* kind === 'all' -> Every successfull case will be displayed */}
                        <Case pattern={[1, utils.Any, 3]}>
                            Three elements
                        </Case>
                        <Case pattern={[1]} guard={(item: number[]) => item.length === 1}>
                            Only 1!
                        </Case>
                        <Case pattern={null}>
                            Sadly, you have passed null :(.
                        </Case>
                    </Match>

                    {/* Pattern works as an one-line one-match statement */}
                    <Pattern item={array} to={[1, utils.Any, 3]}>
                        Three elements
                    </Pattern>
                    <Pattern item={array} to={[1]} guard={(item: number[]) => item.length === 1}>
                        Only 1!
                    </Pattern>
                    <Pattern item={array} to={null}>
                        Sadly, you have passed null :(.
                    </Pattern>
                </div>
            ))}
        </div>
    );
};

ReactDOM.render(
    <Test />,
    document.getElementById('root'),
);