# II. Résolution Graphique
1. Tracer le domaine de faisabilité :
	- Tracer chaque contrainte comme une droite dans le plan ($x_1$, $x_2$) (en replaçant le $\le$, $\ge$ ou = par un =).
	- Déterminer la région du plan qui satisfait toutes les contraintes (y compris $x_1 \ge 0, x_2 \ge 0$)
2. Identifier les Points Extrêmes (Sommets) : Le domaine de faisabilité est un Polyèdre.
3. Tracer la Fonction Objectif : Représenter la fonction objectif Z par une famille de droites (lignes de niveau ) $Z = c_1 x_1 + c_2 x_2$
4. Optimiser :
	- Pour une **maximisation**, déplacez la ligne de niveau dans la direction d’augmentation de Z jusqu’au dernier point touché dans le domaine réalisable.
	- Pour une **minimisation**, déplacez-la dans la direction de diminution de Z jusqu’au dernier point touché.
	- La solution optimale est atteinte à un **point extrême** (sommet) du domaine de faisabilité.

# III. Simplexe (Primal)
1. **Forme Standard (Canonique)**
	- Le PL doit être sous la forme : **Max** $Z = c^T x$.
	- **Transformation :**
		- Contraintes $\le$ : Ajouter une variable d’écart $e_i \ge 0$ (ou $x_{n+i} \ge 0$) pour les transformer en égalités.
		- Contraintes $\ge$ : Soustraire une variable d’écart, puis utiliser la méthode des variables artificielles (pour trouver une première solution de base réalisable).
		- Variable non contrainte en signe ($x_j \in R$ ) : Remplacer par $x_j = x’_j - x’’_j$
		- Minimiser Z : Équivalent à maximiser -Z.
2. **Déroulement de l’algorithme**
	- **Initialisation :** Partir d’une solution de base réalisable (souvent l’origine si c’est possible, en utilisant les variables d’écart comme base initiale).
	- **Critère d’Optimalité :** Pour la maximisation, la solution est optimale lorsque tous les **coûts réduits** (coefficients de la fonction objectif dans le tableau) des variables hors bases sont $\le$ 0.
	- **Choix de la variable Entrante :** Choisir la variable hors base avec le coût réduit **le plus positif** (pour une maximisation).
	- **Choix de la variable Sortante :** Utiliser la **règle du ration minimum** (ratio positif de la colonne de la variable entrante avec la colonne des seconds membres).
	- **Picotage :** Effectuer les opérations de ligne pour transformer le tableau, faisant entrer la variable choisie dans la base. Répéter jusqu’à l’optimalité.
3. **Forme non standard (BIG M)** :
	Forme Standard = toutes les contraintes sont de type « $\le$ » avec des seconds membres positifs.
	Donc pour le reste on utilise des Variables Artificielles.
		1. **Transformation :**
			- pour $a_i x \ge b_i : a_i x - s_i + A_i = b_i$
			- Pour $a_i x = b_i : a_i x +A_i = b_i$
		2. **Base Initiale :** la amiable artificielle $A_i$ devient la variable de base pour cette contrainte (avec $A_i = b_i \ge 0$), garantissant une SBR initiale formellement réalisable.
	**Attention : Assurer que $A_i$ sorte de la base**
		A la fin du simplexe, $A_i = 0$. 
		Pour ceci on force le Simplexe à l’éliminer de la base : 
		- **Maximisation :** On donne à $A_i$ un coût très désavantageux dans la fonction objectif Z : $-MA_i$ où $M$ est un nombre très grand (Big M).
			$max Z = c_1 x_1 + c_2 x_2 … -MA_1 - MA_2 …$
		-**Minimisation :** On donne à $A_i$ un coût très élevé : $+MA_i$
			$min\ Z = c_1 x_1 + c_2 x_2 … + MA_1 + MA_2 …$ 
		
# IV. Dualité en Programmation Linéaire
Tour problème linéaire (appelé Primal (P)) a un problème linéaire associé appelé **Dual** (D)
1. Construction du Dual (P <-> D)
	Règles :

| **Primal**                   | **Dual**                    |
| ---------------------------- | --------------------------- |
| max                          | min                         |
| Contraintes (lignes)         | Variables de Dual ($y_i$)   |
| Variables ($x_j$)            | Contraintes                 |
| Second membre b              | Coefficients Objectif       |
| Coefficients Objectif c      | Second membre b             |
| Contraintes $\le$ (dans max) | Variable $y_i \ge 0$        |
| Contraintes $\ge$ (dans max) | Variable $y_i \le 0$        |
| Contrainte = (dans max)      | Vairable $y_i \in R$        |
| Variable $x_i \ge 0$         | Contrainte $\ge$ (dans min) |
| Variable $x_j \le 0$         | Contrainte $\le$ (dans min) |
| Variable $x_j \in R$         | Contrainte = (dans min)     |
- Exemple (P) : $max\ x_1 + 2x_2 ; x_1 + x_2 \le 4 ; 2x_1 +3_x2 \le 9; x_1,x_2 \ge 0$
- Dual (D) : $min\ 4y_1 + 9y_2; y_1 + 2y_2 \ge 1; y_1 + 3y_2 \ge 2; y_1,y_2 \ge 0$
2. **Théorème de Dualité et Comparaison**
- **Théorème de la Dualité Forte** : Si le Primal (P) a une solution optimale finie v(P), alors le Dual (D) a également une solution optimale finie v(D), et v(P) = v(D).
- **Déduction de la solution optimale du Dual** : La solution optimale du Dual (y*) peut être directement déduite de là solution optimale du Primal.
	- Elle est donnée par les **coûts réduits** des variables d’écart du Primal dans le tableau final optimal.
	- Elle est aussi liée aux relations d’écarts complémentaires (ou relations d’exclusions).
# V. Post-Optimalité et Sensibilité
Étudier comment la solution optimale change lorsque les paramètres du problèmes (second membre b ou coefficients de coût c) varient.
1. **Variation des Seconds Membre (b)**
	- Déterminer l’intervalle dans lequel un second membre $b_i$ peut varier **sans que la base optimale change.**
	- La valeur Optimale Z* évolue linéairement avec $b_i$ dans cet intervalle, le **prix dual** (ou coût réduit de la variable d’écart associée) donnant le taux de variation de Z* par rapport à $b_i$ (valeur marginale d’une ressource).
2. **Variation des Coefficients de Coût (c)**
	- Déterminer l’intervalle dans lequel un coefficient de coût $c_j$ peut varier **sans que la base optimale change.**
	- Cela est lié au maintien de la non-positivité des coûts réduits pour les variables hors base.
# VI. Programme Linéaire en Nombres Entiers (PLNE)
Pour les problèmes où les variables de décision doivent prendre des valeurs entières (discrètes) ou binaires (0 ou 1).

1. **Méthode par Relaxation et Glouton**
- **Relaxation Continue ($\overline{K}$)** : Résoudre le problème en ignorant les contraintes d’entier (traitement comme un PL classique). La valeur optimale v($\overline{K}$) donne un **majorant** $v(K) \le v(\overline{K})$ pour un problème de maximisation.
- **Algorithme Glouton :** Trouver rapidement une solution réalisable en entiers. La valeur v(Glouton) donne un **minorant** $v(K) \ge v(Glouton)$
2. **Techniques de Simplification (Fixation de Variables)**
	Utiliser l’encadrement ($v \le v(K) \le \overline{v}$) et des arguments logiques/mathématiques pour fixer certaines variable à 0 ou 1, simplifiant ainsi le problème (ex: si une variable ne peut pas être dans une solution optimale de valeur supérieure à v). 

3. **Méthode de Séparation et Évaluation (Branch and Bound)**
	Méthode pour résoudre le PLNE en explorant l’espace des solutions de manière arborescente.
		Concrètement : Si la solution relaxée est $x_1 = 3.7$, on crée deux sous-probèmes : un avec $x_1 \le 3$ et un autre avec $x_1 \ge 4$. On explore cet arbre jusqu’à trouver la meilleure solution entière. 
		
