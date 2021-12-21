import Link from 'next/link';

import { sections } from '/components/sections'

import styles from './Scroll.module.scss';

export default function Scroll() {
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
