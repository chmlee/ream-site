import Head from 'next/head'
import Editor from '../components/Editor'
import Feature from '../components/Feature'


export default function Home() {
    return (
        <div className="container">
            <Head>
                <title>REAM site</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <div className="intro">
                    Data language for building maintainable and reusable social science datesets
                </div>

                <div className="index-button">
                    <button>Why REAM</button>
                    <button>Get Started</button>
                </div>

                <div className="feature-container">
                {
                    features.map((feature, i) => <Feature {...feature} key={`feature-${i}`}/>)

                }
                </div>

            </main>
        </div>
    )
}

const features = [
    {
        title: 'Human Readable',
        detail: 'It reads like Markdown, so should be easy to learn even if not already familiar.',
        source: `
# Country 
- name: Belgium
- capital: Brussels
- population: 11433256
- euro_zone: TRUE`,
    },
    {
        title: 'Document Your Dataset',
        detail: 'Let your documentations live alongside your datapoints.',
        source: `
# Country 
- name: Belgium
  > official known as Kingdom of Belgium
- capital: Brussels
- population: 11433256
  > data from 2019; retrieved from World Bank
- euro_zone: TRUE
  > joined in 1999`, 
    },
    {
        title: "Don't repeat yourself",
        detail: '',
        source: `
# Country
- name: Belgium
- capital: Brussels

## Language
- name: Dutch
- size: 0.59

## Language
- name: French
- size: 0.4

## Language
- name: German
- size: 0.01`,
    },
    {
        title: 'Type Safety',
        detail: '',
        source: `
# Country 
- name (str): Belgium
- capital (num): Brussels
- population (num): 11433256
- euro_zone (bool): TRUE`,
    },
    {
        title: 'Schema Validation',
        detail: '',
        source: `
# Country
- name: Belgium
- capital: Brussels

## Language
- name: Dutch
- size: 0.59

## Language
- name: French

## Language
- name: German
- size: 0.01`,
    },
    {
        title: 'Reference',
        detail: '',
        source: `
# Country
- name: Belgium
- capital: Brussels
- languages (ref): Language$name

## Language
- name: Dutch
- size: 0.59

## Language
- name: French
- size: 0.4

## Language
- name: German
- size: 0.01`,
    },
    {
        title: 'modular',
        detail: '(Working in progress)',
        source: `
# Country
- name: Belgium
- capital: Brussels
- languages (ref): Language$name

@@ IMPORT('Language')
@@ FOR(language in Language)
@@ MOUNT(language)
## _`,
    },
    {
        title: 'Scripting',
        detail: '',
        source: `
# Country
- name: Belgium
- capital: Brussels

## Language
- id: {Country$name .. $name}
- name: Dutch

## Language
- id: {Country$name .. $name}
- name: French

## Language
- id: {Country$name .. $name}
- name: German`,
    },
    {
        title: 'template',
        detail: '',
        source: `
# Country
- name: Belgium
- languages:
  * Dutch
  * French
  * Dutch

@@ FOR(language in Country$langauges)
## Language
- id: {Country$name .. $language}
- name: Dutch`,
    }
]
