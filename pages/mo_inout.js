import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/mo_inout.module.css'
import cn from 'classnames'

import Layout from '../components/layout'
import MobileInoutList from './mo_inout_lst'

import { WT, WTContext } from '../lib/WT'
import MobileInoutDeposit from './mo_inout_deposit'
import MobileInoutWithdraw from './mo_inout_withdraw'

class MobileInout extends React.Component {
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

    getView = () => {
        switch(this.state.selectedTab)
        {
            case 0 : return(
            <>
               <MobileInoutDeposit /> 
            </>);
            case 1 : return(<>
              <MobileInoutWithdraw />  
            </>);
            case 2 : return(<>
                <MobileInoutList />
            </>);
            default: return(<div>
                ERROR
            </div>);
        }
    }

    render() {
        const VV = this.getView();

        return(
            <div className={styles.wrap}>
                <div className={styles.tabbar}>
                    <div className={cn({
                        [styles.tab]:true,
                        [styles.on]: this.state.selectedTab === 0
                    })} 
                    onClick={()=>this.onTabChange(0)}
                    >
                        입금신청
                    </div>
                    <div className={cn({
                        [styles.tab]:true,
                        [styles.on]: this.state.selectedTab === 1
                    })} 
                    onClick={()=>this.onTabChange(1)}
                    >
                        출금신청
                    </div>  
                    <div className={cn({
                        [styles.tab]:true,
                        [styles.on]: this.state.selectedTab === 2
                    })} 
                    onClick={()=>this.onTabChange(2)}
                    >
                        입출금내역
                    </div>     
                 </div>
                 <div className={styles.tabbdy}>
                        {VV}
                </div>                    
             </div>
        );
    }   
}

export default MobileInout;