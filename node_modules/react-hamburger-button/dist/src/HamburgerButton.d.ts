/// <reference types="react" />
import * as React from "react";
export interface HamburgerButtonProps {
    open: boolean;
    width?: number;
    height?: number;
    strokeWidth?: number;
    color?: string;
    animationDuration?: number;
    onClick: () => any;
}
export declare class HamburgerButton extends React.PureComponent<HamburgerButtonProps, {}> {
    render(): JSX.Element;
    private getTransformValue;
}
