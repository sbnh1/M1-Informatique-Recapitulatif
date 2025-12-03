**Sommaire :**

- **[[#Design patterns|Design patterns]]**
	- **[[#Design patterns#Définition :|Définition :]]**
	- **[[#Design patterns#Type de patrons :|Type de patrons :]]**
		- **[[#Type de patrons :#Patrons Structurel :|Patrons Structurel :]]**
		- **[[#Type de patrons :#Patrons créationnel :|Patrons créationnel :]]**
		- **[[#Type de patrons :#Comportemental :|Comportemental :]]**
- **[[#Conception de l'architecture|Conception de l'architecture]]**
	- **[[#Conception de l'architecture#Patterns Architecturaux :|Patterns Architecturaux :]]**


**PDF résumés :** 

- [ACL-s4-arhitecturePatterns.pdf](https://arche.univ-lorraine.fr/pluginfile.php/4256745/mod_resource/content/2/ACL-s4-arhitecturePatterns.pdf)
- [ACL-s5-designPattern 1.pdf](https://arche.univ-lorraine.fr/pluginfile.php/4261818/mod_resource/content/1/ACL-s5-designPatterns%201.pdf)
- [ACL-s5-designPatterns 1plusDec.pdf](https://arche.univ-lorraine.fr/pluginfile.php/4415286/mod_resource/content/1/ACL-s5-designPatterns%201plusDec.pdf)
- [ACL-s5-designPatterns 2.pdf](https://arche.univ-lorraine.fr/pluginfile.php/4261819/mod_resource/content/1/ACL-s5-designPatterns%202.pdf)

## Design patterns
### Définition : 

> Chaque pattern décrit un problème qui se produit souvent dans un environnement donné et propose le cœur de la solution. Il exprime une relation entre un certain **contexte**, un **problème**, et une **solution**.

### Type de patrons : 

> **Patrons conceptuels :**  Forme décrite par les termes et concepts du domaine d'application.

> **Patrons de conceptions :** Forme décrite par les éléments de construction de conception logicielle.

> **Patrons de programmation :** Forme décrite par les éléments de construction du langage de programmation.

#### **Patrons Structurel :**

> **Decorator** 
>
> - **But :** Attacher dynamiquement des capacités additionnels à un objet. Fournir une alternative flexible à l’héritage pour étendre les fonctionnalités.
>
> - **Utilisation :**  
>   - Ajouter dynamiquement des capacités de manière transparente à un objet sans affecter les autres objets de la classes.
>   - Définir des capacités qui peuvent être retirées. 
>   - L'extension par héritage produirait un **nombre trop important de classes**. 
>   - L'héritage est interdit / impossible.
>
> - **Conséquences :** 
>   \+ Personnalisation d'objets **plus flexible** que l'héritage statique (ajouter/enlever des responsabilités au run-time).
>
>   \+ Possibilité d'ajouter plusieurs fois le même décorateur.
>
>   \+ Ajout de responsabilité de manière **incrémentale**.
>
>   \- Multiplication des classes (les décorations).

> **Composite**
>
> - **But :** Composer des objets dans des **structures arborescences** pour représenter des hiérarchies. Le client manipule **uniformément** les objets simples et les objets composites.
>
> - **Utilisation :**
>   - Représentation de structures récursives
>   - Traitement uniforme de tous les objets du composite, qu'ils soient terminaux (feuilles) ou non.
>
> - **Conséquences :** 
>   \+ / \- Permet de traiter une hiérarchie d'objets comme s'ils étaient tous du même type.*

> **Adapter** 
> - **But :** Convertir une interface d'une classe en celle attendue par le client. Assurer la compatibilité entre des éléments qui ne devraient pas fonctionner ensemble.
>
> - **Utilisation :**
>   - Quand on doit intégrer une classe qu'on ne peut ou veut **pas modifier**.
>   - Quand on veut **éviter de redévelopper une bibliothèque** ou d'écrire une variante.
>   - Quand on souhaite **normaliser** un code ancien.
>
> - **Conséquences :**
>   \- **Class Adapter** (héritage) : Ne fonctionne pas pour adapter une classe et toutes ses sous-classes.
>   \+ **Object Adapter ** (composition) : permet à un seul *Adapter* de fonctionner avec plusieurs *Adaptee* (et leurs sous-classes).
>   \+ Permet la réutilisation et l'adaptation de code

> **Facade** 
>
> - **But :** Fournir une **interface unifiée (simplifiée)** pour un ensemble d'interfaces d'un sous-système complexe.
>
> - **Utilisation :**
>   - Quand on a **plusieurs interfaces complexes** et que l'on souhaite cacher la complexité au client.
>   - Quand on souhaite **réduire les dépendances** entre les clients et le fonctionnement interne.
>   - Quand on souhaite **nettoyer une API vieillissante** ou mal conçue.
>
> - **Conséquences :**
>   \+ Couplage faible entre les classes et l’application
>   \+ Simplicité d'utilisation des sous-systèmes.
>   \- Risques de pertes de fonctionnalités des sous-systèmes (dépend de l'implémentation de la Façade).

#### **Patrons créationnel :**

> **Singleton** 
> 
> - **But :** Garantir qu'une classe n'a qu'une **seule instance** et fournir un **point d'accès global** à cette instance.

> - **Utilisation :**
>   - Il doit y avoir **exactement une instance** d'une classe, et cette instance doit être accessible globalement.
>   - L'instance unique doit être **extensible par héritage** sans modifier le code client.
>   - Quand le propriétaire d'un <u>Singleton</u> ne peut pas être identifié clairement ou quand l'accès global n'est pas fourni d'une autre manière.
>
> - **Conséquences :**
>   \+ Ressemblance avec une "variable globale."
>   \+ Encapsulation de l'initialisation "just-in-time" ou "on first use".

> **Factory Method** 
>
> - **But :** Définir une interface de création d'un objet en déléguant aux **sous-classes concrètes** le choix de la classe à instancier. Définir un **constructeur virtuel**.
>
> - **Utilisations :** 
>   - Quand une classe ne peut pas anticiper les classes des objets qu'elle doit créer. 
>   - Une classe veut transmettre à ses sous-classes les choix d'instanciation des objets.
>
> - **Conséquences :** 
>   \+ Permet de standardiser un modèle architectural tout en laissant à chaque application le soin de définir ses propres objets.
>   \+ Moins de couplage car l'instanciation est déléguée aux sous-classes (via l'héritage).

> **Abstract Factory** 
>
> - **But :** Fournir une interface pour la création de **familles d'objets dépendants ou associés** sans connaître les classes concrètes destinées à la création de ces objets. Fabriquer des fabriques.
>
> - **Utilisations :**
>   - Un système doit être **indépendant de la façon dont ses produits sont créés, composés et représentés**.
>   - Un système doit utiliser juste une des **familles** d'un ensemble de familles de produits.
>   - Garantir que les produits d'une famille sont utilisés ensemble.
>
> - **Conséquences :**
>   \+ Isolation des classes concrètes
>   \+ Échange facile des familles de produits
>   \+ Encouragement de la cohérence entre les produits.
>   \- Prise en compte difficile de nouvelles formes de produit.
>   \- L'instanciation des objets est déléguée à un **autre objet** (via la composition).

> **Prototype** 
>
> - **But :** Spécifier les types d'objets à créer en utilisant une **instance prototype**, puis créer de nouveaux objets en **copiant** cette instance.
>
> - **Utilisations :**
>   - Quand il faut créer un **grand nombre d'instances similaires**. 
>   - Quand la création de l'instance est **complexe et/ou consommatrice de ressources**.
>   - Quand les classes à instancier sont spécifiées au *run-time*. 
>   - Quand on veut éviter la définition d'une hiérarchie de *factories*.
>
> - **Conséquences :**
>   \+ Cache les classes de produits concrets au client.
>   \+ Simplification, optimisation de la création d'instances.
>   \+ Pas de new côté client (l'instanciation est déléguée à clone()). 

#### **Comportemental :** 

> **Observer** 
>
> - **But :** Disposer d'un **mécanisme de notification** qui fait que, quand un objet change d'état (le sujet), tous ceux qui en dépendent sont automatiquement mis à jour (les observateurs).
> - **Utilisations :**
>   - Une abstraction a **plusieurs représentations non indépendantes**. 
>   - Une modification d'un objet nécessite la **mise à jour d'autres objets**. 
>   - Un objet doit faire une notification à d'autres sans faire d'hypothèse sur la nature de ceux-ci.

> - **Conséquences :**
>   \+ Encapsule le composant principale (Subject) et les composants variable/optionnels (Observers).

>  **Chain of Responsibility** 
>
> - **But :** Éviter le couplage entre l'émetteur d'une requête et son récepteur en offrant la possibilité de traiter la requête à **plus d'un objet**. Transmettre la requête dans une chaîne jusqu'à ce qu'elle soit traitée.
>
> - **Utilisations :** 
>   - Quand **plus d'un objet peut traiter une requête** et que l'objet qui va la traiter n'est **pas connu en avance**. 
>   - Quand les requêtes suivent un modèle *«handle or forward»*.
>
> - **Conséquences :**
>   \+ Couplage réduit entre émetteur et récepteur (ils ne se connaissent pas). 
>   \+ La chaîne de traitement peut être modifiée dynamiquement.
>   \- La réception de la requête n'est pas garantie (elle peut arriver à la fin de la chaîne sans être traitée).

> **Strategy**  
>
> - **But :** Définir une **famille d'algorithmes** et les rendre **interchangeables**. Les stratégies évoluent indépendamment des clients qui les utilisent.
>
> - **Utilisations :**
>   - **Plusieurs classes ne diffèrent que par leur comportement**. 
>   - Une classe définit de **nombreux comportements dans des structures conditionnelles**. 
>   - Nécessité de disposer de **diverses variantes d'un algorithme**. 
>   - Un algorithme utilise des données que les clients n'ont pas à connaître.
>
> - **Conséquences :**
>   \+ Capturer l'abstraction en une interface pour cacher les détails d'implantation.

## Conception de l'architecture

La conception de l'architecture est le processus d'identification des **sous-systèmes** et de la **plate-forme de contrôle et de communication** entre eux. Elle représente le lien entre la spécification et la conception et est souvent réalisée en parallèle avec les activités de spécification.

Critères de choix de l'architecture : 

* **Performance :** Localiser les opérations critiques et minimiser les communications (utiliser une composition gros-grain).
* **Sécurité :** Utiliser une architecture à couches avec les entités critiques dans les couches basses.
* **Fiabilité :** Localiser les fonctionnalités critiques dans un nombre restreint de sous-systèmes.
* **Disponibilité :** Inclure des composants redondants et des mécanismes de tolérance aux fautes.
* **Maintenabilité :** Utiliser une composition fine

### Patterns Architecturaux :

Les patterns architecturaux sont un moyen de représenter, partager et réutiliser la connaissance et l'expérience. Il décrivent une bonne pratique appliquée dans différents environnements et donnent des indications/contre-indications.

1. **Model-View-Controller (MVC)**
   - **Principe :** Sépare les aspects liés à la **présentation** et à **l'interaction** (View et Controller) des **traitements de données** (Model).
   - **Composants et Interactions :**
     - **Model :** Encapsule l'état de l'application et notifie la **View** des changements d'état.
     - **View :** Rend le **Model**, demande des mises à jour du Model, et envoie les évènements utilisateur au **Controller**.
     - **Controller :** Mappe les actions utilisateur aux mises à jour du **Model** et sélectionne la **View**.
   - **Avantages :** Les données peuvent évoluer indépendamment de leur présentation; permet plusieurs présentation différentes pour les mêmes données.
   - **Inconvénients** : Ajout de code complexe même pour des données / interactions simples.
   - ![Modèle-vue-contrôleur — Wikipédia](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Mod%C3%A8le-vue-contr%C3%B4leur_%28MVC%29_-_fr.png/500px-Mod%C3%A8le-vue-contr%C3%B4leur_%28MVC%29_-_fr.png)
2. **Architecture en Couches (Layered Architecture)** 
   - **Principe** : Modélise l'interfaçage entre sous-systèmes en organisant le système en plusieurs couches, où chacune fournit différents services au niveau supérieur.
   - **Usage** : Supporte le développement incrémental ; utilisé lors de la construction de nouvelles fonctionnalités à partir de systèmes existants ou pour une sécurité multi-niveaux.
   - **Avantages** : Permet le remplacement d'un niveau si les interfaces sont respectées.
   - **Inconvénients** : La séparation n'est pas toujours naturelle ; l'accès à des niveaux inférieurs peut être nécessaire ; impact sur la performance.
   - ![img](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh_p0PIEHskLWN1gPw-XCNnXCwk6tIaqdL334gNzRlSGmg7j8IN2VPRNI_KpI3oZ2iEyKYDkicOp3s6huJac1o4dbMmpaw1a6kXoj7oAEpfaD2WxR1RvlhSsBNVxKM4YqegufH0/s1600/layered.png)
3. **Architecture Repository** 
   - **Principe** : Modélise un **dépôt de données central** partagé par plusieurs sous-systèmes.
   - **Usage** : Quand des volumes importants de données doivent être stockés pour de longues périodes, ou dans les systèmes dirigés par les données.
   - **Avantages** : Composants indépendants ; modifications répercutées sur tous les autres ; gestion de données consistente.
   - **Inconvénients** : Le repository est un point sensible ; sa distribution et la communication via lui peuvent impacter la performance.
   - ![The “Real” Repository Pattern in Android | by Denis Brandi | ProAndroidDev](https://miro.medium.com/1*xxr1Idc8UoNELOzqXcJnag.png)

4. **Architecture Client-Serveur**
   -  **Principe** : Représente un ensemble de **services distribués** sur des serveurs, appelés par plusieurs instances d'un client via un réseau.
   - **Usage** : Quand des données partagées doivent être accédées depuis plusieurs machines ou quand la charge d'un système est importante et les services doivent être dupliqués.
   - **Avantages** : Séparation et indépendance des serveurs ; les serveurs peuvent être distribués.
   - **Inconvénients** : Les serveurs sont des points sensibles ; performance dépendante du réseau.
   - ![Architecture client-serveur](https://www.geonov.fr/fig/client-server/client-server-small.png)
5. **Pipe/Filter**
   - **Principe** : Enchaînement de **transformations fonctionnelles (Filtres)** qui utilisent des entrées pour produire des sorties. Les transformations sont exécutées séquentiellement ou en parallèle, connectées par des **Tuyaux (Pipes)**.
   - **Usage** : Applications de traitement de données (par lots) en plusieurs étapes.
   - **Avantages** : Correspond à la structure de beaucoup de processus métier ; permet la réutilisation/ajout de transformations.
   - **Inconvénients** : Le format de données doit être établi entre composants ; la performance peut être impactée par le parsing et l'output.
   - ![Diagram that shows a solution implemented with monolithic modules.](https://learn.microsoft.com/en-us/azure/architecture/patterns/_images/pipes-and-filters-modules.png)