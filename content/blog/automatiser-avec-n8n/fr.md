---
title: "Automatiser sa prospection avec n8n"
description: "Automatisez votre prospection avec n8n : un workflow simple pour collecter, qualifier et relancer vos leads."
excerpt: "Un cas concret de workflow n8n pour collecter des leads, les qualifier et déclencher les bonnes relances."
coverAlt: "Écran d'ordinateur affichant du code et des automatisations"
tags: ["automatisation", "n8n"]
---

La prospection manuelle devient vite un frein : les leads s'accumulent dans une feuille de calcul, les relances sont oubliées et personne ne sait vraiment où en est chaque contact. **n8n** permet de corriger cela sans construire une application complète.

## Le besoin réel

Nous cherchions un système simple capable de :

- centraliser les demandes entrantes ;
- qualifier chaque lead selon son budget et son besoin ;
- notifier l'équipe uniquement pour les contacts pertinents ;
- déclencher une relance après trois jours sans réponse.

Le tout devait rester compréhensible par une personne non développeuse.

## Le workflow en quatre étapes

1. **Déclencheur** : un webhook reçoit le formulaire du site.
2. **Normalisation** : les champs sont nettoyés et les doublons supprimés.
3. **Qualification** : un nœud conditionnel route les leads chauds vers Slack.
4. **Relance** : une attente de trois jours précède un e-mail personnalisé.

> [!TIP]
> Commencez avec un seul scénario et un seul canal. Un workflow trop large est difficile à déboguer.

## La partie technique

Le webhook renvoie un objet JSON normalisé :

```json
{
  "name": "Amina",
  "email": "amina@example.com",
  "budget": 8000,
  "need": "Refonte du site"
}
```

Dans n8n, un nœud **Code** peut calculer un score simple :

```js
const budget = Number($json.budget) || 0;
const need = String($json.need || "").toLowerCase();

const score = (budget >= 5000 ? 2 : 0) + (need.includes("site") ? 1 : 0);

return [{ json: { ...$json, score } }];
```

Ensuite, un nœud **IF** envoie les scores supérieurs ou égaux à 2 vers Slack, et les autres vers une séquence de nurturing.

> [!WARNING]
> Vérifiez toujours les doublons avant d'envoyer un e-mail. Une relance envoyée deux fois coûte plus cher qu'une relance oubliée.

## Ce que nous avons appris

| Problème | Solution |
| --- | --- |
| Leads en double | Déduplication sur l'e-mail |
| Relances oubliées | Attente + tâche planifiée |
| Équipe surchargée | Notification conditionnelle |

Après un mois, le temps de traitement d'un lead est passé de quinze minutes à moins de deux. Le vrai gain n'est pas la vitesse : c'est la régularité.

Pour aller plus loin, lisez [notre article d'introduction](/fr/blog/bienvenue-sur-le-blog) ou [contactez-nous](/#contact) pour cadrer votre premier workflow.
