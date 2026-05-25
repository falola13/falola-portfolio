'use client'

import { useState } from 'react'
import { AnimatedSection } from './AnimatedSection'
import { Code2, Copy, Check } from 'lucide-react'
import { codeSnippets } from '@/data/portfolio-data'
import { CodeSnippet } from '@/types'

function escapeHtml(char: string): string {
  switch (char) {
    case '&': return '&amp;'
    case '<': return '&lt;'
    case '>': return '&gt;'
    default: return char
  }
}

function escapeStr(s: string): string {
  return s.replace(/[&<>]/g, c => escapeHtml(c))
}

function highlightCode(code: string, language: string): string {
  const keywords: Record<string, Set<string>> = {
    typescript: new Set(['interface', 'type', 'class', 'extends', 'implements', 'async', 'await', 'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'import', 'export', 'from', 'new', 'this', 'Promise', 'private', 'public', 'protected']),
    javascript: new Set(['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'async', 'await', 'new', 'this', 'import', 'export', 'from']),
    tsx: new Set(['interface', 'type', 'const', 'let', 'function', 'return', 'if', 'else', 'React', 'useState', 'useEffect', 'useMemo', 'useCallback', 'import', 'export', 'from']),
    jsx: new Set(['const', 'let', 'function', 'return', 'if', 'else', 'React', 'useState', 'useEffect', 'import', 'export', 'from']),
    go: new Set(['func', 'var', 'const', 'type', 'struct', 'interface', 'if', 'else', 'for', 'range', 'return', 'go', 'defer', 'chan', 'make', 'append']),
    python: new Set(['def', 'class', 'if', 'else', 'elif', 'for', 'while', 'return', 'import', 'from', 'as', 'try', 'except', 'finally', 'with', 'async', 'await'])
  }

  const kwSet = keywords[language] || new Set<string>()
  let result = ''
  let i = 0

  while (i < code.length) {
    if (code[i] === '/' && code[i + 1] === '/') {
      let comment = ''
      while (i < code.length && code[i] !== '\n') {
        comment += escapeHtml(code[i])
        i++
      }
      result += `<span class="text-gray-500 italic">${comment}</span>`
      continue
    }

    if (code[i] === '/' && code[i + 1] === '*') {
      let comment = escapeHtml(code[i]) + escapeHtml(code[i + 1])
      i += 2
      while (i < code.length) {
        if (code[i] === '*' && code[i + 1] === '/') {
          comment += '*/'
          i += 2
          break
        }
        comment += escapeHtml(code[i])
        i++
      }
      result += `<span class="text-gray-500 italic">${comment}</span>`
      continue
    }

    if (code[i] === '"' || code[i] === "'" || code[i] === '`') {
      const quote = code[i]
      let str = escapeHtml(code[i])
      i++
      while (i < code.length && code[i] !== quote) {
        if (code[i] === '\\' && i + 1 < code.length) {
          str += escapeHtml(code[i]) + escapeHtml(code[i + 1])
          i += 2
          continue
        }
        str += escapeHtml(code[i])
        i++
      }
      if (i < code.length) {
        str += escapeHtml(code[i])
        i++
      }
      result += `<span class="text-green-500">${str}</span>`
      continue
    }

    if (/[a-zA-Z_$]/.test(code[i])) {
      let word = ''
      while (i < code.length && /[a-zA-Z0-9_$]/.test(code[i])) {
        word += code[i]
        i++
      }
      if (kwSet.has(word)) {
        result += `<span class="text-purple-400 font-semibold">${word}</span>`
      } else {
        result += escapeStr(word)
      }
      continue
    }

    if (/[0-9]/.test(code[i])) {
      let num = ''
      while (i < code.length && /[0-9.]/.test(code[i])) {
        num += code[i]
        i++
      }
      result += `<span class="text-blue-400">${num}</span>`
      continue
    }

    result += escapeHtml(code[i])
    i++
  }

  return result
}

interface CodeBlockProps {
  snippet: CodeSnippet
}

function CodeBlock({ snippet }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippet.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <div>
          <h3 className="font-semibold">{snippet.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{snippet.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
            {snippet.language.toUpperCase()}
          </span>
          <button
            onClick={copyToClipboard}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Copy code"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm">
          <code 
            dangerouslySetInnerHTML={{ 
              __html: highlightCode(snippet.code, snippet.language) 
            }}
            className="font-mono"
          />
        </pre>
      </div>
    </div>
  )
}

export function CodeSnippets() {
  const [selectedCategory, setSelectedCategory] = useState<CodeSnippet['category'] | 'all'>('all')

  const filteredSnippets = selectedCategory === 'all' 
    ? codeSnippets 
    : codeSnippets.filter(s => s.category === selectedCategory)

  const categories: Array<{ value: CodeSnippet['category'] | 'all', label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'performance', label: 'Performance' },
    { value: 'patterns', label: 'Patterns' },
    { value: 'architecture', label: 'Architecture' },
    { value: 'algorithms', label: 'Algorithms' }
  ]

  return (
    <section id="code" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
              <Code2 className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How I Code
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real examples from production code showcasing my approach to solving problems
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === cat.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <div className="space-y-6">
          {filteredSnippets.map((snippet, index) => (
            <AnimatedSection key={snippet.id} delay={index * 100}>
              <CodeBlock snippet={snippet} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}