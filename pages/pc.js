import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/pc.module.css'
import cn from 'classnames'

import { WT, WTContext } from '../lib/WT'
import PcHoga from './pc_hoga'
import PcOrder from './pc_odr'
import PcTop from './pc_top'
import PcJan from './pc_jan'
import PcChekyul from './pc_che'
import { Divider } from '@material-ui/core'

class PcHome extends React.Component {
    static contextType = WTContext; 

    constructor(props) {
      super(props);
      this.state = {is_mobile:false};
    }
  
    componentDidMount() {
      let WT = this.context;
      this.setState({is_mobile: WT.is_mobile()});
      WT.loadConfig();
    }

    render() {

        return (
    <div className={styles.wrap}>
      
      <PcTop />
      
      <div className={cn(
        "x-flexbox",
        {[styles.on]:false}
      )}>

      <PcHoga />
      <PcOrder />
      </div> 

      <div className={cn(
        "x-flexbox"
      )}>
        <PcJan />
        <PcChekyul />
      </div>
    </div>
        );
    }
}

export default PcHome;