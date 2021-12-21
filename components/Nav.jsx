import { useRouter } from 'next/router'
import Link from 'next/link';

import { getNeighbors } from '/components/sections';

import styles from '/components/Nav.module.scss'

export default function Nav() {
    const router = useRouter();

    const paths = router.pathname
        .split('/')
        .slice(1)
        .map(path => `/${path}`);


    const { previousNode, nextNode } = getNeighbors(paths)

    return (
        <div className={styles['nav-container']}>
            <NavItem node={previousNode} typ="Previous"></NavItem>
            <NavItem node={nextNode} typ="Next"></NavItem>
        </div>
    )
}

function NavItem({ node, typ }) {
    if (node === null) return null;
    return (
        <div className={styles['nav-item']}>
            {`${typ}: `} 
            <Link href={node.path}>
                <a className={styles['nav-name']}>{node.name}</a>
            </Link>
        </div>
    )
}
