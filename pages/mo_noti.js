import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/mo_noti.module.css'
import cn from 'classnames'

import { ParamObj, _S, ToPost } from '../lib/solon'
import { WT, WTContext } from '../lib/WT'

class MobileNoti extends React.Component {
    static contextType = WTContext;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let WT = this.context;
        console.log("XXXXXXXXXXXXXx");
        var jData = {
            bd_id:'GONGJI',
            gbn:'4',
            pg:1,
            pgCnt:100
        };

        var pb = new ParamObj("wsp_gongji_lst");
        pb.set("cp", WT.CP);
        pb.set("jData", _S(jData));

        fetch(WT.AjaxUrl, {
            method:'POST',
            body: new URLSearchParams({
                'aid': 'pb',
                'ob': pb.toString()
            })
        })
        .then(res=>res.json())
        .then(
            (res)=>{
                this.setState({selectedKey:0, rows:res.Table1});
            },
            (err) => {
                console.log(err);
            }
        )
    }

    onTabChange= (idx) => {
        if( idx != this.state.selectedTab) {
            this.setState({selectedTab:idx});
        }
    }

    render() {
        if(this.state === null)
        {
            return(
                <div className="x-view-loading">
                    Loading ....
                </div>
            );
        }
        else
        {
        const rows = this.state.rows;
        return(
            <div>
                {rows.map((r, i)=>(
                    <dl className={styles.noti} key={i} 
                        onClick={()=>{
                            this.setState({selectedKey:i})
                        }}
                    >
                        <dt>
                            <h2>{r.title}</h2>
                            <p>{r.dt}</p>
                        </dt>
                        <dd className={cn({
                            [styles.ctx]: true,
                            [styles.on] : this.state.selectedKey === i
                        })}>{r.con}</dd>
                    </dl>
                ))}
             </div>
        );
        }
    }   
}

export default MobileNoti;