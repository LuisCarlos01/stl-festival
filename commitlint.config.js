export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // Nova funcionalidade
        'fix', // Correção de bug
        'docs', // Documentação
        'style', // Formatação (não altera código)
        'refactor', // Refatoração
        'perf', // Performance
        'test', // Testes
        'build', // Build system
        'ci', // CI/CD
        'chore', // Manutenção
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        'hero', // Seção Hero
        'about', // Seção About
        'header', // Header/Navegação
        'preloader', // Componente Preloader
        'deps', // Dependências
        'config', // Configurações
        'ci', // CI/CD
        'docs', // Documentação
      ],
    ],
  },
}
