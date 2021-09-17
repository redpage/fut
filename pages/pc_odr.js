import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/pc.module.css'
import cn from 'classnames'

import Layout from '../components/layout'

import { WT, WTContext } from '../lib/WT'
import { Divider } from '@material-ui/core'


class PcOrder extends React.Component {
    static contextType = WTContext;

    constructor(props) {
        super(props);
        this.state = {selectedTab:0}
    }

    componentDidMount() {

    }



    render() {
        return(
            <div className={styles.order}>
                <div className={styles.info}>
                <dl>
                    <dt>현재가</dt>
                    <dd className="x-up"><span>0.6543</span></dd>
                </dl>
                <dl>
                    <dt>전일비</dt>
                    <dd className="x-up"><span>0.6543</span></dd>
                </dl>
                <dl>
                    <dt>시가</dt>
                    <dd className="x-up"><span>0.6543</span></dd>
                </dl>
                <dl>
                    <dt>등락율</dt>
                    <dd className="x-up"><span>0.13%</span></dd>
                </dl>
                <dl>
                    <dt>고가</dt>
                    <dd className="x-up"><span>0.6543</span></dd>
                </dl>
                <dl>
                    <dt>틱단위</dt>
                    <dd><span>1240.43</span></dd>
                </dl>
                <dl>
                    <dt>저가</dt>
                    <dd className="x-up"><span>0.6543</span></dd>
                </dl>
                <dl>
                    <dt>틱가치</dt>
                    <dd><span>14,240원</span></dd>
                </dl>
                </div>

                <Divider />

            <form onSubmit={()=>{return false;}}>                    
                <div className={styles.trade}>
                <dl>
                    <dt>가능수량</dt>
                    <dd>
                    	<label className="sell">매도</label>
                        <span>10</span>
                        <label className="buy">매수</label>
                        <span>10</span>
                    </dd>
                </dl>
                <dl>
                    <dt>주문수량</dt>
                    <dd>
                    	<input type="text" name="qty" />
                        <span className="btns">
                        <input type="button" value="1" />
                        <input type="button" value="2" />
                        <input type="button" value="3" />
                        </span>
                        <span className="boxs">
                        <input type="text" defaultValue="1" />
                        <input type="text" defaultValue="2" />
                        <input type="text" defaultValue="3" />                            
                        </span>
                        <input type="button" value="편집" />
                    </dd>
                </dl>
                <dl>
                    <dt>익절</dt>
                    <dd>
                    	<input type="text" name="target" />
                        <input type="button" value="+" />
                        <input type="button" value="-" />
                        틱
                    </dd>
                </dl>
                <dl>
                    <dt>손절</dt>
                    <dd>
                    	<input type="text" name="cut" />
                        <input type="button" value="+" />
                        <input type="button" value="-" />
                        틱
                    </dd>
                </dl>
            </div>
        </form>   
             </div>
        );
    }   
}

export default PcOrder;