import React from 'react';
import { AllowedTo, KindOfMatch, InnerMatch } from 'matchto/types';
import { exact } from 'matchto/utils/identity';
import match, { Any } from 'matchto';
import { CaseProps, Case } from './Case';
import PropTypes from 'prop-types';

export interface MatchProps<T extends AllowedTo> {
    /**
     * Perform pattern matching on this object/string/number whatever
     */
    item: T;
    children: React.ReactElement<CaseProps<T>> | Array<React.ReactElement<CaseProps<T>>>;
    /**
     * Kind of match. Options:
     * <pre>
     * first - render only the first matched Cases children (default)
     * </pre>
     * <pre>
     * break - throw an exception if more than one case matched
     * </pre>
     * <pre>
     * last - render only the last matched Cases children
     * </pre>
     * <pre>
     * all - render all matched cases children
     * </pre>
     */
    kind?: KindOfMatch
}

export class Match<T extends AllowedTo> extends React.Component<MatchProps<T>> {
    public static propTypes = {};
    private cases: Array<Case<T>> = [];
    public shouldComponentUpdate(prevProps: MatchProps<T>) {
        const { props } = this;
        const shouldIt = !exact(props.item, prevProps.item) || prevProps.kind !== props.kind;
        if (shouldIt) {
            this.cases = [];
        }
        return shouldIt;
    }
    public componentDidMount() {
        this.updateChildren();
    }
    public componentDidUpdate() {
        this.updateChildren();
    }
    private updateChildren = () => {
        const { props } = this;
        const matchto: InnerMatch<T, any> = match(props.item, props.kind);
        this.cases.forEach(component => {
            component.validate(false);
            if (component.props.exact) {
                matchto
                    .to(Any, () => component.validate(true))
                    .guard(result => {
                        const isValid = exact(result, component.props.pattern);
                        if (!component.props.guard || component.props.guard(result)) {
                            return isValid;
                        }
                        return false;
                    });
            } else {
                matchto.to(component.props.pattern, () => component.validate(true));
                if (component.props.guard) {
                    matchto.guard(component.props.guard);
                }
            }
            if (component.props.cut) {
                matchto.cut();
            }
            if (component.props.not) {
                matchto.not();
            }
        });
        if (this.cases.length > 0) {
            matchto.solve();
        }
    }
    public render() {
        let childProps: Array<CaseProps<T> & { children: any }> = [];
        let keys: Array<string | number | null> = [];
        if (Array.isArray(this.props.children)) {
            childProps = (this.props.children as Array<React.ReactElement<CaseProps<T> & { children: any }>>).map(child => child.props);
            keys = (this.props.children as Array<React.ReactElement<CaseProps<T>>>).map(child => child.key);
        } else if (Boolean(this.props.children)) {
            childProps = [this.props.children.props];
            keys = [this.props.children.key];
        }
        return (
            <>
                {childProps.map((prop, i) => (
                    <Case
                        pattern={prop.pattern}
                        exact={prop.exact}
                        guard={prop.guard}
                        key={keys[i] === undefined ? i : keys[i]}
                        ref={(component: Case<T> | null) => {
                            if (component) {
                                this.cases.push(component);
                            }
                        }}
                    >
                        {prop.children}
                    </Case>
                ))}
            </>
        );
    }
}

Match.propTypes = {
    children: (props: any, propName: 'children') => {
        const prop = props[propName];
        return React.Children.map(prop, (child) => {
            if (child.type !== Case) {
                return new Error('Only children of "Match" component should be Cases!');
            }
            return null;
        }).find((msg: Error | null) => Boolean(msg)) || null;
    }
}