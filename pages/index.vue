<template>
  <v-layout column justify-center align-center>
    <v-snackbar v-model="snackbar" :timeout="3000" top right color="error">
      Aucun produit correspondant dans le panier.
    </v-snackbar>
    <v-flex xs12 sm8 md6 class="text-center">
      <v-img
                alt="product image"
                src='/logo.jpeg'
                contain
                max-height="180"
              ></v-img>
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
          <p>
            Frais de port compris pour la France métropolitaine.
            Pour un envoi à l'étranger, merci de nous contacter avant votre commande à <a href="mailto:7wildtrail@gmail.com">7wildtrail@gmail.com</a>
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
                        v-model="first_name"
                        required
                        :rules="[v => !!v || 'Champs requis']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        label="Nom*"
                        v-model="last_name"
                        required
                        :rules="[v => !!v || 'Champs requis']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Email*"
                        v-model="emailForm.from_email"
                        required
                        :rules="[v => !!v || 'Champs requis']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Téléphone*"
                        v-model="emailForm.from_phone"
                        required
                        :rules="[v => !!v || 'Champs requis']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Addresse*"
                        v-model="emailForm.from_address"
                        required
                        :rules="[v => !!v || 'Champs requis']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="Complément d'adresse" v-model="emailForm.from_address2"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        label="Code postal*"
                        v-model="emailForm.from_zipcode"
                        required
                        :rules="[v => !!v || 'Champs requis']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        label="Ville*"
                        v-model="emailForm.from_city"
                        required
                        :rules="[v => !!v || 'Champs requis']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <!-- <stripe-elements
                        ref="elementsRef"
                        :pk="publishableKey"
                        :amount="getSum()*100"
                        locale="fr"
                        @token="tokenCreated"
                        @loading="loading = $event"
                      >
                      </stripe-elements> -->
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
              <stripe-checkout
                ref="checkoutRef"
                :pk="publishableKey"
                :items="items"
                :customerEmail="emailForm.from_email"
                :successUrl="successUrl"
                :cancelUrl="cancelUrl"
              >
              <template slot="checkout-button">
                <!-- <button @click="checkout">Shutup and take my money!</button> -->
                <v-btn
                  color="blue darken-1"
                  text
                  type="submit"
                  :disabled="!isValid"
                  @click="submit()"
                  >Payer</v-btn
                >
              </template>
              </stripe-checkout>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { StripeElements, StripeCheckout } from './vue-stripe.js';
import axios from "axios";
import emailjs from 'emailjs-com';
var service_id = "default_service";
var template_id = "template_ay9aVQN9";
var user_id = process.env.MAILJET_ID;
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default {
  components: {
    StripeElements, StripeCheckout
  },
  methods: {
    submit: function() {
      this.sendEmail();
      this.$refs.checkoutRef.redirectToCheckout();
      // this.$refs.elementsRef.submit();
    },
    addProductToCard: function(product) {
      this.selected.push(product);
      console.log(this.items);
    },
    removeProductFromCard: function(product) {
      var index = this.selected.findIndex(x => x.id == product.id);
      index === -1 ? (this.snackbar = true) : this.selected.splice(index, 1);
    },
    getQuantityInCard: function(product) {
      return this.selected.filter(p => p.id === product.id).length;
    },
    getSum: function() {
      return this.selected.reduce((a, { prix }) => a + prix, 0);
    },
    getButtonText: function() {
      let hasProducts = this.selected.length > 0;
      let sum = this.selected.reduce((a, { prix }) => a + prix, 0);
      return hasProducts
        ? `Payer ${sum}€`
        : `Sélectionnez un ou plusieurs produits`;
    },
    sendEmail: function() {
      var template_params = this.emailForm;
      template_params.from_name = this.name;
      let products = this.products;
      this.items.forEach(function(value, key) {
        let product = products.find(x => x.stripe == value.price);
        template_params.message += `${value.quantity}x ${product.nom}\n` 
      });
      localStorage.form = JSON.stringify(template_params);
      // emailjs.send(service_id,template_id, template_params, user_id);
    },
    tokenCreated (token) {
      this.token = token;
      // for additional charge objects go to https://stripe.com/docs/api/charges/object
      this.charge = {
        source: token.id,
        amount: this.getSum()*100, // the amount you want to charge the customer in cents. $100 is 1000 (it is strongly recommended you use a product id and quantity and get calculate this on the backend to avoid people manipulating the cost)
        description: `Commande réalisée à ${Date.now().toString()} par ${this.first_name} ${this.last_name} / ${this.emailForm.from_email} ${this.emailForm.from_phone} ` // optional description that will show up on stripe when looking at payments
      }
      this.sendTokenToServer(this.charge);
    },
    sendTokenToServer (charge) {
      console.log(charge);
    },
    getUniques() {
      return [...new Set(this.selected.map(item => item.price))];
    }
  },
  computed: {
    name: {
      get() {
        return `${this.first_name} ${this.last_name}`;
      },
    },
    items: {
      get() {
        let items = [];
        let selected = this.selected;
        let uniques = [...new Set(this.selected.map(item => item.stripe))];
        uniques.forEach(function(value, key) {
          let subselected = selected.filter(x => x.stripe == value);
          if(subselected){
            items.push({
              price: value,
              quantity: subselected.length
            });
          }
        });
        return items;
      }
    }
  },
  data: function() {
    return {
      loading: false,
      dialog: false,
      token: null,
      successUrl: process.env.STRIPE_SUCCESS,
      cancelUrl: process.env.STRIPE_ERROR,
      charge: null,
      amount: 1000,
      snackbar: false,
      isValid: false,
      publishableKey: process.env.STRIPE_PUBKEY, 
      selected: [],
      first_name: "",
      last_name: "",
      emailForm: {
        "from_name": "",
        "to_name": "Christophe",
        "from_email": "",
        "from_phone": "",
        "from_address": "",
        "from_address2": "",
        "from_city": "",
        "from_zipcode": "",
        "message": ""
      },
      products: [
        {
          id: 1,
          stripe: "price_1H2tKzCxSmypN2CIg4H0fhbm",
          nom: "Les 7 familles du trail - Lot de 1 JEU",
          description:
            "Jeu des 7 familles du Trail créé par l’illustrateur Redge et personnalisé au couleur du Team Globetrailer.",
          prix: 8,
          img: "jeu.jpg"
        },
        {
          id: 2,
          stripe: "price_1H2tLbCxSmypN2CIQKcuFgT3",
          nom: "Les 7 familles du trail - Lot de 4 JEUX",
          description:
            "Jeu des 7 familles du Trail créé par l’illustrateur Redge et personnalisé au couleur du Team Globetrailer.",
          prix: 25,
          img: "jeu.jpg"
        },
        {
          id: 3,
          stripe: "price_1H2tM4CxSmypN2CIOdXrSOma",
          nom: "Trucker 7 Wild Trail",
          description: "Casquette Trucker 7 Wild Trail.",
          prix: 25,
          img: "casquette.jpg"
        },
        {
          id: 4,
          stripe: "price_1H2tMNCxSmypN2CIuJSFUHxM",
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
