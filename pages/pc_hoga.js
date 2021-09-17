import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/pc.module.css'
import cn from 'classnames'

import Layout from '../components/layout'

import { WT, WTContext } from '../lib/WT'
import { roundToNearestMinutesWithOptions } from 'date-fns/fp'

class PcHoga extends React.Component {
    static contextType = WTContext;

    constructor(props) {
        super(props);
        this.state = {selectedTab:0}
    }

    componentDidMount() {

    }



    render() {
        const rows = [];
        for(var i=0; i < 100; i++) {
            rows.push(i);
        }
        return(
<div className={styles.hogabox}>
            <div className={styles.top}>
                <ul>
                    <li>STOP</li>
                    <li>지정가</li>
                    <li className={cn(styles.col2, styles.sell)}><button>매도시장가</button></li>
                    <li className={styles.center}><button>호가중앙</button></li>
                    <li className={cn(styles.col2, styles.buy)}><button>매수시장가</button></li>
                    <li>지정가</li>
                    <li>STOP</li>
                </ul>
            </div>
            <div className={cn(styles.bdy, styles.scrollbar)}>
{rows.map((r, i)=>(
                <ul className={styles.offer} key={i}>
                    <li>&nbsp;</li>
                    <li className={styles.cell}>&nbsp;</li>
                    <li><span>-</span></li>
                    <li><span>-</span></li>
                    <li className={styles.center}><span>-</span></li>
                    <li>&nbsp;</li>
                    <li>&nbsp;</li>
                    <li>&nbsp;</li>
                    <li>&nbsp;</li>
                </ul>
))}
{rows.map((r, i)=>(
                <ul className={styles.bid} key={i}>
                    <li>&nbsp;</li>
                    <li>&nbsp;</li>
                    <li>&nbsp;</li>
                    <li>&nbsp;</li>
                    <li className={styles.center}><span>-</span></li>
                    <li><span></span></li>
                    <li><span></span></li>
                    <li className={styles.buy}>&nbsp;</li>
                    <li>&nbsp;</li>
                </ul>
))}
            </div>
            <div className={styles.bot}>
                <ul>
                    <li className={styles.cancel}><button>ST취소</button></li>
                    <li className={styles.cancel}><button>지정취소</button></li>
                    <li className={cn(styles.col2, styles.sell)}><button>매도 일괄취소</button></li>
                    <li className={styles.center}><button>호가중앙</button></li>
                    <li className={cn(styles.col2, styles.buy)}><button>매수 일괄취소</button></li>
                    <li className={styles.cancel}><button>지정취소</button></li>
                    <li className={styles.cancel}><button>ST취소</button></li>
                </ul>
            </div>
        </div>
        );
    }   
}

export default PcHoga;