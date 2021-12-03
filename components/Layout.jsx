import Head from 'next/head';

import Feature from '/components/Feature';
import Nav from '/components/Nav'

import styles from '/components/Layout.module.scss'

export default function Layout({ child }) {
    return (
        <div className="container">
            <Head>
                <title>REAM site</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" media="screen" href="https://fontlibrary.org//face/arco-perpetuo" type="text/css"/> 
                <link rel="stylesheet" media="screen" href="https://fontlibrary.org//face/fira-code" type="text/css"/>
            </Head>

            <main className={styles.main}>
                <div className={styles.left}>
                    <Nav />
                </div>
                <div className={styles.right}>
                    {child}
                </div>
            </main>
        </div>
    )
}
