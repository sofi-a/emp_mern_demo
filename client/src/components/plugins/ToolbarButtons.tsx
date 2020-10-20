import React from 'react';
import {
    Plugin,
    Template,
    TemplatePlaceholder
} from '@devexpress/dx-react-core';
import { IconButton } from '@material-ui/core';
import {
    Add,
    Refresh
} from '@material-ui/icons'

const pluginDependencies = [
    { name: 'Toolbar' }
];

export const ToolbarAddButton = (props: { onClick: () => void }) => (
    <Plugin
        name="ToolbarAddButton"
        dependencies={pluginDependencies}
    >
        <Template name="toolbarContent">
            <TemplatePlaceholder />
                <IconButton
                    color="primary"
                    onClick={props.onClick}>
                    <Add />
                </IconButton>
            </Template>
    </Plugin>
);

export const ToolbarRefreshButton = (props: { onClick: () => void }) => (
    <Plugin
        name="ToolbarRefreshButton"
        dependencies={pluginDependencies}
    >
        <Template name="toolbarContent">
            <TemplatePlaceholder />
            <IconButton onClick={props.onClick}>
                <Refresh />
            </IconButton>
        </Template>
    </Plugin>
);
