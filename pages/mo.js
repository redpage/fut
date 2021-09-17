import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/mo.module.css'
import cn from 'classnames'

import Layout from '../components/layout'

import MobileOrder from './mo_order'
import MobileJan from './mo_jan'
import MobileInout from './mo_inout';
import MobileNoti from './mo_noti'
import MobileHist from './mo_hist'

import { WT, WTContext } from '../lib/WT'

class MobileHome extends React.Component {
    static contextType = WTContext;

    constructor(props) {
        super(props);
        this.state = {selectedTab:0};
    }

    componentDidMount() {

    }

    onTabChange= (idx) => {
        if( idx != this.state.selectedTab) {
            this.setState({selectedTab:idx});
        }
    }

    getView = () => {
        switch(this.state.selectedTab)
        {
            case 0:
                return (<MobileOrder/>);
            case 1:
                return (<MobileJan />);
            case 2:
                return (<MobileHist />);
            case 3:
                return (<MobileInout />);
            case 4:
                return (<MobileNoti />);
            default:
                return (<MobileNoti/>);

        }
    }

    render() {
        const VV = this.getView();
        return (
            <div className={styles.wrap}>
                <div className={styles.view}>
                    {VV}
                </div>
                
            {/* <div className={cn({[styles.view]:true,
            [styles.on]: this.state.selectedTab === 0
            })} >
            <MobileOrder />           
            </div>
            <div className={cn({[styles.view]:true,
            [styles.on]: this.state.selectedTab === 1
            })} >
            <MobileJan />    
            </div>
            <div className={cn({[styles.view]:true,
            [styles.on]: this.state.selectedTab === 2
            })} >
            <MobileHist />    
            </div>
            <div className={cn({[styles.view]:true,
            [styles.on]: this.state.selectedTab === 3
            })} >
               <MobileInout /> 
            </div>
            <div className={cn({[styles.view]:true,
            [styles.on]: this.state.selectedTab === 4
            })} >
                <MobileNoti />
            </div> */}
            <div className={styles.tabbar}>
                <div className={cn({
                    [styles.tab] : true,
                    [styles.on] : this.state.selectedTab === 0
                })} 
                onClick={()=>{this.onTabChange(0)}}>
                    주문
                </div>
                <div className={cn({
                    [styles.tab] : true,
                    [styles.on] : this.state.selectedTab === 1
                })} 
                onClick={()=>{this.onTabChange(1)}}>
                    잔고
                </div>
                <div className={cn({
                    [styles.tab] : true,
                    [styles.on] : this.state.selectedTab === 2
                })} 
                onClick={()=>{this.onTabChange(2)}} >
                    거래내역
                </div>
                <div className={cn({
                    [styles.tab] : true,
                    [styles.on] : this.state.selectedTab === 3
                })} 
                onClick={()=>{this.onTabChange(3)}} >
                    입/출금
                </div>
                <div className={cn({
                    [styles.tab] : true,
                    [styles.on] : this.state.selectedTab === 4
                })} 
                onClick={()=>{this.onTabChange(4)}}>
                    공지
                </div>
            </div>
            </div>
        );
    }   
}

export default MobileHome;