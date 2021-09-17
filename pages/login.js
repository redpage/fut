import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/login.module.css'

import { ToPost, _T } from '../lib/solon'
import { WT, WTContext } from '../lib/WT'

import swal from 'sweetalert';


class Login extends React.Component {
    static contextType = WTContext; 

    constructor(props) {
      super(props);
    }

    onLogin = (evt) => {
        let WT = this.context;

        evt.preventDefault();
        console.log(evt);
        var f = evt.target;
        if ( _T(f.id) === "" ) {
            swal({
                className: "x-noti",
                text: "아이디를 입력해 주세요",
                button: false,
                timer: 1000
            });            
            f.id.focus();
            return false;
        }

        if ( _T(f.pwd) === "" ) {
            f.pwd.focus();
            swal({
                className: "x-noti",
                text: "비밀번호를 입력해 주세요",
                button: false,
                timer: 1000
            });              
            return false;
        } 


        fetch(WT.AjaxUrl, {
            method:'POST',
            body:ToPost({
                q:'login',
                id:_T(f.id),
                pwd:_T(f.pwd)
            })
        })
        .then(res => res.text())
        .then(
            (res)=>{
                console.log(res);
            },
            (error)=>{
                console.log(error);

                swal({
                    title:'로그인 에러',
                    icon:'error',
                    text:'로그인중 알수 없는 에러가 발생했습니다. 잠시후 다시 시도해 주세요'
                })
            }
        )
    }

    
    render() {
        return (
            <div className={styles.wrap}>
                <div className={styles.box}>
                    <form onSubmit={(evt)=>{
                        this.onLogin(evt);
                    }}>
                        <div><input type="text" name="id" /></div>
                        <div><input type="password" name="pwd" /></div>
                        <div><input type="submit" value="로그인" /></div>
                    </form>

                </div>
            </div>
        );
    }   
}

export default Login;