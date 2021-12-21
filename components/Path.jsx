import { useRouter } from 'next/router';
import Link from 'next/link';

import { sections, getNodes } from '/components/sections';
import styles from '/components/Path.module.scss';


export default function Path() {
    const router = useRouter();
    const paths = router.pathname
        .split('/')
        .slice(1)
        .map(path => `/${path}`);

    const nodes = getNodes(paths, 0, sections)

    return (
        <div className={styles['node-container']}>
        {
            nodes.map(node => <PathNode key={node.name} node={node}/>)
        }
        </div>
    )
}

function PathNode({ node }) {
    if (node.name === 'Home') return null;
    return (
        <div className={styles['path-container']}>
            <span className={styles.separator}>{"/ "}</span>
            <Link href={node.path}>
                <a className={styles['path-item']}>{node.name}</a>
            </Link>
            <span className={styles.separator}>{" "}</span>
        </div>
    )
}
