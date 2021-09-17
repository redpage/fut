import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/mo_inout.module.css'
import cn from 'classnames'

import Layout from '../components/layout'

import { WT, WTContext } from '../lib/WT'
import { Button, TextField, List, ListItem, ListItemText, Divider, Typography, Input } from '@material-ui/core'
import {_T, _N, ToPost} from "../lib/solon"
import swal from 'sweetalert'

class MobileInoutWithdraw extends React.Component {
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
             <List>
                 <ListItem>
                     <ListItemText primary="출금신청" />
                 </ListItem>
                 <Divider />
                 <ListItem>
                    <Input type="number" id="mny" name="mny" label="금액" className={styles.box} />
                 </ListItem>
                 <Divider /> 
                 <ListItem>
                 <Button variant="contained" color="primary" className={styles.box}
                    onClick={(evt)=>{this.onApply(evt)}}
                    >신청하기</Button>                     
                 </ListItem>
                <Divider />
                <ListItem>
                    <Typography color="textSecondary">
                    출금 신청시 주의 사항을 
                읽어 보세요. 이건 개념의 문제가 아니라.. 한동안 ..
                    </Typography>
                </ListItem>
            </List>
            </form>
        );
    }   
}

export default MobileInoutWithdraw;