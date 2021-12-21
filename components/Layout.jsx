import Head from 'next/head';

import { sections } from '/components/sections';
import Scroll from '/components/Scroll'
import Path from '/components/Path'
import Nav from '/components/Nav'

import styles from '/components/Layout.module.scss'

export default function Layout(props) {
    return (
        <>
            <Head>
                <title>REAM site</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" media="screen" href="https://fontlibrary.org//face/arco-perpetuo" type="text/css"/> 
                <link rel="stylesheet" media="screen" href="https://fontlibrary.org//face/fira-code" type="text/css"/>
            </Head>

            <main className={styles.page}>
                <div className={styles['nav-wrapper']}>
                    <Scroll />
                </div>
                <div className={styles['main-wrapper']}>
                    <Path />
                    {props.children}
                    <Nav />
                </div>
            </main>
        </>
    )
}
