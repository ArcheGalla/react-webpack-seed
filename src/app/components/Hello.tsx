import * as React from "react";

export interface HelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class Hello extends React.Component<HelloProps, undefined> {
    render() {
        return (
        <div>
            <h1 className={'test'}>Hello from {this.props.compiler} and {this.props.framework}!</h1>
        </div>
        );
    }
}