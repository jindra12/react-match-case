import { AllowedTo, MatchValue, GuardMatch } from 'matchto/types';
import React from 'react';

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

    children: React.ReactNode | (() => React.ReactNode);
}

interface CaseState {
    valid: boolean;
}

/**
 * Child component of Match component
 */
export class Case<T extends AllowedTo> extends React.Component<CaseProps<T>, CaseState> {
    state: CaseState = {
        valid: false,
    };
    public validate = (isValid: boolean) => {
        this.setState({ valid: isValid });
    };
    public render() {
        const { state, props } = this;
        return state.valid && (props.children instanceof Function ? props.children() : props.children);
    }
}