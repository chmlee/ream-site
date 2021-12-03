import Link from 'next/link';

export default function Nav() {
    return (
        <nav>
            <ul>
                <li>
                    <Link href="/"><a>Home</a></Link>
                </li>            
                <li>             
                    <Link href="/overview"><a>Overview</a></Link>
                </li>            
                <li>             
                    <Link href="/tutorial"><a>Tutorial</a></Link>
                </li>            
                <li>             
                    <Link href="/reference"><a>Reference</a></Link>
                </li>            
                <li>             
                    <Link href="/contribution"><a>Contribution</a></Link>
                </li>
            </ul>
        </nav>
    )
}
