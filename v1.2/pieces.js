// Récupération des pièces depuis le fichier JSON
const pieces = await fetch("pieces-autos.json").then(pieces => pieces.json());

// Fonction qui génère toute la page
function genererPieces(pieces){
   for(let i = 0;i < pieces.length;i++){
      const sectionFiches = document.querySelector(".fiches");
      const pieceElement = document.createElement("article");
      const imageElement = document.createElement("img");
      imageElement.src = pieces[i].image;
      const nomElement = document.createElement("h2");
      nomElement.innerText = pieces[i].nom;
      const prixElement = document.createElement("p");
      prixElement.innerText = `Prix: ${pieces[i].prix} € (${pieces[i].prix < 35 ? "€" : "€€€"})`;
      const categorieElement = document.createElement("p");
      categorieElement.innerText = pieces[i].categorie ?? "(aucune catégorie)";
      const descriptionElement = document.createElement("p");
      descriptionElement.innerText = pieces[i].description ?? "Pas de description pour le moment.";
      const disponibiliteElement = document.createElement("p");
      disponibiliteElement.innerText = pieces[i].disponibilite ? "En stock" : "Rupture de stock";

      sectionFiches.appendChild(pieceElement      );
      pieceElement.appendChild( nomElement        );
      pieceElement.appendChild( imageElement      );
      pieceElement.appendChild( prixElement       );
      pieceElement.appendChild( categorieElement  );
      pieceElement.appendChild( descriptionElement);
   }
}

// Premier affichage de la page
genererPieces(pieces);


// Par ordre croissant
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
   const piecesOrdonnees = Array.from(pieces);
   piecesOrdonnees.sort(function (a, b) {
       return a.prix - b.prix;
    });
   // Effacement de l'écran et regénération de la page
   document.querySelector(".fiches").innerHTML = "";
   genererPieces(piecesOrdonnees);
});
// Filtrer les pièces non abordables
const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function () {
   const piecesFiltrees = pieces.filter(function (piece) {
       return piece.prix <= 35;
   });
   // Effacement de l'écran et regénération de la page avec les pièces filtrées uniquement
   document.querySelector(".fiches").innerHTML = "";
   genererPieces(piecesFiltrees);
});
// Trier par prix décroissant
const boutonDescroissant = document.querySelector(".btn-decroissant");
boutonDescroissant.addEventListener("click", function () {
   const piecesOrdonnees = Array.from(pieces);
   piecesOrdonnees.sort(function (a, b) {
       return b.prix - a.prix;
    });
   // Effacement de l'écran et regénération de la page
   document.querySelector(".fiches").innerHTML = "";
   genererPieces(piecesOrdonnees);
});
// Filtrer les pièces sans description
const boutonNoDescription = document.querySelector(".btn-nodesc");
boutonNoDescription.addEventListener("click", function () {
   const piecesFiltrees = pieces.filter(function (piece) {
       return piece.description;
   });
   // Effacement de l'écran et regénération de la page avec les pièces filtrées uniquement
   document.querySelector(".fiches").innerHTML = "";
   genererPieces(piecesFiltrees);
});

// On supprime de la liste les pièces avec un prix supérieur à 35
let noms = pieces.map(piece => piece.nom);
for(let i = pieces.length -1 ; i >= 0; i--){
   if(pieces[i].prix > 35){
       noms.splice(i,1);
   }
}
//Création de la liste
const abordablesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for(let i=0; i < noms.length ; i++){
   const nomElement = document.createElement('li');
   nomElement.innerText = noms[i];
   abordablesElements.appendChild(nomElement)
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.abordables')
   .appendChild(abordablesElements)
   
   
// On supprime de la liste les pièces non disponible
const nomsDisponibles = pieces.map(piece => piece.nom);
const prixDisponibles = pieces.map(piece => piece.prix);
for(let i = pieces.length -1 ; i >= 0; i--){
   if(!pieces[i].disponibilite){
       nomsDisponibles.splice(i,1);
	   prixDisponibles.splice(i,1);
   }
}
//Création de la liste
const disponibleElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for(let i=0; i < nomsDisponibles.length ; i++){
   const nomElement = document.createElement('li');
   nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €.`;
   disponibleElements.appendChild(nomElement);
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.disponibles')
   .appendChild(disponibleElements);


// `Prix: ${pieces[i].prix} € (${pieces[i].prix < 35 ? "€" : "€€€"})`
/*
map(function (piece){
	return piece.nom;
}
On peut l'écrire sous la forme plus simplifier (fct lambda):
(piece) => piece.nom;
*/