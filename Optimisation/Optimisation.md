Variable d'écart : Quantité non utilisé de la ressource
# Simplex :
## Algorithme du simplex :
1. **Transformer le PL en forme standard**
	- Ajouter des variables d'écart pour transformer les contraintes $\le$ en égalités 
	- **Contrainte $\ge$**:
		- Soustraire une variable d’excédent pour obtenir une égalité.
		- Ajouter une variable artificielle pour former la base initiale.
		- Action : Utiliser la méthode du **Big M** (pénalité M dans Z) pour éliminer la VA.
	- **Contrainte =**:
		- Ajouter uniquement une Variable artificielle pour former la base initial.
		- Action : Utiliser la méthode du **Big M** pour éliminier la VA.
2. **Choisir la variable entrante**
	- Regarder la ligne des **coûts réduits** (ligne Z pour un max)
	- Choisir la variable avec le **plus grand coefficient positif** (si Z contient -1).
		- C'est la variable qui augmente **le plus le profit** en entrant.
	- Si **aucun coefficient positif**  :  Solution optimal.
3. **Choisir la variable sortante** 
	- Prendre la colonne de la variable entrante
	- Calculer le ratio : $ratio=\frac{\text{{valeur du second membre}}}{\text{coefficient positif de la colone entrante}}$
	- On ne prends que les coefficients > 0
	- La Variable qui donne le ratio minimal → sortante
	Si aucun coefficient positif → Problème non bornée
4. **Pivot** 
	- Le pivot est l'intersection de la colonne entrante x ligne sortante
	- Diviser la ligne pivot par le pivot → pivot = 1.
	- Mettre des 0 dans la colonne du pivot
	- Pour chaque case : $\text{ancienne valeur de la case} - (\text{ancienne valeur dans la la colonne du pivot } / \text{ ancien pivot }) * (\text{ancienne valeur dans la ligne du pivot})$
5. **Recommencer**
	- Revenir a l'étape 2 
	- Tant qu'il existe des coefficient positif dans la ligne Z (car Z contient -1), on continue.
6. **Fin**
	- Quand tous les coûts réduits (ligne Z) sont $\ge$ 0.
		- La solution est optimale.
	- Les valeurs des variables basiques = solution optimale.
	- Le terme constant de la ligne objectif = valeur optimal 
## Contrainte critique : 
- Variable qui sature une contrainte
- Dans un tableau, c'est la variable d'écart = 0. Si une variable est **hors base** (pas dans la colonne de gauche) elle est automatiquement à 0. 
- **Lien Dual :** Selon le Théorème des Écarts Complémentaires, si une contrainte i est critique (si∗​=0), la variable duale associée yi∗​ peut être non nulle (yi∗​≥0).

# Algorithme du dual
## Transformer le PL du primal en PL du dual
1. Chaque contrainte = une variable du dual (elle seront $\ge$ 0 si le primal est en "$\le$")
2. Chaque variable du primal "=" une contrainte du dual "$\le$"
3. Le primal **maximise** donc le dual **minimise**.

# Déduire depuis le Dual
Si on a trouvé l'optimal (où une solution réalisable) depuis le Primal, on peut utiliser la **Règle des variables complémentaires** pour vérifier que c'est le bon optimal:
## Règle des variables complémentaires :
**Objectif :** Déduire les prix duaux et vérifier l'optimalité. 
1. On substitue la solution dans le primal pour voir les contraintes qui sont **saturées** 
2. On substitue les variables nul (du dual, donc non saturée du primal) dans le dual par 0.
3. Résoudre le système avec les valeurs obtenue (contrainte passe de $\ge$ à $=$) dans le dual.
4. Avec les valeurs obtenues : 
	- Si contradiction : ( genre 0 = 5 ) donc la solution donné n'est **pas optimale**
		Ceci ne fait pas partit du théorème.
		Trouver la vraie valeur optimale : 
		1. Identifier le goulot d'étranglement
			1. priorité : valeur la plus profitable > valeur la moins profitable
			2. Remplir au max les plus rentable (sans respecter les contraintes)
			3. Déterminer la contrainte qui bloque (goulot d'étranglement)
		2. Baisser le moins rentable
			1. On fixe les plus rentables
			2. On réduit la moins rentable jusqu'à atteindre le max de la contrainte bloquante
	- Si aucune contradiction : 
		Donc la solution est optimale.
		Les valeurs du dual ($y_1$, $y_2$ ..) veulent dire "Si j'augmente la contrainte $y_1$ de 1, cela augmente le profit total de $(\text{valeur dans l'equation du max du primal}$)€".

## Lecture du tableau du primal pour obtenir l'optimal du dual
Si je souhaite trouver la valeur optimal du dual, et que j'ai déjà fait le simplexe sur le primal, alors les valeurs optimal des variables du duals sont les valeurs opposées (négatif -> positif) des variables d'écarts dans le tableau (Ligne Z). 

## Théorème de la dualité forte
Si le primal ou le dual possède une solution optimale faisable, alors les deux en possède une, et leurs valeurs optimales sont égales. 


# Relaxation Continue :
Résoudre la relaxation Continue :
1. Calculer le ration $\frac{\text{Profit (valeur)}}{\text{Poids (contraintes)}} = \frac{Ci}{ai}$  et les classer dans l'ordre décroissant. ($\ge$)
2. Remplir un tableau des variables, en soustrayant les contraintes (dans l'ordre décroissant).

| Variable             | Reste |
| -------------------- | ----- |
| $x_1 = 1$            | 30    |
| $x_2 = 1$            | 22    |
| $x_4 = 1$            | 2     |
| $x_3 = \frac{2}{10}$ | 0     |
3. Calcule de la valeur optimal en fonction des valeurs trouvés
	On obtient d'ailleurs la borne supérieur du problème d'optimisation

Pour résoudre de manière gloutonne :
1. Ne prendre que des valeurs entière (entre 0 et 1 ici)
2. Garder le classement par ordre décroissant.
3. Prendre le maximum jusqu’à atteindre un reste à 0.
   On obtient d'ailleurs la borne inférieur du problème d'optimisation.

Dans le cas "Montrer que x1 peut être fixé à 1 ..".
1. Partir de l'absurde : "Si x1 = 0, alors, a l'optimum, on a :"
		"bla bla bla < a la borne inférieur / inférieur a l'optimum calculé précédement."

# Big M
1. Standardisation : 
	1. Si $\le$ : ajouter Variable d'écart (normal)
	2. SI $\ge$ : Ajouter variable d'excédent et Variable artificiel
	3. Si $=$ : Ajouter juste Variable artificiel.
2.  Pénalisation :
	-  Ajouter un terme $M$ de Pénalité .
	- Si Maximisation : Soustraire M (M très couteux) $Max Z'=Z−M\sum{ai}​$
	- Si Minimisation : Ajouter M (M trés élevé) : $Min Z'=Z+M\sum{ai}​$
3. Préparation du tableau :
	- Substituer $a_i$ dans la ligne Z' pour éliminer M des variables de bases.
4. Appliquer le simplexe classique.
5. Si, à l'optimum, une variable artificielle ai​ est dans la base avec une valeur ai​>0, alors le problème **n'a pas de solution réalisable**.

 # Définir Intervale à partir du simplexe.
 ## 2. Définir l'Intervalle de Variation des Coefficients de l'Objectif (Post-Optimalité)

Cette analyse s'appelle l'**Analyse de Sensibilité** ou **Post-Optimalité**. Elle vise à déterminer dans quel intervalle de valeurs un coefficient de la fonction objectif (cj​) peut varier sans que la base optimale change.

Nous considérons deux cas, selon que le coefficient de la fonction objectif est celui d'une **variable de base** (xB​) ou d'une **variable hors base** (xH​).

### A. Intervalle de Variation pour un Coefficient de Variable Hors Base (cj​)

Si la variable xj​ est **hors base** (xj​=0) dans la solution optimale, nous nous concentrons sur son **coût réduit** dans la ligne Z du tableau optimal.

**La Règle :** La base optimale reste inchangée tant que le **coût réduit** de la variable hors base xj​ reste non positif (pour une maximisation).

Le coût réduit de xj​ est donné par :

(cj​)=cj​−Zj​

où cj​ est le coefficient original dans l'objectif, et Zj​ est le coût des ressources utilisées (calculé par la sommation des coûts réduits des variables de base multipliés par les coefficients de xj​).

1. **Identifier l'intervalle :** On exprime le coût réduit en fonction de cj​ :
    
    cj​=cj​−Zj​≤0
    
    ⟹cj​≤Zj​
    
2. **Calculer Zj​ :** On utilise la formule Zj​=∑i∈Base​cBi​​⋅aij​, où cBi​​ sont les coefficients de l'objectif pour les variables de base, et aij​ sont les coefficients de la colonne xj​.
    
3. **Déduire l'intervalle :**
    
    Intervalle : −∞<cj​≤Zj​
    

- **Interprétation :** Si cj​ augmente et dépasse Zj​, le coût réduit devient positif, xj​ devient la nouvelle variable entrante, et la base change.
    

### B. Intervalle de Variation pour un Coefficient de Variable de Base (cB​)

Si la variable xk​ est **dans la base** (xk​>0), une modification de son coefficient (ck​) affecte le coût réduit **de toutes les variables hors base**.

1. **Identifier les coûts réduits sensibles :** Pour chaque variable hors base xj​, nous vérifions si son coût réduit (cj​) devient positif (pour une maximisation).
    
2. **Déterminer la variation de ck​ :** La variation est souvent notée Δck​ ou ck′​. La nouvelle valeur du coût réduit de xj​ sera :
    
    cj′​=cj​−i∈Base∑​(cBi​​+Δck​)⋅aij​
    
3. **Résoudre les inégalités :** Pour chaque variable hors base xj​, on impose la condition d'optimalité :
    
    cj′​≤0
    
    Ceci génère un ensemble d'inégalités en fonction de Δck​ (ou ck′​).
    
4. **Déterminer l'intervalle :** L'intervalle de variation acceptable pour Δck​ est l'intersection de toutes les inégalités.
    
    Intervalle=$$[max(\text{bornes inférieures}),min(\text{bornes supérieures})]$$
    

- **Interprétation :** La base est conservée tant que ck​ reste dans cet intervalle. Si ck​ sort de l'intervalle, un nouveau pivot sera nécessaire.