# Adiel Soares — Personal Brand Experience

Website pessoal de **Adiel Soares** · Product Design · UX/UI · Frontend Engineering.

Stack: **React 19**, **Vite 7**, **Tailwind CSS 4**, **React Router 7**, **i18next / react-i18next**, **Lucide React**.
Conteúdo pré-renderizado em HTML estático (SEO), hidratado no cliente.

## Requisitos

- Node.js **20.19+** (ou 22.12+)
- npm 10+

## Instalação e execução

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build de produção

```bash
# Defina o domínio definitivo (canonical, hreflang, sitemap, Open Graph)
# PowerShell:  $env:SITE_URL="https://seu-dominio.com"; npm run build
# bash:        SITE_URL=https://seu-dominio.com npm run build
npm run build
npm run preview    # http://localhost:4173
```

O build executa, em sequência:

1. `scripts/optimize-images.mjs` — gera o retrato em AVIF/WebP/JPEG (384, 576 e 768 px), as imagens Open Graph por idioma e o `apple-touch-icon.png`.
2. `vite build` — bundle do cliente.
3. `vite build --ssr` — bundle de renderização no servidor (temporário).
4. `scripts/prerender.mjs` — gera o HTML estático de cada rota e idioma com title, description, canonical, `hreflang`, Open Graph, Twitter Cards, Schema.org `Person`, além de `sitemap.xml`, `robots.txt` e `404.html`.

A pasta `dist/` pode ser publicada em qualquer hospedagem estática (Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3…). Configure a hospedagem para servir `404.html` em rotas inexistentes.

## Fotografia

Coloque a foto original em:

```
src/assets/source/adiel-portrait.jpg   (também aceita .jpeg, .png ou .webp)
```

Sem esse arquivo, o build gera um retrato provisório com a marca. O recorte é 4:5, centralizado; as variantes são recriadas automaticamente quando a foto muda.

## Rotas e idiomas

| Idioma | Home  | Portfólio       |
| ------ | ----- | --------------- |
| pt-BR  | `/`   | `/portfolio`    |
| en     | `/en` | `/en/portfolio` |
| es     | `/es` | `/es/portfolio` |

- Traduções em `src/i18n/locales/*.json`. O HTML pré-renderizado embute apenas o idioma atual; os demais são carregados sob demanda.
- A escolha de idioma é salva em `localStorage` (`as-lang`). Ao acessar uma URL sem prefixo com preferência salva em EN/ES, o visitante é redirecionado; URLs com prefixo explícito são respeitadas.

## Temas, contraste e acessibilidade

- **Seletor de tema** (Claro · Escuro · Sistema) no header e no menu mobile. A escolha é salva em `localStorage` (`as-theme`); em "Sistema" (padrão), segue `prefers-color-scheme` e acompanha mudanças do sistema.
- **Alto contraste** independente do tema, salvo em `as-contrast`; sem escolha manual, segue `prefers-contrast: more`. Existem quatro combinações de tokens: escuro, claro, escuro + alto contraste e claro + alto contraste.
- Todos os pares de tokens atendem WCAG 2.2 AA (texto ≥ 4,5:1, bordas de controles e foco ≥ 3:1).
- Navegação por teclado, link "pular para o conteúdo", menu mobile com foco preso e `Esc`, `prefers-reduced-motion` respeitado em todas as animações (inclusive paralaxe e iluminação ambiente).

## Design tokens

Definidos em `src/styles/index.css` (`@theme` do Tailwind CSS 4 + variáveis semânticas por tema):

| Token                | Escuro    | Claro     | Uso                                  |
| -------------------- | --------- | --------- | ------------------------------------ |
| `--bg-page`          | `#060D1B` | `#F6F9FC` | fundo                                |
| `--bg-surface`       | `#0D192B` | `#FFFFFF` | superfícies                          |
| `--bg-elevated`      | `#15243A` | `#EDF3FA` | superfícies elevadas                 |
| `--text-primary`     | `#F7FAFF` | `#101C2E` | texto principal                      |
| `--text-secondary`   | `#B9CBDB` | `#445A73` | texto secundário                     |
| `--accent`           | `#7EA2FF` | `#1850C8` | links, ícones, estados (texto)       |
| `--accent-2`         | `#3ADCEB` | `#0B7274` | destaques pontuais                   |
| `--signal`           | `#3366F0` | `#1850C8` | preenchimento de ações (texto branco)|
| `--border-subtle`    | `#304760` | `#CEDAE8` | bordas decorativas                   |
| `--border-color`     | `#5B7592` | `#7D8FA6` | bordas de controles (≥ 3:1)          |

- O azul `#477BFF` e o cyan `#3ADCEB` formam o gradiente da marca (`--grad-brand`, `--brand-1/2`). Um violeta elétrico (`--accent-3`, `#9D7BFF` no escuro / `#6A3FD4` no claro) entra apenas em detalhes neon (`--grad-neon`, brilho ambiente, contorno animado do CTA).
- Tipografia: **Bricolage Grotesque** (títulos, eixo óptico automático), **DM Sans** (interface e corpo) e **JetBrains Mono** (metadados).
- Raios: cards 24 px, controles 14 px, botões e seletores em formato pill.
- Efeitos imersivos (todos desativados no alto contraste e com movimento reduzido): piso em perspectiva com grade em deslocamento, scanlines sutis, colchetes de HUD no retrato e contorno neon animado via `@property --angle`.
- Iconografia Lucide em 16 / 20 / 24 / 32 px (`size-4/5/6/8`), traço 1,75 (2,25 no alto contraste).
- Movimento: `--ease-brand` `cubic-bezier(0.22, 1, 0.36, 1)`, durações 160 / 280 / 640 ms; animações apenas com `transform`, `opacity` e `stroke-dashoffset`.

## Estrutura

```
src/
  app/              entradas cliente/servidor e rotas
  assets/brand/     sistema de marca em SVG (monograma, logotipo, variantes)
  assets/source/    foto original (não versionar se preferir)
  components/
    illustrations/  demonstrações conceituais do portfólio (HTML/SVG)
    layout/         header, footer, menu mobile, seletores, container
    ui/             botão, logo, cards, tags, reveal, retrato
  data/             conteúdo factual estruturado (trajetória, formação, competências)
  hooks/            tema e contraste, revelação, seção ativa, metadados, idioma
  i18n/             configuração, rotas localizadas e traduções
  pages/            Home, Portfólio, 404
  sections/         blocos da homepage
  styles/           tokens (@theme), temas semânticos e estilos globais
scripts/            otimização de imagens e pré-renderização
public/             favicon e arquivos estáticos
```

## Sistema de marca

Arquivos em `src/assets/brand/`:

- `monogram.svg` / `monogram-light.svg` — monograma AS colorido (fundos claros / escuros)
- `monogram-mono-dark.svg` / `monogram-mono-light.svg` — versões monocromáticas
- `logo-horizontal.svg` / `logo-horizontal-light.svg` — logotipo com assinatura textual
- `public/favicon.svg` — favicon

O símbolo é 100% vetorial, construído em grade 54×40 com traço único de 6 unidades, terminais e junções arredondados. A perna direita do "A" é o elo em gradiente azul→cyan que conecta as duas letras (design ↔ engenharia); o "S" tem cantos curvos e inclina no mesmo ângulo da perna. O acabamento futurista vem de três detalhes: uma fenda horizontal que fatia os glifos no eixo central, uma trilha de circuito com nó saindo do S e uma aberração cromática ciano/violeta (que "glitcha" no hover do logo no site). As versões monocromáticas mantêm fenda e nó, sem a aberração. Os logotipos horizontais usam texto SVG com Bricolage Grotesque; para materiais impressos, converta o texto em contornos na ferramenta de design.

## Contato

Canais em `src/data/profile.js` (`contact`): e-mail, WhatsApp (botão flutuante e seção de contato, com mensagem inicial traduzida), LinkedIn e Instagram.

## Conteúdo e integridade

Todas as informações profissionais estão em `src/data/profile.js` e nos arquivos de tradução. O portfólio é organizado por competências; as ilustrações são conceituais e identificadas como tal. Não há métricas, clientes ou cases inventados.
