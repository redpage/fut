import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/mo_hist.module.css'
import cn from 'classnames'

import { WT, WTContext } from '../lib/WT'
import { ParamObj, ToPost, _M, _T } from '../lib/solon'
import {TextField} from '@material-ui/core'

const SE = {
    st:'',
    ed:''
}

class MobileHist extends React.Component {
    static contextType = WTContext;

    constructor(props) {
        super(props);
        let today = new Date();
        SE.st = today.toString("%Y-%m-01");
        SE.ed = today.toString("%Y-%m-%d");
        this.state = {rows:null};
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        let WT = this.context;
        let pb = new ParamObj("ssp_trade_hist");
        pb.set("cp", WT.CP);
        pb.set("mbrno", WT.Mbrno);
        pb.set("chkT", "0");

        pb.set("st", SE.st.replace(/-/ig, ""));
        pb.set("ed", SE.ed.replace(/-/ig, ""));
    

        fetch(WT.AjaxUrl, {
            method:'POST',
            body:ToPost({
                aid:'pb',
                ob:pb.toString()
            })
        })
        .then(res=>res.json())
        .then(
            (res)=>{
                this.setState({rows:res.Table});
            },
            (err)=>{
                console.log(err);
            }
        )
     
    }

    onTabChange= (idx) => {
        if( idx != this.state.selectedTab) {
            this.setState({selectedTab:idx});
        }
    }

    on_req = (e) => {
        e.preventDefault();
        let f = e.target.form;
        SE.st = _T(f.st);
        SE.ed = _T(f.ed);
        this.loadData();
    }


    render() {
        if(this.state.rows === null)
        {
            return(
                <div className="x-loading">
                    Loading....
                </div>
            );
        }
        else
        {
            const rows = this.state.rows;
            return(
                <div className={styles.wrap}>
                    <form noValidate onSubmit={()=>{return false;}}>
                    <TextField
                        id="st_date"
                        name="st"
                        label="시작일"
                        type="date"
                        defaultValue={SE.st}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <TextField
                        id="ed_date"
                        name="ed"
                        label="종료일"
                        type="date"
                        defaultValue={SE.ed}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />   
                    <button
                        onClick={(e)=>{this.on_req(e)}}
                    >조회</button>                 
                    </form>

                    <div className={styles.gridhdr}>
                    <ul>
                    	<li idx="0" className="fixed">종목명</li>
                        <li idx="1">날짜</li>
                        <li idx="2">시간</li>
                    </ul>
                    <ul>
                        <li idx="3">구분</li>
                        <li idx="4">가격</li>
                        <li idx="5">수량</li>
                    </ul>
                    <ul>
                        <li idx="6">금액</li>
                        <li idx="7">세금</li>
                        <li idx="8">매매수수료</li>
                    </ul>
                    <ul>
                        <li idx="9">취급수수료</li>
                        <li idx="10">매매손익</li>
                        <li idx="11">매체</li>
                    </ul>
                    </div>
                    <div className={styles.gridbdy} >
                    {rows.map((r, i)=>(
                        <div key={i} className={styles.gridrow} shcode={r.shcode}>
                        <ul>
                            <li cc="hname" className="x-fixed">{r.hname}</li>
                            <li cc="ymd">{r.ymd}</li>
                            <li cc="hms">{r.hms}</li>
                        </ul><ul>
                            <li cc="gbn">{r.gbn}</li>
                            <li cc="prc"><span>{r.prc}</span></li>
                            <li cc="qty"><span>{_M(r.qty)}</span></li>
                        </ul><ul>                            
                            <li cc="mny"><span>{_M(r.mny)}</span></li>
                            <li cc="tax"><span>{_M(r.tax)}</span></li>
                            <li cc="fee"><span>{_M(r.fee)}</span></li>
                        </ul><ul>
                            <li cc="fee1"><span>{_M(r.fee1)}</span></li>
                            <li cc="profit"><span>{_M(r.profit)}</span></li>
                            <li cc="mo">{r.mo}</li>
                        </ul>
                        </div>
                    ))}
                    </div>
                </div>
            );         
        }
    }   
}

export default MobileHist;