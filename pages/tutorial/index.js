import Layout from '/components/Layout'

export default function Tutorial() {
    return (
            <Layout child={Content()} />
    )
}

function Content() {
    return (
        <>
            <p>tutorial</p>
        </>
    )
}
