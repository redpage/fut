import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/pc.module.css'
import cn from 'classnames'

import Layout from '../components/layout'

import { WT, WTContext } from '../lib/WT'
import {Packet} from "../lib/solon"

class PcJan extends React.Component {
    static contextType = WTContext;

    constructor(props) {
        super(props);
        this.state = {selectedTab:0}
    }

    componentDidMount() {

    }

    onTabChange = (idx) => {
        if(idx != this.state.selectedTab)
        {
            this.setState({selectedTab:idx});
        }
    }

    getVW = () => {
        switch(this.state.selectedTab)
        {
            case 0:
                return (
                    <div>잔고</div>
                );
            case 1:
                return (
                    <div>체결</div>
                );
            case 2:
                return (
                    <div>미체결</div>
                );
        }
    }

    render() {
        const VW = this.getVW();

        return(
            <div className={styles.jantab}>
               <div className={styles.tabbar}>
                    <div className={cn(styles.tab,
                        {[styles.on]:this.state.selectedTab === 0})}
                        onClick={()=>this.onTabChange(0)}
                    >
                        잔고
                    </div>
                    <div className={cn(styles.tab,
                        {[styles.on]:this.state.selectedTab === 1})}
                        onClick={()=>this.onTabChange(1)}
                    >
                        체결
                    </div>                    
                    <div className={cn(styles.tab,
                        {[styles.on]:this.state.selectedTab === 2})}
                        onClick={()=>this.onTabChange(2)}
                    >
                        미체결
                    </div>                    
               </div>
               <div className={styles.bdy}>
                    {VW}
               </div>
             </div>
        );
    }   
}

export default PcJan;