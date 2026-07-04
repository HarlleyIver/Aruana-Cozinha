# Blog da Aruana Cozinha, painel autogerenciavel

A Larica cadastra Eventos e Receitas sozinha por um painel, sem mexer em codigo
e sem depender de voce. O site atualiza sozinho a cada publicacao.

Stack: site estatico gerado com Eleventy (11ty) + painel Decap CMS + login pelo
DecapBridge (email e senha, sem precisar de conta no GitHub).

---

## Como rodar e ver o blog na sua maquina

```
npm install     # so na primeira vez
npm start       # abre em http://localhost:8080  (blog em /blog/, painel em /admin/)
npm run build   # gera a versao final em _site/
```

O `index.html` original nao e tocado: o build so copia ele igualzinho e adiciona
as paginas do blog do lado.

---

## Parte 1: ligar o login (voce faz uma vez)

1. **Deploy na Vercel** (o site ja vive la)
   - O `vercel.json` ja configura o build: comando `npm run build` e pasta de saida
     `_site`. Como agora existe uma etapa de build, confira no projeto da Vercel que
     o "Output Directory" esta como `_site` (o `vercel.json` ja força isso).
   - A cada push no `main` (inclusive quando a Larica publica pelo painel), a Vercel
     reconstroi o site sozinho.
   - Obs: o `netlify.toml` fica no repo apenas como alternativa; pode ignorar.

2. **Criar o login no DecapBridge** (https://decapbridge.com)
   - Crie uma conta e crie um "Site".
   - Linke o repositorio `HarlleyIver/Aruana-Cozinha` (voce autoriza o app do
     DecapBridge com acesso somente a esse repositorio).
   - O DecapBridge te mostra um `base_url` (e confirma o `auth_endpoint`).

3. **Colar os valores no painel**
   - Abra `admin/config.yml` e troque as duas linhas marcadas `>>> TROCAR <<<`
     pelo `base_url` e `auth_endpoint` que o DecapBridge gerou.
   - Troque tambem `site_url` e `display_url` pelo dominio real.
   - Commit e push. O Netlify reconstroi o site sozinho.

## Parte 2: convidar a Larica (voce faz)

4. No painel do DecapBridge, use "Invite collaborator" e coloque o email dela.
   Ela recebe um convite, cria a senha e pronto. Somente quem voce convida entra.

## Parte 3: como ela usa (pode mandar isso pra ela)

5. Acesse `seudominio/admin` e entre com email e senha.
6. Clique em **Receitas** ou **Eventos e encontros** e depois em **New**.
   Preencha titulo, data, resumo, suba uma foto e escreva o texto.
7. Clique em **Publish**. Em um a dois minutos o site atualiza sozinho.
8. Os dois posts de exemplo podem ser apagados quando ela quiser.

---

## Seguranca (o que garante os requisitos)

- **So ela edita.** Sem convite no DecapBridge, ninguem loga nem altera nada.
  A pagina `/admin` ate carrega para qualquer um, mas e inutil sem login.
- **Nada vaza.** O segredo do OAuth fica no DecapBridge, nunca no repositorio.
  O `config.yml` guarda so o `base_url` publico, nenhum token.
- **Acesso minimo.** O app do DecapBridge no GitHub enxerga somente este repositorio.
- **Front intocado.** Ela so cria posts. O `index.html` continua identico
  (conferido por hash no build).
- Recomendado: ativar verificacao em duas etapas na sua conta do GitHub e do DecapBridge.

## Pendente do seu OK: link do blog no menu

Hoje o menu do site NAO tem link para o blog, de proposito, porque voce pediu
para nao alterar o front. Para o visitante achar o blog, em algum momento vale
colocar um link "Blog" no menu do `index.html`. Isso e uma mudanca visivel no
front, entao so faco quando voce autorizar. Por enquanto o blog vive em `/blog/`.
