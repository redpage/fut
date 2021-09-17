import React from 'react'
import styles from '../styles/hoga.module.css'

import { WT, WTContext } from '../lib/WT'

class HogaBox extends React.Component {
    render() {
        return (
            <div className={styles.wrap}>HOGA</div>
        );
    }   
}

export default HogaBox;