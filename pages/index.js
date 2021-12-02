import Head from 'next/head'
import Editor from '../components/Editor'

export default function Home() {
    return (
        <div className="container">
            <Head>
                <title>REAM site</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <div>REAM</div>
                <Editor />
            </main>
        </div>
    )
}
