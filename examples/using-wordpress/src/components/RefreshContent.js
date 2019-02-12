import React, { useState } from 'react'
import { setConfig } from 'react-hot-loader';

setConfig({ pureSFC: true });

export default () => {
    const [status, setStatus] = useState(0);
    console.log('status: ', status);

  let interval = null;

  let style = {
    position: 'absolute',
    top: 0,
    right: 0,
    background: 'red',
    color: 'white',
    cursor: 'pointer'
  }

  if(status) {
    style.background = 'grey';
    style.cursor = 'default';
  }

  function refresh() {
    console.log('refreshing content')
    var oReq = new XMLHttpRequest()
    oReq.open('POST', 'http://localhost:8000/__refresh')
    oReq.send()
    interval = setInterval(() => {
      isStillRefreshing(stillRefreshingCallback)
    }, 1000);
  }

  function stillRefreshingCallback(event) {
    const refreshStatus = JSON.parse(event.currentTarget.response);
    console.log('refreshStatus: ', refreshStatus);

    setStatus(refreshStatus);

    if (refreshStatus === false) {
      clearInterval(interval);
    }
  }

  function isStillRefreshing(callback) {
    console.log('isStillRefreshing?')
    var oReq = new XMLHttpRequest()
    oReq.open('GET', 'http://localhost:8000/__refresh-status')
    oReq.send()
    oReq.onload = callback;
  }

    return (
      <section>
        {/* <p>You’ve clicked {count} times.</p>
        <button onClick={() => setCount(count + 1)}>Click me!</button> */}

        <button onClick={refresh} style={style} disabled={status}>
          {status ? 'Refreshing' : 'Refresh'}&nbsp;
          content
        </button>
      </section>
    );
  };

