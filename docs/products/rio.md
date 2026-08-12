# Rio

**Product:** Rio — Digital twin for agriculture
**Category:** Intelligent systems for the real world
**Gytev product n°1**

---

## The Problem

Farmers often make decisions without precise information about the real state of their fields:

- soil moisture
- temperature
- air quality
- rainfall
- crop condition
- disease risk

General weather information is not enough: it does not represent the exact conditions of each field.

## The Solution

Install an **IoT Box** directly on the farm. The box embeds several sensors that continuously collect data:

- soil moisture
- temperature
- air humidity
- light intensity
- rainfall
- soil pH (optional)
- electrical conductivity (optional)
- water level (optional)

All this data is automatically sent to the platform.

## Where AI Comes In

The AI does not work alone. It relies on several sources:

- data collected by the IoT Box
- field history
- weather data
- satellite data (Sentinel, Landsat, …)
- existing agronomic databases
- knowledge about crops (maize, cotton, rice, tomato, etc.)

The AI compares incoming data against this knowledge base and makes predictions.

**Example:** if soil moisture has been dropping for several days, the weather forecast announces a week without rain, and the crop is maize at the flowering stage, the AI can predict:

- high water-stress risk
- potential yield loss of 18%
- irrigation recommended within the next 24 hours

## The Real Objective

The project is not simply a dashboard. It is an **intelligent agricultural decision assistant**. Its role is to answer four essential questions:

1. What is currently happening on the field? (IoT sensors)
2. Why is it happening? (AI analysis)
3. What is likely to happen in the coming days or weeks? (prediction)
4. What should the farmer do? (recommendations)

## General Architecture

```
IoT sensors
     │
     ▼
Real-time data collection
     │
     ▼
Server / Cloud
     │
     ├── Historical database
     ├── Weather data
     ├── Satellite data
     ├── Agronomic knowledge base
     │
     ▼
AI engine
     │
     ├── Anomaly detection
     ├── Yield prediction
     ├── Disease forecasting
     ├── Water-stress forecasting
     └── Recommendations
     │
     ▼
Web / Mobile application
```

## What Makes Rio Innovative

The innovation lies not only in the use of AI or IoT, but in their combination:

- **IoT**: continuous collection of real data in the field
- **AI**: analyzes this data and produces predictions
- **Digital twin**: creates a virtual representation of the field that simulates scenarios (with or without irrigation, different fertilizer doses, various climate conditions, etc.)

In other words, the digital twin becomes a living virtual copy of the farm, constantly updated thanks to IoT Box data.

## In One Sentence

Rio is a smart agriculture platform that combines an IoT Box, agroclimatic data and artificial intelligence models to create a digital twin of farms — capable of monitoring crops in real time, predicting risks (drought, disease, yield loss) and recommending the best decisions to farmers.

---

## Version française

# Rio

**Produit :** Rio — Jumeau numérique pour l'agriculture
**Catégorie :** Systèmes intelligents pour le monde réel
**Produit Gytev n°1**

## Le problème

Les agriculteurs prennent souvent leurs décisions sans disposer d'informations précises sur l'état réel de leurs parcelles :

- humidité du sol
- température
- qualité de l'air
- pluviométrie
- état des cultures
- risques de maladies

Les informations météo générales ne suffisent pas : elles ne représentent pas les conditions exactes de chaque parcelle.

## La solution

Installer une **Box IoT** directement sur l'exploitation agricole. Cette box embarque plusieurs capteurs qui collectent en continu des données comme :

- humidité du sol
- température
- humidité de l'air
- luminosité
- pluviométrie
- pH du sol (option)
- conductivité électrique (option)
- niveau d'eau (option)

Toutes ces données sont envoyées automatiquement vers la plateforme.

## Où intervient l'IA

L'IA ne travaille pas seule. Elle s'appuie sur plusieurs sources :

- données collectées par la Box IoT
- historique de la parcelle
- données météorologiques
- données satellitaires (Sentinel, Landsat, …)
- bases agronomiques existantes
- connaissances sur les cultures (maïs, coton, riz, tomate, etc.)

L'IA compare les données reçues avec cette base de connaissances puis réalise des prédictions.

**Exemple :** si l'humidité du sol baisse depuis plusieurs jours, que la météo annonce une semaine sans pluie, et que la culture est du maïs au stade de floraison, alors l'IA peut prédire :

- risque de stress hydrique élevé
- baisse potentielle de rendement de 18 %
- irrigation recommandée dans les prochaines 24 heures

## Le véritable objectif

Le projet n'est donc plus simplement un tableau de bord. Il s'agit de construire un **assistant intelligent de décision agricole**. Son rôle est de répondre à quatre questions essentielles :

1. Que se passe-t-il actuellement sur la parcelle ? (grâce aux capteurs IoT)
2. Pourquoi cela se produit-il ? (analyse IA)
3. Que risque-t-il de se passer dans les prochains jours ou semaines ? (prédiction)
4. Que doit faire l'agriculteur ? (recommandations)

## Architecture générale

```
Capteurs IoT
     │
     ▼
Collecte des données en temps réel
     │
     ▼
Serveur / Cloud
     │
     ├── Base de données historique
     ├── Données météo
     ├── Données satellites
     ├── Base de connaissances agronomiques
     │
     ▼
Moteur IA
     │
     ├── Détection d'anomalies
     ├── Prédiction des rendements
     ├── Prévision des maladies
     ├── Prévision du stress hydrique
     └── Recommandations
     │
     ▼
Application Web / Mobile
```

## Ce qui rend Rio innovant

L'innovation ne réside pas uniquement dans l'utilisation de l'IA ou de l'IoT, mais dans leur combinaison :

- **IoT** : collecte de données réelles en continu sur le terrain
- **IA** : analyse ces données et produit des prédictions
- **Jumeau numérique** : crée une représentation virtuelle de la parcelle permettant de simuler différents scénarios (avec ou sans irrigation, avec différentes doses d'engrais, selon diverses conditions climatiques, etc.)

Autrement dit, le jumeau numérique devient une copie virtuelle vivante de l'exploitation, constamment mise à jour grâce aux données de la Box IoT.

## En une phrase

Rio est une plateforme d'agriculture intelligente qui combine une Box IoT, des données agroclimatiques et des modèles d'intelligence artificielle pour créer un jumeau numérique des exploitations agricoles — capable de surveiller les cultures en temps réel, de prédire les risques (sécheresse, maladies, baisse de rendement) et de recommander les meilleures décisions aux agriculteurs.
