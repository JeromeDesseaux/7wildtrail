<template>
  <v-layout column justify-center align-center>
    <v-snackbar v-model="snackbar" :timeout="3000" top right color="error">
      Aucun produit correspondant dans le panier.
    </v-snackbar>
    <v-flex xs12 sm8 md6 class="text-center">
      <h1 class="my-10">7 Wild Trail</h1>
      <v-card class="mt-10">
        <v-card-text>
          <p>
            Vous trouverez ci-dessous les produits dérivés de mon défi 7 Wild
            Trail.
          </p>
          <p>
            Ce défi consistait à boucler 7 parcours à travers le monde, dont le
            dernier autour du Mont Blanc accompagné par les associations de
            joëlette (Everest en Sable et Equipe Défi joëlette). Je souhaite
            poursuivre le soutien à ces deux associations qui me tiennent
            particulièrement à coeur.
          </p>
          <p>
            En achetant un ou plusieurs de ces produits, vous contribuerez au
            soutien de ces associations. Une partie des bénéfices leur sera
            rétribuée à l’issue de la vente.
          </p>
          <p>Merci de votre participation et à très vite sur les sentiers :)</p>
          <p><b>Christophe Le Saux</b></p>
        </v-card-text>
      </v-card>

      <div class="my-10">
        <h2>Les articles :</h2>

        <div class="d-flex flex-row justify-center align-center flex-wrap">
          <v-card
            v-for="product in products"
            :key="product.id"
            style="max-width:400px;max-height:400px;"
            class="mx-5 my-5"
            hover
          >
            <v-card-title class="d-flex flex-column">
              {{ product.nom }}
              <span>{{ product.prix }}€</span>
            </v-card-title>
            <v-card-text>
              <v-img
                alt="product image"
                :src="'/' + product.img"
                contain
                max-height="180"
              ></v-img>
            </v-card-text>
            <v-card-actions
              class="justify-center align-center d-flex flex-column"
            >
              <p>Quantité : {{ getQuantityInCard(product) }}</p>
              <div>
                <v-btn color="primary" @click="addProductToCard(product)">
                  +
                </v-btn>
                <v-btn
                  color="error"
                  v-on:click="removeProductFromCard(product)"
                  :disabled="getQuantityInCard(product) === 0"
                >
                  -
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </div>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn
              block
              color="primary"
              class="mt-5"
              v-on="on"
              :disabled="selected.length == 0"
              >{{ getButtonText() }}</v-btn
            >
            <!-- <v-btn color="primary" dark v-on="on">Open Dialog</v-btn> -->
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Formulaire de commande</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-form v-model="isValid">
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        label="Prénom*"
                        required
                        :rules="[v => !!v || 'Champs requis']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        label="Nom*"
                        required
                        :rules="[v => !!v || 'Champs requis']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Email*"
                        required
                        :rules="[v => !!v || 'Champs requis']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Téléphone*"
                        required
                        :rules="[v => !!v || 'Champs requis']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Addresse*"
                        required
                        :rules="[v => !!v || 'Champs requis']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="Complément d'adresse"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        label="Code postal*"
                        required
                        :rules="[v => !!v || 'Champs requis']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        label="Ville*"
                        required
                        :rules="[v => !!v || 'Champs requis']"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
              <small>*Champs obligatoires.</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false"
                >Fermer</v-btn
              >
              <v-btn
                color="blue darken-1"
                text
                type="submit"
                :disabled="!isValid"
                @click="submit()"
                >Payer</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  components: {},
  methods: {
    submit: function() {
      console.log("submitted");
    },
    addProductToCard: function(product) {
      this.selected.push(product);
    },
    removeProductFromCard: function(product) {
      var index = this.selected.findIndex(x => x.id == product.id);
      index === -1 ? (this.snackbar = true) : this.selected.splice(index, 1);
    },
    getQuantityInCard: function(product) {
      return this.selected.filter(p => p.id === product.id).length;
    },
    getButtonText: function() {
      let hasProducts = this.selected.length > 0;
      let sum = this.selected.reduce((a, { prix }) => a + prix, 0);
      return hasProducts
        ? `Payer ${sum}€`
        : `Sélectionnez un ou plusieurs produits`;
    }
  },
  data: function() {
    return {
      dialog: false,
      snackbar: false,
      isValid: false,
      selected: [],
      products: [
        {
          id: 1,
          nom: "Les 7 familles du trail - Lot de 1 JEU",
          description:
            "Jeu des 7 familles du Trail créé par l’illustrateur Redge et personnalisé au couleur du Team Globetrailer.",
          prix: 8,
          img: "jeu.jpg"
        },
        {
          id: 2,
          nom: "Les 7 familles du trail - Lot de 4 JEUX",
          description:
            "Jeu des 7 familles du Trail créé par l’illustrateur Redge et personnalisé au couleur du Team Globetrailer.",
          prix: 25,
          img: "jeu.jpg"
        },
        {
          id: 3,
          nom: "Trucker 7 Wild Trail",
          description: "Casquette Trucker 7 Wild Trail.",
          prix: 25,
          img: "casquette.jpg"
        },
        {
          id: 4,
          nom: "Ceinture Trail",
          description: "Ceinture Trail Raidlight.",
          prix: 25,
          img: "ceinture.jpg"
        }
      ]
    };
  }
};
</script>
