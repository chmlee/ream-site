import Layout from '/components/Layout'

export default function Page() {
    return (
            <Layout child={Content()} />
    )
}

function Content() {
    return (
        <>
            <p>contribution</p>
        </>
    )
}
