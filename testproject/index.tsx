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
                    <label>Test number {i}&nbsp;-&nbsp;{array === undefined ? 'undefined' : (array === null ? 'null' : JSON.stringify(array))}</label>
                    <div>
                        {/* Match statement directs, renders and evaluates all cases */}
                        <label>Match + Case</label>
                        <ul>
                            <Match item={array} kind="all"> {/* kind === 'all' -> Every successfull case will be displayed */}
                                <Case pattern={[1, utils.Any, 3]}>
                                    <li>Three elements</li>
                                </Case>
                                <Case pattern={[1]} guard={(item: number[]) => item.length === 1}>
                                    <li>Only 1!</li>
                                </Case>
                                <Case pattern={null}>
                                    <li>Sadly, you have passed null :(.</li>
                                </Case>
                            </Match>
                        </ul>
                        <label>Pattern</label>
                        <ul>
                            {/* Pattern works as an one-line one-match statement */}
                            <Pattern item={array} to={[1, utils.Any, 3]}>
                                <li>Three elements</li>
                            </Pattern>
                            <Pattern item={array} to={[1]} guard={item => item?.length === 1}>
                                <li>Only 1!</li>
                            </Pattern>
                            <Pattern item={array} to={null}>
                                <li>Sadly, you have passed null :(.</li>
                            </Pattern>
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

ReactDOM.render(
    <Test />,
    document.getElementById('root'),
);