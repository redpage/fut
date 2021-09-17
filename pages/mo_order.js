import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/mo_order.module.css'
import cn from 'classnames'
import Layout from "../components/layout"

import {_T, _N, Packet} from '../lib/solon'
import { WT, WTContext } from '../lib/WT'
import { StylesContext } from '@material-ui/styles'



class MobileOrder extends React.Component {
    static contextType = WTContext;

    constructor(props) {
        super(props);
        this.state = {selectedTab:0}
    }

    componentDidMount() {

    }

    onTabChange= (idx) => {
        if( idx != this.state.selectedTab) {
            this.setState({selectedTab:idx});
        }
    }

    render() {
        const xx = "1";
        return(
            <div className={styles.wrap}>
                <div>
                    종목검색
                </div>
                <div className={styles.hoga}>
                <table>
                    <thead>
                    <tr>
                        <th>건수</th>
                        <th>매도잔고</th>
                        <th>{xx}</th>
                        <th>매수잔고</th>
                        <th>건수</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{xx}</td>
                        <td>{xx}</td>
                        <td>{xx}</td>
                        <td rowSpan="5" colSpan="2">

                        </td>
                    </tr>
                    <tr>
                        <td>{xx}</td>
                        <td>{xx}</td>
                        <td>{xx}</td>
                    </tr>
                    <tr>
                        <td>{xx}</td>
                        <td>{xx}</td>
                        <td>{xx}</td>
                    </tr>
                    <tr>
                        <td>{xx}</td>
                        <td>{xx}</td>
                        <td>{xx}</td>
                    </tr>
                    <tr>
                        <td>{xx}</td>
                        <td>{xx}</td>
                        <td>{xx}</td>
                    </tr> 
                    <tr>
                        <td rowSpan="5" colSpan="2">

                        </td>
                        <td>{xx}</td>
                        <td>{xx}</td>
                        <td>{xx}</td>
                    </tr>
                    <tr>
                        <td>{xx}</td>
                        <td>{xx}</td>
                        <td>{xx}</td>
                    </tr>
                    <tr>
                        <td>{xx}</td>
                        <td>{xx}</td>
                        <td>{xx}</td>
                    </tr>
                    <tr>
                        <td>{xx}</td>
                        <td>{xx}</td>
                        <td>{xx}</td>
                    </tr>
                    <tr>
                        <td>{xx}</td>
                        <td>{xx}</td>
                        <td>{xx}</td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colSpan="2">{xx}</td>
                        <td>{xx}</td>
                        <td colSpan="2">{xx}</td>
                    </tr>
                    </tfoot>
                </table>
                </div>
                <div className={styles.tabbar}>
                    <div className={cn({
                        [styles.tab]:true,
                        [styles.on]: this.state.selectedTab === 0
                    })}
                    onClick={()=>this.onTabChange(0)}>
                        매수
                    </div>
                    <div className={cn({
                        [styles.tab]:true,
                        [styles.on]: this.state.selectedTab === 1
                    })}
                    onClick={()=>this.onTabChange(1)}>
                        매도
                    </div>
                    <div className={cn({
                        [styles.tab]:true,
                        [styles.on]: this.state.selectedTab === 2
                    })}
                    onClick={()=>this.onTabChange(2)}>
                        정정/취소
                    </div>
                </div>
                <div className={styles.odrview}>
                    <Layout  />
                </div>
             </div>
        );
    }   
}

export default MobileOrder;