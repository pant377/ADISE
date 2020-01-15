# Demo Page
Δεν καταφέραμε να ανεβάσουμε το project στον server δυστυχως



# Εγκατάσταση

## Απαιτήσεις

* Apache2
* Mysql Server
* php

## Οδηγίες Εγκατάστασης

 * Κάντε clone το project σε κάποιον φάκελο <br/>
  `$ git clone https://github.com/iee-ihu-gr-course1941/ADISE19_GSPP.git`

 * Βεβαιωθείτε ότι ο φάκελος είναι προσβάσιμος από τον Apache Server. πιθανόν να χρειαστεί να καθορίσετε τις παρακάτω ρυθμίσεις.

 * Θα πρέπει να δημιουργήσετε στην Mysql την βάση με όνομα 'adise19_chess5' και να φορτώσετε σε αυτήν την βάση τα δεδομένα από το αρχείο DB/schema5.sql

 * Θα πρέπει να φτιάξετε το αρχείο lib/config_local.php το οποίο να περιέχει:
```
    <?php
	$DB_PASS = 'κωδικός';
	$DB_USER = 'όνομα χρήστη';
    ?>
```

# Περιγραφή Παιχνιδιού

## Το UNO παίζεται ως εξής: 

   * Η τράπουλα ανακατεύεται και σε κάθε παίχτη μοιράζονται 7 κάρτες. Πρώτος παίζει αυτός που κάθεται αριστερά αυτού που μοίρασε και η σειρά με την οποία παίζουν οι παίχτες είναι η φορά των δεικτών του ρολογιού.

   * Η επάνω κάρτα της στοίβας των καρτών που δεν μοιράστηκαν στους παίχτες, τοποθετείται ανοιχτή στο κέντρο του τραπεζιού μπροστά σε όλους τους παίχτες και είναι η πρώτη του σωρού των χρησιμοποιημένων καρτών.

   * Ο πρώτος στη σειρά παίχτης πρέπει να ρίξει μια κάρτα ίδιου αριθμού ή χρώματος με την κάρτα αυτή ή να πετάξει μια ειδική κάρτα. Σε περίπτωση που  δεν έχει καμία κάρτα να ταιριάξει με την πάνω κάρτα του σωρού, πρέπει να τραβήξει μια κάρτα από τη στοίβα και αν ούτε τότε δεν έχει να παίξει, πηγαίνει πάσο και έρχεται η σειρά του επόμενου παίχτη να παίξει, ακολουθώντας πάντα το ίδιο μοτίβο επιτρεπτών επιλογών [χρώμα ή αριθμός – ειδική κάρτα – κάρτα από τη στοίβα – πάσο]

   * Σκοπός του παιχνιδιού για κάθε παίχτη είναι να ξεφορτωθεί όλες τις κάρτες που έχει στα χέρια του. Ο πρώτος που θα τα καταφέρει ανακηρύσσεται νικητής για το γύρο αυτό.

## Οι κανόνες είναι οι ....

   1) όταν κάποιος παίχτης μείνει με μία κάρτα πρέπει να πει ‘Uno’ προτού ο επόμενος προλάβει να παίξει….αν δεν το κάνει, τιμωρείται παίρνοντας δύο κάρτες από τη στοίβα αχρησιμοποίητων καρτών

   2) η τελευταία κάρτα που θα πετάξει κάποιος παίχτης μπορεί να είναι οποιαδήποτε. Αν χρειαστεί ο επόμενος παίχτης να πάρει στα χέρια του κάρτες, τις παίρνει και προσμετρώνται στους βαθμούς ποινής του

   3) απαγορεύεται σε οποιονδήποτε παίχτη να υπαγορεύει στρατηγικές σε άλλον παίχτη … αν το κάνει, τιμωρείται με δύο επιπλέον κάρτες

   4) αν κάποιος πετάξει λάθος κάρτα, τιμωρείται με τέσσερις κάρτες και χάνει τη σειρά του

   5) αν κάποιος παίχτης έχει κάποια κάρτα να παίξει αλλά παρ’ ολ’ αυτά επιλέξει να τραβήξει κάρτα, τότε πρέπει να παίξει την κάρτα που τράβηξε. Αν γίνει αντιληπτός, οφείλει να πάρει δύο κάρτες

   6) αν η στοίβα αχρησιμοποίητων καρτών εξαντληθεί, η πάνω κάρτα του σωρού γίνεται η τελευταία του νέου σωρού και όλες οι υπόλοιπες κάρτες του σωρού ανακατεύονται καλά και γίνονται η νέα στοίβα αχρησιμοποίητων καρτών

   7) αν κάποιος παίχτης έπαιξε ‘μπαλαντέρ πάρε τέσσερα’ ενώ είχε να παίξει κάτι άλλο, τότε ο επόμενος παίχτης μπορεί να τον προκαλέσει να του δείξει τα χαρτιά του…. αν αποδειχθεί ότι δικαίως τον προκάλεσε τότε τον αναγκάζει να πάρει αυτός τέσσερις κάρτες και να χάσει τη σειρά του, αν όμως έκανε λάθος τότε θα πάρει συνολικά έξι κάρτες και θα χάσει εκείνος τη σειρά του

## Συντελεστές
Σακελλαρίου Γεώργιος: Javascript, PHP, HTML
Παντελής Παπαδόπουλος: Javascript, SQL, HTML

# Περιγραφή API

## Methods


## Board
### Ανάγνωση Board

##### Επιστρέφει το hand των παιχτών.
```
POST uno.php/game
```
#### Αρχικοποίηση του παιχνιδιού
```
POST uno.php/game
```
#### Αναγνώρηση χαρτιού που βρίσκεται στο table
```
POST uno.php/game
```
#### Reset του Board
```
GET uno.php/game
```
#### Return των παιχτών
```
POST uno.php/game/player/all
```
#### Return του παίχτη ανάλογα με το id
```
POST uno.php/game/player/1, 2
```
#### Επιλογή νέας κάρτας για τον παίχτη
```
GET uno.php/game/draw
```
#### Επιλογή 2 νέων καρτών για τον αντίπαλο
```
POST uno.php/game/draw/enemy
```
#### Πάσο
```
POST uno.php/game/pass
```
#### Παίξιμο κάρτας
```
PUT uno.php/game/play
```
#### Παίξιμο ειδικών καρτών
```
PUT uno.php/game/play/ch_col
PUT uno.php/game/play/add_ch_col
PUT uno.php/game/play/skip
```
## Μεταβλητές
### Players
| Attribute                | Description                                   | Values                              |
| ------------------------ | --------------------------------------------  | ----------------------------------- |
| `playerId`               | Το id του παίχτη που συδέεται στην βάση       | 1, 2                                |
| `username`               | Το username του παίχτη που συνδέεται στην βάση| varchar(30)                                |
| `turn`                   |  Η σειρά του κάθε παίχτη                      | 0, 1   
Ο κάθε παίχτης όταν συνδέεται στην βάση δίνει ένα όνομα, και το turn και playerId, μπαίνουν
αυτόματα.

### Players
| Attribute                | Description                                   | Values                              |
| ------------------------ | --------------------------------------------  | ----------------------------------- |
| `playerId`               | Το id του παίχτη που συδέεται στην βάση       | 1, 2                                |
| `username`               | Το username του παίχτη που συνδέεται στην βάση| varchar(30)                                |
| `turn`                   |  Η σειρά του κάθε παίχτη                      | 0, 1   
|
Ο κάθε παίχτης όταν συνδέεται στην βάση δίνει ένα όνομα, και το turn και playerId, μπαίνουν αυτόματα.

### Hand
| Attribute                | Description                                   | Values                              |
| ------------------------ | --------------------------------------------  | ----------------------------------- |
| `playerId`               | Το id του παίχτη που συδέεται στην βάση       | 1, 2                               |
| `cardId`                 | Το μοναδικό id της κάρτας που έχει ο παίχτης| 1...108

### carddeck
| Attribute                | Description                                   | Values                              |
| ------------------------ | --------------------------------------------  | ----------------------------------- |
| `cardId`               | Το μοναδικό id της κάρτας       | 1...108                               |
| `cardCode`             | Το value της κάρτας           | varchar(6)                                          |   
Τα 108 διαφορετικά χαρτιά που υπάρχουν στο deck του Uno
Tο value της κάρτας είναι ουσιαστικά η ιδιότητα της κάρτας, πχ το g2 = πράσινο 2

### cardTable
| Attribute                | Description                                   | Values                              |
| ------------------------ | --------------------------------------------  | ----------------------------------- |
| `cardTable`               | Το id του παίχτη που συδέεται στην βάση       | 1, 2                                |
| `cardCode`               | Το value της κάρτας                        | varchar(6)  

Τα χαρτιά που παίζονται στο παιχνίδι από τους παίχτες, πηγαίνουν αυτόματα στο cardTable

### cloneDeck
Ένα αντίγραφο του carddeck έτσι ώστε να μην χαθούν τα δεδομένα όταν γίνεται κάποιο Delete