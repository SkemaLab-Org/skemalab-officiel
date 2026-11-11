---
title: "Titre de l'article en français"
description: "Résumé de 50 à 160 caractères utilisé pour le SEO et les partages sociaux."
excerpt: "Accroche courte affichée sur la carte de l'article dans la liste du blog."
coverAlt: "Description précise de l'image de couverture"
tags: ["exemple", "web"]
---

Ouvrez cet article par un paragraphe qui pose le problème concret du lecteur.
Le frontmatter ci-dessus est obligatoire, sauf `excerpt` qui est optionnel.

## Une première section

Utilisez des titres `##` pour les sections et `###` pour les sous-sections :
ils alimentent automatiquement le sommaire de l'article.

### Sous-section

Le texte accepte **le gras**, *l'italique*, `le code inline`, les [liens](https://www.skemalab.com)
et les listes :

- un point ;
- un autre point ;
- un dernier point.

1. Une étape
2. Une autre étape
3. La dernière étape

## Encadrés

> [!NOTE]
> Information complémentaire.

> [!TIP]
> Bonne pratique à appliquer.

> [!WARNING]
> Point de vigilance.

> [!IMPORTANT]
> Information essentielle.

> [!CAUTION]
> Risque à éviter.

## Tableaux et code

| Colonne A | Colonne B |
| --- | --- |
| Valeur 1 | Valeur 2 |

```js
const message = "Le code reste toujours lisible de gauche à droite";
console.log(message);
```

## Images

![Texte alternatif utile](https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80)

Toute image doit venir d'un domaine listé dans `src/lib/blog/image-hosts.json`
et utiliser une URL `https://`.

## Conclusion

Terminez par une phrase d'action et, si utile, un lien vers une autre page du site.
