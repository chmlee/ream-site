import Link from 'next/link';

import styles from './Nav.module.scss';

export default function Nav() {
    return (
        <nav className={styles.nav}>
            <Menu sections={sections} i={1} />
        </nav>
    )
}


function Menu({ sections, i }) {
    let level = `level-${i}`
    if (!sections) return null
    return (
        <ul className={`${styles['section-list']} ${styles[level]}`}>
        {
            sections.map(section => {
                return <MenuItem section={section} i={i} key={section.name}/>
            })
        }
        </ul>
    )
}

function MenuItem({ section, i }) {
    return (
        <>
            <li className={styles['section-item']}>
                <Link href={section.path}>
                    <a className={styles['section-name']}>
                        {section.name}
                    </a>
                </Link>
                <Menu sections={section.children} i={i+1} />
            </li>
        </>
    )
}

const sections = [
    {
        name: 'Home',
        path: '/',
    },
    {
        name: 'Overview',
        path: '/overview',
        children: [
            {
                name: 'Goal',
                path: '/overview/goal',
            },
        ]
    },
    {
        name: 'Tutorial',
        path: '/tutorial',
        children: [
            {
                name: 'Part 1',
                path: '/overview/goal',
            },
            {
                name: 'Part 2',
                path: '/overview/goal',
            },
            {
                name: 'Part 3',
                path: '/overview/goal',
            },
        ]
    },
    {
        name: 'Reference',
        path: '/reference',
        children: [
            {
                name: 'Part 1',
                path: '/overview/goal',
            },
            {
                name: 'Part 2',
                path: '/overview/goal',
            },
            {
                name: 'Part 3',
                path: '/overview/goal',
            },
        ]
    },
    {
        name: 'Contribution',
        path: '/contribution',
        children: [
            {
                name: 'Part 1',
                path: '/overview/goal',
            },
            {
                name: 'Part 2',
                path: '/overview/goal',
            },
            {
                name: 'Part 3',
                path: '/overview/goal',
            },
        ]
    },
]
