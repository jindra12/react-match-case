import { AllowedTo, MatchValue, GuardMatch } from 'matchto/types';
import React from 'react';
import { Match } from './Match';

export interface CaseProps<T extends AllowedTo> {
    /**
     * Match the item of the parent component to this pattern
     */
    pattern: MatchValue<T>
    /**
     * Guard condition
     */
    guard?: GuardMatch<T>;
    /**
     * If the match fails, this components children will render
     */
    not?: boolean;
    /**
     * Prolog-like cut - if the match is valid, evaluation of other matches stops there
     */
    cut?: boolean;
    /**
     * Should it be an exact match? (Deep compare)
     */
    exact?: boolean;
    /**
     * If match is successful, match certain value again against parent match component
     */
    rematch?: (item: T) => T;

    children?: React.ReactNode | ((item: T) => React.ReactNode);
}

interface CaseState {
    valid: boolean;
}

/**
 * Child component of Match component
 */
export class Case<T extends AllowedTo> extends React.Component<CaseProps<T>, CaseState> {
    match: Match<T> | null = null;
    state: CaseState = {
        valid: false,
    };
    public validate = (isValid: boolean) => {
        this.setState({ valid: isValid });
    };
    public register = (match: Match<T>) => {
        this.match = match;
    };
    public render() {
        const { state, props } = this;
        if (!state.valid || !this.match || !props.children) {
            return null;
        }
        const children = props.children instanceof Function ? props.children(this.match.props.item) : props.children;
        if (props.rematch) {
            return (
                <>
                    {children}
                    <Match item={props.rematch(this.match.props.item)} kind={this.match.props.kind}>
                        {this.match.props.children}
                    </Match>
                </>
            );
        }
        return children;
    }
}