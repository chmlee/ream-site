import Head from 'next/head';

import Feature from '/components/Feature';
import Nav from '/components/Nav'

import styles from '/components/Layout.module.scss'

export default function Layout(props) {
    console.log(props)
    return (
        <div className="container">
            <Head>
                <title>REAM site</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" media="screen" href="https://fontlibrary.org//face/arco-perpetuo" type="text/css"/> 
                <link rel="stylesheet" media="screen" href="https://fontlibrary.org//face/fira-code" type="text/css"/>
            </Head>

            <main className={styles.main}>
                <div className={styles['nav-wrapper']}>
                    <Nav />
                </div>
                <div className={styles['main-wrapper']}>
                    {props.children}
                </div>
            </main>
        </div>
    )
}
