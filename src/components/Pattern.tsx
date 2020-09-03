import React from "react";
import { AllowedTo, MatchValue } from "matchto/types";
import { exact } from 'matchto/utils/identity';
import match from 'matchto';

export interface PatternProps<T extends AllowedTo> {
    item: T;
    to: MatchValue<T>;
}

interface PatternState {
    valid: boolean;
}

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
        this.setState({ valid: Boolean(match(props.item).to(props.to).solve()) });
    }
    public render() {
        const { props, state } = this;
        return state.valid && props.children;
    }
}