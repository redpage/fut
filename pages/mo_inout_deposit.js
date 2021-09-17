import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/mo_inout.module.css'
import cn from 'classnames'

import Layout from '../components/layout'

import { WT, WTContext } from '../lib/WT'
import { Button, TextField } from '@material-ui/core'
import {_T, _N, ToPost} from "../lib/solon"
import swal from 'sweetalert'

class MobileInoutDeposit extends React.Component {
    static contextType = WTContext;

    constructor(props) {
        super(props);
        this.state = {selectedTab:0}
    }

    componentDidMount() {

    }

    onApply = (evt) => {
        evt.preventDefault();
        let f = evt.target.closest('form');
        var mny = _N(f.mny);
        if (mny < 10000 ) {
            swal({
                text: '신청금액은 만원 이상 가능 합니다.',
                className : 'x-noti',
                timer: 1000,
                button: false
            });
        }
    }


    render() {
        return(
            <form noValidate autoComplete="off" onSubmit={(e)=>{return false}}>
                <div className={styles.box}>
                    입금신청 
                </div>
               <TextField id="mny" name="mny" label="금액" className={styles.box} />
               <Button variant="contained" color="secondary" className={styles.box}
                onClick={(evt)=>{this.onApply(evt)}}
               >신청하기</Button>
               <div className={styles.disc}>
                입금 신청시 주의 사항을 
                읽어 보세요. 이건 개념의 문제가 아니라.. 한동안 ..
               </div>
             </form>
        );
    }   
}

export default MobileInoutDeposit;