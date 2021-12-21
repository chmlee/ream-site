export const sections = [
    {
        name: 'Home',
        path: '/',
    },
    {
        name: 'Overview',
        path: '/overview',
        children: [
            {
                name: 'Motivation',
                path: '/overview/motivation',
            },
            {
                name: 'Features',
                path: '/overview/features'
            },
            {
                name: 'Guide to Documentation',
                path: '/overview/guide-to-documentation'
            },
        ]
    },
    {
        name: 'Tutorial',
        path: '/tutorial',
        children: [
            {
                name: 'Getting Started',
                path: '/tutorial/getting-started',
            },
            {
                name: 'First Glance',
                path: '/tutorial/first-glance',
            },
            {
                name: 'Variable',
                path: '/tutorial/variable',
            },
            {
                name: 'Annotation',
                path: '/tutorial/annotation',
            },
            {
                name: 'Subentry',
                path: '/tutorial/subentry',
            },
            {
                name: 'Type',
                path: '/tutorial/type',
            },
            {
                name: 'Schema',
                path: '/tutorial/schema',
            },
            {
                name: 'Reference',
                path: '/tutorial/reference',
            },
        ]
    },
    {
        name: 'Toolchain',
        path: '/toolchain',
        children: [
        ]
    },
    {
        name: 'Reference',
        path: '/reference',
        children: [
            {
                name: 'Decorator',
                path: '/reference/decorator'
            }
        ],
    },
    {
        name: 'Contribution',
        path: '/contribution',
        children: [
            {
                name: 'How to contribute',
                path: '/contribution/how-to-contribute',
            },
            {
                name: 'Roadmap',
                path: '/contribution/roadmap',
            },
        ]
    },
]

export const getNodes = (paths, level, sections) => {
    if (level > paths.length-1) return [];

    const currentPath = getCurrentPath(paths, level);
    const { currentNode, children } = getCurrentNode(currentPath, sections)
    const childrenNodes = getNodes(paths, level+1, children);
    return [ currentNode, ...childrenNodes ]
}

const getCurrentPath = (paths, level) => {
    return paths
        .slice(0, level+1) 
        .join("")
}

const getCurrentNode = (path, sections) => {
    const section = sections
        .filter(section => section.path === path)[0]
    const { children, ...currentNode } = section;
    return {
        currentNode: currentNode,
        children: children,
    }
}

export const getNeighbors = (paths) => {
    const nodes = getNodes(paths, 0, sections);
    const node = nodes[nodes.length-1];
    const flatSections = getFlatSections();
    const index = flatSections.findIndex(section => section.path === node.path);
    const previousNode = index === 0 ? null : flatSections[index-1];
    const nextNode = index === flatSections.length-1 ? null : flatSections[index+1];
    return {
        previousNode,
        nextNode,
    }
}

const getFlatSections = () => {
    return sections.map(section => flattenSection(section)).flat(10)
}

const flattenSection = (section) => {
    if (section.children) {
        return [section, ...flattenSection(section.children)]
    }
    return section
}

const getNodeByIndex = (index) => {
    let nodes = [{children: sections}]; 
    for (let i = 0; i < index.length; i++) {
        const previousNode = nodes[i];
        const currentIndex = index[i];
        const currentNode = previousNode.children[currentIndex];
        nodes.push(currentNode)
    }
    const result = nodes[nodes.length-1]
    if (result) return result
    return null
}
