# Simplex :
## Algorithme du simplex :
1. **Choisir la variable entrante**
	- Regarder la ligne des **coûts réduits** (ligne $z_j - c_{j}$ pour un max)
	- Choisir la variable avec le **coût réduit le plus négatif**.
		- C'est la variable qui augmente **le plus le profit** en entrant.
	- Si **aucun coût réduit** < 0 :  Solution optimal.
2. **Choisir la variable sortante** 
	- Prendre la colonne de la variable entrente
	- Calculer le ratio : $ratio=\frac{\text{{valeur du second membre}}}{\text{coefficient positif de la colone}}$
	- On ne prends que les coefficients > 0
	- La Variable qui donne le ratio minimal → sortante
	Si aucun coefficient positif → Problème non bornée
3. **Pivot** 
	- Le pivot est l'intersection de la colonne entrante x ligne sortante
	- Diviser la ligne pivot par le pivot → pivot = 1.
	- Transformer toutes les autres lignes pour mettre des 0 dans la colonne entrante.
4. **Recommencer**
	- Revenir a l'étape 1 
	- Tant que des coûts réduits sont négatifs, on continue.
5. **Fin**
	- Quand tous les coûts réduits sont > 0.
		- La solution est optimale.
	- Les valeurs des variables basiques = solution optimale.
	- Le terme constant de la ligne objectif = valeur optimal 

# Algorithme du dual
## Transformer le PL du primal en PL du dual
1. Chaque contrainte = une variable du dual (elle seront $\ge$ 0 si le primal est en "$\le$")
2. Chaque variable du primal = une contrainte du dual "$\le$"
3. Le primal **maximise** donc le dual **minimise**.

# Déduire depuis le Dual
Si on a trouvé l'optimal (où une solution réalisable) depuis le Primal, on peut utiliser la **Règle des variables complémentaires**:
## Règle des variables complémentaires :
1. On substitue la solution dans le primal pour voir les contraintes qui sont **saturées** 
2. On substitue les variables nul (du dual, donc non saturée du primal) dans le dual par 0.
3. Résoudre le système avec les valeurs obtenue (contrainte passe de $\ge$ à $=$) dans le dual.
4. Avec les valeurs obtenues : 
	- Si contradiction : ( genre 0 = 5 ) donc la solution donné n'est **pas optimale**
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