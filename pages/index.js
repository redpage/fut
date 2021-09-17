import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import PcHome from './pc'
import MobileHome from "./mo"
import Login from './login'

import {PacketV} from "../lib/PacketV"
import { PSocket } from '../lib/socket'
import { Packet } from '../lib/solon'
import { WT, WTContext } from '../lib/WT'

class Home extends React.Component {
  static contextType = WTContext; 

  constructor(props) {
    super(props);
    this.state = {is_mobile:false};
  }

  componentDidMount() {
    let WT = this.context;
    WT.Mbrno = 5020;
    WT.CP = 1;
    this.setState({is_mobile: WT.is_mobile(), action:'' });
    WT.theApp = this;
    
    WT.on("load-config", function(cfg) {
      WT.WTConnect();
    });

    WT.loadConfig();
  }

  render() 
  {
    let WT = this.context;

    if(WT.Mbrno === 0) {
        return (
          <>
            <Login />
          </>
        )
    }
    else
    {
      if(this.state.is_mobile === true)
      {
        return (
          <>
          <MobileHome />
          </>
        );
      }
      else
      {
        return (
          <>
          <PcHome />
          </>
        );
      }
    }
  }
}

export default Home;