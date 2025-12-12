# Sommaire




# TCP
## Gestion du flux :
1. **Tampons (Buffers)**
	- Tampon d'envoie : un `send` d'application ne correspond pas nécessairement à un seul paquet TCP ($1\ send  \ne 1\ paquet$). Le noyau accumule les données dans un tampon pour former des paquets plus gros.
	- Tampon d'arrivé : Nécessaire pour remettre les octets dans l'ordre (il peuvent arrivé dans le désordre). Si le tampon est surchargé, les nouveaux paquets sont jetés. 
	
2. **Fenêtre destinataire (Flow Control)**
	- Le récepteur indique à l'émetteur la taille de son tampon disponible via le champ **`Win.` (Window)** du segment TCP.
	- Ceci permet de réguler le flux pour **éviter de surcharger le destinataire** (contrôle de flux).
	- La **fenêtre d'envoi** détermine la quantité de données _envoyables_ (non-acquittées) : de l'octet ACK+1 à l'octet ACK+WIN.

3. **Algorithme de Nagle**
	- Cet algorithme gère l'envoi de données accumulées dans le tampon d'envoi pour éviter d'envoyer trop de petits paquets (faible latence vs. meilleur débit).
	- Il vise à envoyer un paquet entier (taille maximale de segment, **MSS**) dès que possible, ou d'attendre l'acquittement des données déjà envoyées pour envoyer les données mises en tampon.

## Séquencement et Acquittement (Fiabilité)
TCP assure l'ordre et la fiabilité via des numéros d'octets.
* **Numéro de Séquence (`No séquence`)** : Le numéro du **premier octet** contenu dans le paquet actuel.
* **Numéro d'Acquittement (`No acq.`)** : Le numéro du **prochain octet attendu** par le récepteur. Il confirme que tous les octets _jusqu'à_ **ACK-1** ont été reçus et mis dans l'ordre.
* **Comptage** : Les séquences sont comptées en **octets**.
* **Acquittement Indépendant** : Les numéros de séquence de A vers B et de B vers A sont **indépendants**.

## Flags TCP
* **SYN** (SYNchronisation) : Utilisé pour l'établissement de la connexion, indique le numéro de séquence initial (qui est aléatoire).
* **ACK** : Indique que le champ d'acquittement (`No acq.`) est valide (défini). Tous les paquets ont le flag ACK sauf le premier.
* **FIN** (FINie) : Indique qu'une partie n'a plus rien à envoyer (fermeture de connexion).
* **RST** : Ferme la connexion immédiatement.