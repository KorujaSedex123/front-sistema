/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="layout-footer">
            <img src={`/layout/images/logo.svg`} alt="Logo" height="80"/>
            by
            <span className="font-medium ml-2">Korion</span>
        </div>
    );
};

export default AppFooter;
