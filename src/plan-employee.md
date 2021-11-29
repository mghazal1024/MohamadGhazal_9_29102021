# Plan de test End-to-End du parcours employé

## Scénario 1

**Given** Je suis un visiteur (non connecté)

**When** Je ne remplis pas le champ e-mail ou le champ password du login employé et je clique sur le bouton Se connecter

**Then** Je reste sur la page Login

**And** Je suis invité à remplir le champ manquant


## Scénario 2

**Given** Je suis un visiteur (non connecté)

**When** Je remplis le champ e-mail du login employé au mauvais format (sans la forme chaîne@chaîne) et je clique sur le bouton Se connecter

**Then** Je reste sur la page Login

**And** Je suis invité à remplir le champ e-mail au bon format


## Scénario 3

**Given** Je suis un visiteur (non connecté)

**When** je remplis le champ e-mail du login employé au bon format (sous la forme chaîne@chaîne), le champ password du login employé et je clique sur le bouton Se connecter

**Then** Je suis redirigé vers la page Bills



## Scénario 4

**Given** Je suis connecté en tant qu'employé

**When** Je suis sur la page Bills

**Then** la liste des notes de frais s'affiche, de la plus récente à la plus ancienne


## Scénario 5

**Given** Je suis connecté en tant qu’employé sur la page Bills

**When** Je clique le bouton Nouvelle note de frais

**Then** Je suis redirigé sur la page NewBill

**And** Le formulaire de création d’une nouvelle note de frais est affiché


## Scénario 6

**Given** Je suis connecté en tant qu’employé sur la page NewBill

**When** Je ne remplis pas les champs obligatoires du formulaire de création d’une nouvelle note de frais et je clique le bouton Envoyer

**Then** Je reste sur le formulaire de création d’une nouvelle note de frais

**And** Je suis invité à remplir tous les champs manquants


## Scénario 7

**Given** Je suis connecté en tant qu’employé sur la page NewBill

**When** Je clique sur le bouton pour ajouter justificatif

**Then** Je ne peux ajouter qu'un fichier au format jpg, jpeg ou png


## Scénario 8

**Given** Je suis connecté en tant qu’employé sur la page NewBill

**When** Je remplis les champs obligatoires du formulaire de création d’une nouvelle note de frais et je clique sur le bouton Envoyer

**Then** Je suis redirigé sur la page Bills

**And** La note de frais que je viens d'envoyer s'affiche en tête de la liste des notes de frais avec le statut "En attente"


## Scénario 9

**Given** Je suis connecté en tant qu'employé et je suis sur la page Bills

**When** Je clique sur le bouton pour visualiser une note de frais

**Then** Une boîte modale s'ouvre et affiche le justificatif de la note de frais


## Scénario 10

**Given** Je suis connecté en tant qu'employé sur la page Bills et j'ai cliqué sur le bouton pour visualiser une note de frais

**When** Je clique sur le bouton quitter de la boîte modale

**Then** La boîte modale de ferme


## Scénario 11

**Given** Je suis connecté en tant qu'employé et je suis sur la page Bills

**When** Je clique sur le bouton Se déconnecter de la barre verticale

**Then** Je suis envoyé à la page Login


## Scénario 12

**Given** Je suis connecté en tant qu'employé et je suis sur la page Bills

**When** Je clique sur le bouton Retour en arrière de la navigation

**Then** Je reste sur la page Bills