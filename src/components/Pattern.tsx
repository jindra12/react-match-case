import React from "react";
import { AllowedTo, MatchValue, GuardMatch } from "matchto/types";
import { exact } from 'matchto/utils/identity';
import matchto, { Any } from 'matchto';

export interface PatternProps<T extends AllowedTo> {
    /**
     * Item to be matched
     */
    item: T;
    /**
     * Pattern to match against
     */
    to: MatchValue<T>;
    /**
     * Guard condition
     */
    guard?: GuardMatch<T>;
    /**
     * If the match fails, this components children will render
     */
    not?: boolean;
    /**
     * Should it be an exact match? (Deep compare)
     */
    exact?: boolean;
}

interface PatternState {
    valid: boolean;
}

/**
 * Render children in case prop 'item' is matched by prop 'to'
 */
export class Pattern<T extends AllowedTo> extends React.Component<PatternProps<T>, PatternState> {
    state: PatternState = {
        valid: false,
    };
    public componentDidMount() {
        this.validate();
    }
    public componentDidUpdate(prevProps: PatternProps<T>) {
        const { props } = this;
        if (!exact(props.item, prevProps.item) || !exact(props.to, prevProps.to)) {
            this.validate();
        }
    }
    private validate = () => {
        const { props } = this;
        const statement = matchto(props.item);
        if (props.exact) {
            statement.to(Any).guard(item => exact(item, props.to) && (!props.guard || props.guard(item)));
        } else {
            statement.to(props.to);
            if (props.guard) {
                statement.guard(props.guard);
            }
        }
        if (props.not) {
            statement.not();
        }
        this.setState({ valid: Boolean(statement.solve()) });
    }
    public render() {
        const { props, state } = this;
        return state.valid && props.children;
    }
}