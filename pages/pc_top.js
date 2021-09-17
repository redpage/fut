import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/pc.module.css'
import cn from 'classnames'

import Layout from '../components/layout'

import { WT, WTContext } from '../lib/WT'
import {Packet} from "../lib/solon"

class PcTop extends React.Component {
    static contextType = WTContext;

    constructor(props) {
        super(props);
        this.state = {selectedTab:0}
    }

    componentDidMount() {

    }



    render() {
        return(
            <div className={styles.top}>
               
             </div>
        );
    }   
}

export default PcTop;