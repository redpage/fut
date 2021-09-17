import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/mo_inout_lst.module.css'
import cn from 'classnames'

import { WT, WTContext } from '../lib/WT'
import { ToPost, _M, _T } from '../lib/solon'

import TextField from '@material-ui/core/TextField';

const SE = {
    st:'',
    ed:'',
    cat:'all'
}

class MobileInoutList extends React.Component {
    static contextType = WTContext;

    constructor(props) {
        super(props);
        let today = new Date();
        let st = today.toString("%Y-%m-01");
        let ed = today.toString("%Y-%m-%d");
        SE.st = st;
        SE.ed = ed;
        this.state = {rows:null};
    }

    componentDidMount() {
        this.loadData();
    }


    loadData = () => {
        let WT = this.context;

        fetch(WT.AjaxUrl, {
            method:'POST',
            body:ToPost({
				aid: 'state01',
                mbrno: WT.Mbrno,
				st: SE.st,
                ed: SE.ed,
				cat: SE.cat
			})
        })
        .then(res=>res.json())
        .then(
            (res) => {
                this.setState({rows:res.Table});
            },
            (err) => {
                console.log(err);
            }
        )
    }

    on_req = (e) => {
        e.preventDefault();
        let f = e.target.form;
        SE.st = _T(f.st);
        SE.ed = _T(f.ed);
        
        this.loadData();
    }

    render() {
        if(this.state.rows == null) {
            return(
            <div className="x-loading">
                Loading...
            </div>
            )
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

                    <table>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>종류</th>
                        <th>날짜</th>
                        <th>종류</th>
                        <th>금액</th>
                        <th>처리내용</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r, i)=>(
                        <tr key={i}>
                            <td>{r.seq}</td>
                            <td>{(r.gbn === "D")?"입금":"출금"}</td>
                            <td>{String(r["apply_dt"]).substring(0, 10).replace(/-/ig, ".")}</td>
                            <td>{(r["aYN"] === "1")?"서비스":""}</td>
                            <td>{_M(r.mny)}</td>
                            <td>{(r["proc_yn"] === "1")?"완료":(r["state"] || '대기')}</td>
                        </tr>
                    ))}
                </tbody>
                    </table>                
                </div>
            );
        }
    }   
}

export default MobileInoutList;