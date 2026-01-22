# Decisões Pendentes - Identidade Visual STL Festival

Este documento lista todas as decisões pendentes relacionadas à identidade visual que precisam ser tomadas para consolidar completamente o sistema de design.

---

## 1. Cores

### 1.1 Padronização de Cores dos Logos

**Status**: ⚠️ **PENDENTE**

**Problema**:

- Logo principal (`logo-stl.svg`) usa `#ff4d2d` (vermelho)
- Logo colorida (`logo-colorida.svg`) usa `#fe4f2d` (vermelho diferente)
- Diferença sutil mas pode causar inconsistência visual

**Decisão Necessária**:

- [ ] Escolher cor padrão: `#ff4d2d` ou `#fe4f2d`
- [ ] Atualizar logo colorida para usar cor escolhida
- [ ] Ou documentar quando usar cada versão

**Impacto**: Médio - Afeta consistência visual  
**Prioridade**: Alta  
**Prazo Sugerido**: 1 semana

---

### 1.2 Uso do Teal (`#007b9a`)

**Status**: ⚠️ **PENDENTE**

**Problema**:

- Cor definida no sistema mas pouco utilizada
- Não há clareza sobre quando usar

**Decisão Necessária**:

- [ ] Manter teal no sistema? (Sim/Não)
- [ ] Se sim, definir casos de uso específicos
- [ ] Se não, remover do sistema

**Impacto**: Baixo - Cor não está sendo usada  
**Prioridade**: Baixa  
**Prazo Sugerido**: 2 semanas

---

### 1.3 Variações de Contraste do Verde

**Status**: ⚠️ **PENDENTE**

**Problema**:

- Verde (`#006a47`) muito escuro para alguns fundos
- Pode ter problemas de legibilidade

**Decisão Necessária**:

- [ ] Criar versão mais clara do verde para fundos escuros?
- [ ] Definir regras de uso por contexto

**Impacto**: Médio - Afeta acessibilidade  
**Prioridade**: Média  
**Prazo Sugerido**: 2 semanas

---

## 2. Tipografia

### 2.1 Superbusy Activity

**Status**: ⚠️ **PENDENTE**

**Problema**:

- Fonte disponível mas não utilizada
- Sem definição de uso

**Decisão Necessária**:

- [ ] Usar Superbusy Activity? (Sim/Não)
- [ ] Se sim, definir casos de uso específicos:
  - [ ] Badges decorativos
  - [ ] Elementos lúdicos
  - [ ] Outros: **\*\***\_\_\_**\*\***
- [ ] Se não, remover do projeto

**Impacto**: Baixo - Fonte não está sendo usada  
**Prioridade**: Média  
**Prazo Sugerido**: 1 semana

---

## 3. Logos

### 3.1 Favicon Definitivo

**Status**: ⚠️ **PENDENTE** - **TEMPORÁRIO**

**Problema**:

- Favicon atual é temporário
- Não há favicon oficial definido

**Decisão Necessária**:

- [ ] Escolher favicon definitivo
- [ ] Opções:
  - [ ] Versão simplificada do logo principal
  - [ ] Ícone/símbolo específico
  - [ ] Outro: **\*\***\_\_\_**\*\***
- [ ] Criar versões para diferentes tamanhos:
  - [ ] 16x16px
  - [ ] 32x32px
  - [ ] 180x180px (Apple touch icon)
- [ ] Implementar no projeto

**Impacto**: Alto - Favicon é elemento importante de branding  
**Prioridade**: Alta  
**Prazo Sugerido**: 2 semanas

---

### 3.2 Logo Simplificado

**Status**: ⚠️ **PENDENTE**

**Problema**:

- Logo principal muito detalhado para tamanhos pequenos
- Não há versão simplificada

**Decisão Necessária**:

- [ ] Criar logo simplificado? (Sim/Não)
- [ ] Se sim:
  - [ ] Definir nível de simplificação
  - [ ] Criar versão para favicon
  - [ ] Criar versão para mobile navigation
- [ ] Se não, definir tamanho mínimo de uso do logo principal

**Impacto**: Médio - Afeta uso em mobile e favicon  
**Prioridade**: Média  
**Prazo Sugerido**: 3 semanas

---

### 3.3 Uso do Logo Colorida

**Status**: ⚠️ **PENDENTE**

**Problema**:

- Logo colorida existe mas uso não está documentado
- Cores diferentes do sistema

**Decisão Necessária**:

- [ ] Manter logo colorida? (Sim/Não)
- [ ] Se sim:
  - [ ] Padronizar cores ou documentar diferença
  - [ ] Definir casos de uso específicos
- [ ] Se não, remover do projeto

**Impacto**: Baixo - Logo não está sendo usada  
**Prioridade**: Baixa  
**Prazo Sugerido**: 2 semanas

---

## 4. Elementos Gráficos

### 4.1 Auditoria dos PNGs

**Status**: ⚠️ **PENDENTE**

**Problema**:

- 33+ arquivos PNG não analisados
- Sem organização ou padronização

**Decisão Necessária**:

- [ ] Realizar auditoria visual dos PNGs
- [ ] Identificar:
  - [ ] Padrões visuais
  - [ ] Estilo ilustrativo
  - [ ] Qualidade e resolução
  - [ ] Redundâncias
- [ ] Organizar por categoria
- [ ] Otimizar (converter para SVG quando possível)

**Impacto**: Médio - Afeta organização e performance  
**Prioridade**: Média  
**Prazo Sugerido**: 1 mês

---

## 5. Implementação Técnica

### 5.1 Integração Tailwind (CONCLUÍDO ✅)

**Status**: ✅ **CONCLUÍDO**

**Ação Realizada**:

- Cores integradas no `tailwind.config.mjs`
- Fontes configuradas
- Sistema pronto para uso

---

### 5.2 Componentes Padrão

**Status**: ⚠️ **PENDENTE**

**Problema**:

- Não há biblioteca de componentes padrão
- Cada desenvolvedor pode criar componentes diferentes

**Decisão Necessária**:

- [ ] Criar biblioteca de componentes:
  - [ ] Botões (primário, secundário, terciário)
  - [ ] Cards
  - [ ] Badges
  - [ ] Inputs
  - [ ] Outros: **\*\***\_\_\_**\*\***
- [ ] Documentar uso de cada componente
- [ ] Criar exemplos visuais

**Impacto**: Alto - Afeta consistência de desenvolvimento  
**Prioridade**: Alta  
**Prazo Sugerido**: 1 mês

---

## 6. Documentação

### 6.1 Design System Completo

**Status**: ⚠️ **PENDENTE**

**Problema**:

- Documentação existe mas pode ser expandida
- Falta guia visual completo

**Decisão Necessária**:

- [ ] Criar design system completo:
  - [ ] Storybook ou similar
  - [ ] Exemplos visuais de todos os componentes
  - [ ] Guia de uso interativo
- [ ] Atualizar documentação conforme decisões são tomadas

**Impacto**: Médio - Melhora developer experience  
**Prioridade**: Média  
**Prazo Sugerido**: 2 meses

---

## 7. Priorização

### Decisões de Alta Prioridade (Fazer Primeiro)

1. ✅ **Integração Tailwind** - CONCLUÍDO
2. ⚠️ **Padronização de Cores dos Logos** - 1 semana
3. ⚠️ **Favicon Definitivo** - 2 semanas
4. ⚠️ **Superbusy Activity** - 1 semana

### Decisões de Média Prioridade

1. ⚠️ **Logo Simplificado** - 3 semanas
2. ⚠️ **Variações de Contraste do Verde** - 2 semanas
3. ⚠️ **Componentes Padrão** - 1 mês
4. ⚠️ **Auditoria dos PNGs** - 1 mês

### Decisões de Baixa Prioridade

1. ⚠️ **Uso do Teal** - 2 semanas
2. ⚠️ **Uso do Logo Colorida** - 2 semanas
3. ⚠️ **Design System Completo** - 2 meses

---

## 8. Checklist de Acompanhamento

Use este checklist para acompanhar o progresso das decisões:

### Semana 1

- [ ] Padronizar cores dos logos
- [ ] Decidir sobre Superbusy Activity

### Semana 2

- [ ] Favicon definitivo escolhido
- [ ] Favicon implementado

### Semana 3

- [ ] Logo simplificado criado (se necessário)

### Mês 1

- [ ] Componentes padrão criados
- [ ] Auditoria dos PNGs iniciada

### Mês 2

- [ ] Design system completo
- [ ] Todas as decisões pendentes resolvidas

---

## 9. Como Usar Este Documento

1. **Revisar regularmente**: Atualizar status conforme decisões são tomadas
2. **Marcar como concluído**: Quando uma decisão for tomada, atualizar status
3. **Adicionar notas**: Documentar decisões tomadas e justificativas
4. **Priorizar**: Focar nas decisões de alta prioridade primeiro

---

**Última atualização**: Janeiro 2025  
**Próxima revisão**: Após conclusão das decisões de alta prioridade
