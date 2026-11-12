# Blog Skemalab — documentation

Blog multilingue (FR / EN / AR) en Markdown, sans base de données, sans CMS et
sans back-office. Un article = un dossier dans `content/blog/<catégorie>/`.
Déposer les fichiers suffit à publier l'article et à l'assigner à une catégorie.

- Stack : Next.js 16 (App Router), React 19, JavaScript (pas de TypeScript).
- Rendu : SSG + ISR (`revalidate = 60`).
- Déploiement : Vercel.
- Langues : `/fr/blog`, `/en/blog`, `/ar/blog` avec URLs distinctes.
- Pagination par chemin : `/fr/blog/page/2` (aucun `searchParams`).
- RTL réel pour l'arabe, code et URLs toujours LTR.

---

## 1. Publier un article en 4 étapes

### Étape 1 — Créer le dossier dans une catégorie

Le blog a trois catégories fixes : `build`, `grow` et `automate`. La catégorie
d'un article est **déduite de son dossier parent** : il n'y a rien à écrire
dans `meta.json`.

| Dossier                    | Catégorie | Sujets couverts                              |
| -------------------------- | --------- | -------------------------------------------- |
| `content/blog/build/`      | Build     | Sites, applications, interfaces.             |
| `content/blog/grow/`       | Grow      | Visibilité, acquisition, croissance.         |
| `content/blog/automate/`   | Automate  | Automatisation, workflows, agents IA.        |

Dupliquez `content/blog/_TEMPLATE/` dans la catégorie choisie et renommez-le
avec le slug de l'article.

```
content/blog/automate/mon-nouvel-article/
├── meta.json
├── fr.md
├── en.md
└── ar.md
```

Règles du slug : minuscules, chiffres et tirets uniquement
(`^[a-z0-9]+(?:-[a-z0-9]+)*$`). Slugs réservés : `page`, `category`, `rss`,
`rss.xml`. Les dossiers commençant par `_` ou `.` sont ignorés.

Un article déposé directement à la racine de `content/blog/` (hors
`_TEMPLATE`) est refusé : la validation signale une catégorie inconnue. Un même
slug ne peut exister que dans une seule catégorie, sinon les URLs
`/{locale}/blog/{slug}` entreraient en collision.

### Étape 2 — Renseigner `meta.json`

Métadonnées communes aux trois langues :

| Champ      | Type    | Obligatoire | Rôle                                                        |
| ---------- | ------- | ----------- | ----------------------------------------------------------- |
| `date`     | string  | oui         | Date de publication `YYYY-MM-DD`. Une date future masque l'article partout. |
| `updated`  | string  | non         | Date de mise à jour `YYYY-MM-DD`.                            |
| `cover`    | string  | oui         | URL `https://` d'un domaine autorisé (voir §4).              |
| `author`   | string  | non         | Auteur affiché. Défaut : `Skemalab`.                         |
| `featured` | boolean | non         | Met l'article en avant sur la première page. Défaut : `false`. |
| `draft`    | boolean | non         | `true` = invisible partout. Défaut : `false`.                |

Les clés inconnues sont refusées (schéma strict).

### Étape 3 — Écrire les trois fichiers Markdown

Chaque fichier commence par un frontmatter YAML :

| Champ         | Type   | Obligatoire | Contrainte                                      |
| ------------- | ------ | ----------- | ----------------------------------------------- |
| `title`       | string | oui         | 3 à 120 caractères.                             |
| `description` | string | oui         | 50 à 160 caractères (SEO + partages).           |
| `excerpt`     | string | non         | 300 caractères max. Accroche des cartes. Défaut : `description`. |
| `coverAlt`    | string | oui         | Texte alternatif de la couverture.              |
| `tags`        | array  | non         | Tags **localisés**, affichés en badges non cliquables (voir §3). Défaut : `[]`. |

Une langue absente (`en.md` manquant, par exemple) génère un warning mais
l'article reste publié dans les autres langues. Il sera simplement absent de
`/en/blog`, de son sitemap et de son RSS.

### Étape 4 — Vérifier puis publier

```bash
npm run content:check   # validation seule
npm test                # tests du chargeur et du rendu Markdown
npm run build           # validation + build de production
```

Sur Vercel, poussez sur la branche connectée : le build valide le contenu puis
déploie. Un article invalide fait échouer le build, donc rien de cassé n'est
publié.

---

## 2. URLs et navigation

| Page                | URL                                  |
| ------------------- | ------------------------------------ |
| Liste (page 1)      | `/fr/blog`, `/en/blog`, `/ar/blog`   |
| Liste paginée       | `/{locale}/blog/page/2`              |
| Catégorie           | `/{locale}/blog/category/{build,grow,automate}` |
| Catégorie paginée   | `/{locale}/blog/category/{catégorie}/page/2` |
| Article             | `/{locale}/blog/{slug}`              |
| Flux RSS            | `/{locale}/blog/rss.xml`             |

Les anciennes URLs sans langue sont redirigées vers le français :
`/blog` → `/fr/blog`, `/blog/mon-article` → `/fr/blog/mon-article`,
`/blog/page/2`, `/blog/category/build` et `/blog/rss.xml` de la même manière.

Les anciennes URLs de tags (`/blog/tag/x` et `/{locale}/blog/tag/x`) redirigent
vers l'index du blog : les tags ne sont plus des pages, seulement des
métadonnées.

Le sélecteur de langue du site pointe vers la traduction correspondante de la
page courante. Si l'article n'existe pas dans la langue choisie, il renvoie vers
l'index du blog dans cette langue.

---

## 3. Contenu et rendu Markdown

### Syntaxe prise en charge

- Titres `#`, `##`, `###` (les `##`/`###` alimentent le sommaire).
- **Gras**, *italique*, `code inline`, ~~barré~~.
- Listes à puces, listes numérotées, listes de tâches (`- [x]`).
- Citations, tableaux GFM, liens, images, séparateurs `---`.
- Blocs de code clôturés avec coloration syntaxique (Shiki), thème clair/sombre.
- Encadrés :

```markdown
> [!NOTE]
> Information complémentaire.

> [!TIP]
> Bonne pratique.

> [!WARNING]
> Point de vigilance.

> [!IMPORTANT]
> Information essentielle.

> [!CAUTION]
> Risque à éviter.
```

### Sécurité

Le HTML brut est supprimé (pas de `dangerouslySetInnerHTML` du Markdown sans
sanitisation). Le pipeline applique `rehype-sanitize` avant les transformations
maison ; les liens externes reçoivent `target="_blank"` et
`rel="noopener noreferrer"`.

### Catégories et tags

Une catégorie (`build`, `grow`, `automate`) n'est pas un champ du contenu :
elle vient du dossier parent, ce qui évite les oublis et les incohérences. La
barre de filtres du blog liste les trois catégories avec leur nombre d'articles,
et chaque catégorie possède ses propres URLs et son propre `hreflang`.

Les tags restent des métadonnées libres, écrites dans la langue de l'article.
Ils alimentent les mots-clés SEO, le RSS et les articles liés, et s'affichent
comme badges non cliquables sous le titre. Un même sujet peut donc s'appeler
`automatisation` (FR), `automation` (EN) et `الأتمتة` (AR).

### Arabe et RTL

- `/[locale]/blog` déclare `lang` et `dir` (`rtl` pour `ar`).
- `LocaleSync` et le script inline de `src/app/layout.js` alignent ensuite
  `<html>` sur la langue de l'URL.
- Tout le CSS du blog utilise des propriétés logiques
  (`margin-inline`, `padding-inline`, `inset-inline`, `border-inline-start`).
- Le code, le `code inline` et les blocs `pre` restent en `direction: ltr` avec
  `unicode-bidi: isolate`.
- La police arabe existante du site (Cairo) est réutilisée ; aucune police
  supplémentaire n'est chargée.

---

## 4. Images

### Couverture

`meta.json → cover` doit être :

1. une URL absolue commençant par `https://` ;
2. hébergée sur un domaine listé dans `src/lib/blog/image-hosts.json`.

Exemple :

```json
{
  "cover": "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1600&q=80"
}
```

### Images dans le corps

Les images Markdown (`![alt](https://...)`) et HTML (`<img src="...">`) sont
vérifiées par le même contrôle. Une image en `http://` ou sur un domaine inconnu
fait échouer `npm run content:check`.

### Ajouter un domaine

1. Ajoutez le hostname exact dans `src/lib/blog/image-hosts.json`.
2. Relancez `npm run build`.

Ce fichier est la **source unique** : il alimente à la fois
`next.config.mjs → images.remotePatterns`, la CSP `img-src` et le validateur de
contenu. Aucun autre fichier à modifier.

> Les caractères génériques (`*.imgur.com`) sont acceptés par
> `remotePatterns`, mais le validateur compare le hostname exact. Préférez
> toujours un hostname précis.

---

## 5. Brouillons, dates futures et langues manquantes

| Situation                              | Résultat                                              |
| -------------------------------------- | ----------------------------------------------------- |
| `draft: true`                          | Invisible partout (liste, catégories, article, RSS, sitemap). |
| `date` dans le futur                   | Invisible partout jusqu'à la date, puis publié à l'ISR suivante. |
| `en.md` manquant                       | Visible en FR et AR seulement.                        |
| Article hors d'une catégorie           | Erreur de validation, build bloqué.                   |
| Slug présent dans deux catégories      | Erreur de validation, build bloqué.                   |
| Toutes les langues valides manquantes  | Erreur de validation, article exclu.                  |
| `description` hors 50–160 caractères   | Erreur de validation, build bloqué.                   |
| Image `http://` ou domaine inconnu     | Erreur de validation, build bloqué.                   |
| Clé inconnue dans un frontmatter       | Erreur de validation, build bloqué.                   |

---

## 6. SEO

Chaque page génère :

- `canonical` vers l'URL de la langue courante ;
- `hreflang` pour chaque traduction disponible + `x-default` (FR en priorité) ;
- Open Graph (`website` pour les listes, `article` pour les articles) ;
- Twitter Card `summary_large_image` ;
- JSON-LD `BlogPosting` (`articleSection` = catégorie) + `BreadcrumbList` sur
  les articles ;
- RSS par langue, déclaré via `alternates.types` ;
- entrées de sitemap avec `alternates.languages`, y compris le blog et les
  catégories qui contiennent au moins un article.

L'URL publique est lue dans `NEXT_PUBLIC_SITE_URL`, avec
`https://www.skemalab.com` par défaut.

---

## 7. Architecture des fichiers

### Contenu

```
content/blog/
├── _TEMPLATE/            # modèle ignoré par le chargeur
├── build/
│   └── bienvenue-sur-le-blog/
│       ├── meta.json
│       ├── fr.md
│       ├── en.md
│       └── ar.md
├── grow/
│   └── votre-marque-dans-les-recherches-ia/
│       ├── meta.json
│       └── ...
└── automate/
    └── automatiser-avec-n8n/
        ├── meta.json
        └── ...
```

La catégorie vient exclusivement du nom du dossier parent (`build`, `grow` ou
`automate`). Tout autre dossier à la racine de `content/blog/` est une erreur.

### Code

| Fichier                                              | Rôle                                                  |
| ---------------------------------------------------- | ----------------------------------------------------- |
| `src/lib/blog/config.js`                             | Locales, catégories, chemins, formats de date, URL du site. |
| `src/lib/blog/schema.js`                             | Schémas Zod, slugs réservés, validation des images.   |
| `src/lib/blog/core.js`                               | Lecture `catégorie/slug`, règles de publication, temps de lecture. |
| `src/lib/blog/posts.js`                              | Couche de données serveur (`cache()`), catégories, articles liés. |
| `src/lib/blog/markdown.js`                           | Pipeline unified/remark/rehype, callouts, sommaire, Shiki. |
| `src/lib/blog/sitemap.js`                            | Entrées de sitemap du blog.                           |
| `src/lib/blog/ui-strings.js`                         | Libellés d'interface FR/EN/AR.                        |
| `src/lib/blog/alternates-store.js`                   | Store client des traductions disponibles.             |
| `src/lib/blog/image-hosts.json`                      | Domaines d'images autorisés (source unique).          |
| `src/components/blog/*`                              | Cartes, couverture, sommaire, partage, JSON-LD, etc.  |
| `src/app/[locale]/blog/*`                            | Routes App Router du blog.                            |
| `src/app/[locale]/blog/blog.css`                     | Styles du blog (propriétés logiques).                 |
| `scripts/validate-content.mjs`                       | Entrée de `npm run content:check`.                    |
| `src/lib/blog/__tests__/*`                           | Tests Vitest du chargeur et du rendu.                 |

### Routes

| Fichier                                         | Route                          |
| ----------------------------------------------- | ------------------------------ |
| `src/app/[locale]/blog/layout.jsx`              | Layout, `lang`/`dir`, RSS       |
| `src/app/[locale]/blog/page.jsx`                | `/{locale}/blog`                |
| `src/app/[locale]/blog/page/[n]/page.jsx`       | `/{locale}/blog/page/{n}`       |
| `src/app/[locale]/blog/[slug]/page.jsx`         | `/{locale}/blog/{slug}`         |
| `src/app/[locale]/blog/category/[category]/page.jsx` | `/{locale}/blog/category/{catégorie}` |
| `src/app/[locale]/blog/category/[category]/page/[n]/page.jsx` | `/{locale}/blog/category/{catégorie}/page/{n}` |
| `src/app/[locale]/blog/rss.xml/route.js`        | `/{locale}/blog/rss.xml`        |

---

## 8. Intégration au site existant

### Synchronisation de la langue

Le site utilise un i18n client (`localStorage` + cookie `NEXT_LOCALE`), sans
préfixe de langue dans l'URL. Le blog introduit des URLs localisées. Pour éviter
deux sources de vérité :

- `src/app/layout.js` détecte `/(fr|en|ar)/blog` **avant le premier paint** et
  applique `lang`, `dir` et `rtl` sur `<html>` ;
- `src/components/I18nProvider.jsx` fait la même détection dans
  `getStoredLocale()` ;
- `LocaleSync` (client) aligne l'état React sur l'URL ;
- `LanguageSwitcher` navigue vers l'alternative blog quand on change de langue.

Le hook utilisé est donc **`useI18n()` / `setLocale`** existant, sans nouvelle
librairie i18n.

### Navigation

`Navbar` et `Footer` résolvent `/blog` vers `/{locale}/blog`. Les trois fichiers
de traduction (`fr.js`, `en.js`, `ar.js`) contiennent une entrée `Blog` dans
`nav`.

### Quirks conservés

- `<html>` reste déclaré `lang="fr"` dans le layout racine ; le blog corrige
  ensuite via le wrapper, le script inline et `LocaleSync`.
- Le site n'utilise pas de routes `[locale]` en dehors du blog. `[locale]` ne
  capture donc que `/fr`, `/en`, `/ar` suivis de `/blog` ; les autres chemins
  restent inchangés.

---

## 9. Déploiement Vercel (mode A)

Le contenu est lu depuis le système de fichiers **au build** et mis en cache par
l'ISR. Sur Vercel :

1. Les fichiers `content/**` sont inclus dans les fonctions serveur grâce à
   `outputFileTracingIncludes` dans `next.config.mjs`.
2. `generateStaticParams` pré-génère les articles connus au build.
3. `dynamicParams = true` permet de générer à la demande un slug apparu après le
   déploiement, mais **un nouvel article nécessite quand même un
   redéploiement** pour que ses fichiers soient présents dans le bundle.

Autrement dit : **publier = commit + push + build Vercel**. L'ISR accélère les
choses et rafraîchit le HTML toutes les 60 secondes, mais ne peut pas lire un
fichier qui n'a jamais été déployé.

Si vous voulez publier sans redéployer, il faudra plus tard externaliser le
contenu (KV, S3, CMS headless) : ce n'est pas le périmètre de cette version.

### Variables d'environnement

| Variable               | Défaut                      | Rôle                          |
| ---------------------- | --------------------------- | ----------------------------- |
| `NEXT_PUBLIC_SITE_URL` | `https://www.skemalab.com`  | Base des URLs canoniques, OG, RSS, sitemap. |

---

## 10. Commandes

```bash
npm install             # installer les dépendances
npm run dev             # développement
npm run content:check   # valider le contenu uniquement
npm test                # tests Vitest
npm run build           # validation + build de production
npm run start           # servir le build
npm run lint            # ESLint
```

Après `npm run start`, vérifications manuelles utiles :

```bash
curl -I http://localhost:3000/fr/blog
curl -I http://localhost:3000/en/blog/automatiser-avec-n8n
curl -I http://localhost:3000/ar/blog
curl -I http://localhost:3000/fr/blog/rss.xml
curl -I http://localhost:3000/blog            # doit rediriger vers /fr/blog
```

---

## 11. Hypothèses et points à valider manuellement

1. **Images Unsplash** : les URLs des articles d'exemple sont des URLs
   Unsplash classiques. Vérifiez qu'elles répondent toujours en 200 avant une
   mise en production (les photos peuvent être supprimées).
2. **Polices** : le blog réutilise `--font-display`, `--font-mono` et la police
   arabe du site. Si une variable n'existe pas dans un thème, le navigateur
   applique la police de secours.
3. **RTL** : vérifier visuellement `/ar/blog` et un article arabe (sommaire à
   droite, listes, tableaux, boutons de partage).
4. **Sélecteur de langue** : sur un article sans traduction, le changement de
   langue doit ramener à `/{locale}/blog`, pas à une 404.
5. **Sitemap** : vérifier que `/sitemap.xml` contient les URLs du blog avec
   `xhtml:link` pour chaque langue.
6. **RSS** : valider le XML avec un lecteur de flux ; le type MIME doit être
   `application/rss+xml`.
7. **Redirections** : `/blog`, `/blog/page/2`, `/blog/category/build`,
   `/blog/rss.xml` et `/blog/{slug}` doivent renvoyer vers le préfixe `/fr`.
   `/fr/blog/tag/x` doit renvoyer vers `/fr/blog`.
8. **Catégories** : `/fr/blog/category/build`, `/en/blog/category/grow` et
   `/ar/blog/category/automate` doivent s'afficher (y compris vides), et
   `/fr/blog/category/inconnue` doit répondre 404. Vérifier que le filtre actif
   est bien marqué et que les compteurs correspondent.
9. **Pages paginées** : créer plus de 9 articles pour vérifier
   `/fr/blog/page/2` et `/fr/blog/category/{catégorie}/page/2` ;
   `/fr/blog/page/1` doit rediriger vers `/fr/blog`.
10. **Dates futures** : un article daté de demain doit être absent du build, puis
    apparaître après la date (nécessite un redéploiement ou une revalidation).
11. **A11y** : navigation clavier du sommaire et du rail de catégories, focus
    visible sur les cartes, contraste des chips et des tags.

---

## 12. Écarts assumés par rapport à la mission initiale

- **JavaScript, pas TypeScript** : choix explicite du mainteneur. Les fichiers
  sont en `.js`/`.jsx`, avec JSDoc ponctuel.
- **Vercel** : la publication repose sur un redéploiement (mode A) ; l'ISR reste
  configurée.
- **`x-default`** : pointe vers la version FR quand elle existe, sinon vers la
  première traduction disponible.
- **Catégories** : structurelles (`build`, `grow`, `automate`), déduites du
  dossier parent et sans champ dédié dans `meta.json`.
- **Tags** : localisés par langue, sans table de correspondance globale, et
  affichés en badges non cliquables.
- **HTML brut** : supprimé par sécurité ; seuls les callouts, tableaux, listes
  de tâches et blocs de code sont supportés.
- **Validation** : le validateur bloque le build sur les erreurs ; les langues
  manquantes ne sont que des warnings.
