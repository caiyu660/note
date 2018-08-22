import React, {Component} from 'react';
import Bundle from './Bundle';

const LazyLoad = (LoadComponent) => () => {
    return <Bundle load={LoadComponent}>
        {
            (Com)=>{
                return Com ? <Com/> : <div>加载中</div>
            }
        }
    </Bundle>
}

export default LazyLoad