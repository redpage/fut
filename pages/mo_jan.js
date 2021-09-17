import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/mo_jan.module.css'
import cn from 'classnames'

import { WT, WTContext } from '../lib/WT'

class MobileJan extends React.Component {
    static contextType = WTContext;

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    onTabChange= (idx) => {
        if( idx != this.state.selectedTab) {
            this.setState({selectedTab:idx});
        }
    }

    render() {
        return(
            <div>
                잔고 계좌
             </div>
        );
    }   
}

export default MobileJan;