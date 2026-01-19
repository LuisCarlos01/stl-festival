
# 📐 Cursor Rules — STL Festival Project

> Estas regras são **obrigatórias** para qualquer agente acionado neste projeto.
> Elas refletem decisões arquiteturais já validadas e **NÃO devem ser questionadas**.

---

## 🎯 1. Princípios Arquiteturais Fundamentais

- Este projeto é uma **landing page**, não um sistema enterprise
- **Simplicidade intencional > elegância arquitetural**
- **Overengineering é considerado erro**
- **YAGNI é regra absoluta**
- Implemente apenas o que resolve **problemas reais e atuais**

---

## 🧱 2. Arquitetura Permitida

### ✅ Permitido

- Component-Driven Development
- Atomic Design **leve**
- Organização simples por tipo de componente
- Colocation quando fizer sentido
- Estrutura flat (evitar profundidade excessiva)

### ❌ Proibido

- Clean Architecture formal
- Domain-Driven Design (DDD)
- Arquitetura hexagonal / onion
- Design Patterns formais
- CRUD
- State management global (Redux, Zustand, etc.)
- Criação de camadas abstratas (`services`, `repositories`, etc.)
- Frameworks internos

---

## 📁 3. Estrutura de Pastas (Regra Obrigatória)

```text
src/
  components/
    ui/          → componentes reutilizáveis (Button, Card)
    sections/    → seções completas da landing (Hero, LineUp)
    *.tsx        → componentes React interativos
  layouts/
  pages/
  styles/
  utils/         → SOMENTE se houver helper real
````

### Regras

* `ui/` **NÃO** pode conter componentes específicos
* `sections/` **NÃO** pode conter componentes genéricos
* `utils/` só pode existir se houver código real (YAGNI)

---

## 🧩 4. Componentes (Regras Obrigatórias)

### Single Responsibility — SOLID (S)

* Um componente = **uma responsabilidade**
* Se faz duas coisas não relacionadas → está errado

### Interface Segregation — SOLID (I)

* Props devem ser:

  * específicas
  * mínimas
  * explícitas
* Props genéricas ou “catch-all” são proibidas

```ts
// ✅ Correto
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  children: ReactNode
}

// ❌ Proibido
interface ComponentProps {
  data: any
  options?: any
}
```

---

## 🧼 5. Clean Code (Regras Enforceable)

### Tamanho

* Funções: **máx. 30 linhas**
* Componentes: **máx. 200 linhas**
* Se ultrapassar → extrair lógica **incrementalmente**

### Nomes

* Nomes devem ser **descritivos e intencionais**
* Proibido:

  * `data`
  * `item`
  * `handler`
  * `temp`
  * `foo`

### Código morto

* Código comentado é **proibido**
* Se não é usado → remover

### DRY (com moderação)

* Só abstrair após **3 repetições reais**
* Duplicação controlada > abstração prematura

---

## ⚡ 6. Performance (Obrigatório)

### Regras

* Recursos acima da dobra devem usar `preload`
* Componentes abaixo da dobra devem usar:

  * `client:visible` ou `client:idle`
* Imagens devem sempre conter:

  * `loading`
  * `decoding`
  * `width`
  * `height`
  * `alt`

```astro
<img
  loading="lazy"
  decoding="async"
  width="..."
  height="..."
  alt="..."
/>
```

### Métricas-alvo

* LCP < 2.5s
* Lighthouse Performance > 90
* Bundle inicial < 200kb (gzipped)

---

## ♿ 7. Acessibilidade (WCAG AA — Obrigatório)

### HTML

* Usar sempre HTML semântico:

  * `header`, `main`, `section`, `nav`, `footer`

### Interação

* Todo elemento interativo deve:

  * ser focável
  * ter label acessível
  * funcionar com teclado

```astro
<button aria-label="Abrir menu">
```

### Reduced Motion

* TODAS as animações devem respeitar:

  * `prefers-reduced-motion`

### Contraste

* Texto normal: **mín. 4.5:1**
* Contraste insuficiente é bug crítico

---

## 🛠️ 8. Tooling (Obrigatório)

* ESLint deve passar sem erros
* Prettier deve formatar todo o código
* Husky + lint-staged **não podem ser burlados**
* Script obrigatório:

```json
"validate": "npm run format:check && npm run lint && npm run build"
```

---

## 🚫 9. Anti-Patterns (Proibidos)

O agente **NÃO pode**:

* Criar abstrações “para o futuro”
* Introduzir novas dependências sem justificativa clara
* Aplicar SOLID completo (O, L, D)
* Criar testes para componentes puramente visuais
* Criar estado global
* Refatorar grandes áreas sem dor real

---

## ✅ 10. Regra de Decisão Final (Gate)

Antes de sugerir QUALQUER mudança, o agente deve responder internamente:

1. Isso resolve um problema real e atual?
2. É a solução mais simples possível?
3. O benefício supera claramente o custo?
4. Está alinhado com este arquivo de rules?

👉 Se alguma resposta for **NÃO** → **NÃO IMPLEMENTAR**

---

## 🧠 Mantra do Projeto

> **“Landing page não é sistema enterprise.”**
> **“Simplicidade intencional vence complexidade desnecessária.”**


---


