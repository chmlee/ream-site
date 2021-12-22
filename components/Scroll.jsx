import Link from 'next/link';
import { useState, useEffect } from 'react';

import { sections } from '/components/sections'

import styles from './Scroll.module.scss';

export default function Scroll() {


    const [ menu, setMenu ] = useState(false)
    const toggleMenu = () => {
        if (window.screen.width < 600) {
            const nav = document.querySelector('#nav-wrapper')
            setMenu(!menu)
            nav.style.display = menu ? 'block' : 'none'
        }
    }


    useEffect(() => {
        if (window.screen.width < 600) {
            const nav = document.querySelector('#nav-wrapper')
            nav.style.display = 'none'
        }
    }, [])

    return (
        <nav className={styles.nav}>
            <div className={styles['menu-button']} id="menu-button" onClick={toggleMenu}>
                menu
            </div>
            <div className={styles['nav-wrapper']} id="nav-wrapper"
            >
                <Menu sections={sections} i={1} />
            </div>
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

