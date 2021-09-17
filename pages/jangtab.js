import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/jantab.module.css'

import cn from 'classnames';

import { WT, WTContext } from '../lib/WT'

class JanTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tabIndex:1}
    }

    on_change = (e, idx) => {
        e.preventDefault();

        if(idx !== this.state.tabIndex) {
            this.setState({tabIndex:idx});
        }
    }

    render() {
        return (
            <div className={styles.wrap}>
                <div className={styles.tab}>
                    <div className={cn({
                        [styles.btn]: true, 
                        [styles.on]: this.state.tabIndex === 1
                    })}
                    onClick={(e)=>this.on_change(e, 1)}
                    >잔고</div>
                    
                    <div className={cn({
                        [styles.btn]: true, 
                        [styles.on]: this.state.tabIndex === 2
                    })}
                    onClick={(e)=>this.on_change(e, 2)}
                    >체결</div>
                    
                    <div className={cn({
                        [styles.btn]: true, 
                        [styles.on]: this.state.tabIndex === 3
                    })}
                    onClick={(e)=>this.on_change(e, 3)}
                    >미체결</div>


                    <div className={cn({
                        [styles.btn]: true, 
                        [styles.on]: this.state.tabIndex === 4
                    })}
                    onClick={(e)=>this.on_change(e, 4)}
                    >관심</div>

                </div>
                <div className={styles.tabbdy}>
                    <div>

                    </div>
                </div>
            </div>
        );
    }   
}

export default JanTab;