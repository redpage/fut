import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/pc.module.css'
import cn from 'classnames'

import Layout from '../components/layout'

import { WT, WTContext } from '../lib/WT'
import {Packet} from "../lib/solon"

const SE = {
    rows:[]
};

class PcChekyul extends React.Component {
    static contextType = WTContext;

    constructor(props) {
        super(props);
        this.state = {rows:[], selectedTab:0}
    }

    componentDidMount() {
        for(var i=0; i < 1000; i++) {
            SE.rows.push({ix:i, nm:'text'});
        }
    }



    render() {
        return(
        <div className={styles.tic}>
        	<h2>체결내역</h2>
            <ul>
                {SE.rows.map((r, idx)=>(
            	<dl key={idx}>
                    <dd></dd>
                    <dd className={cn(
                        {"x-up":true},
                        {"x-dn":false}
                    )}><span>-</span></dd>
                    <dd className={cn(
                        {"x-up":true},
                        {"x-dn":false}
                    )}><span>-</span></dd>
                </dl>
                ))}
            </ul>
        </div>
        );
    }   
}

export default PcChekyul;