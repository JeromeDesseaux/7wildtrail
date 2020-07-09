<template>
  <v-layout column justify-center align-center>
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
          <h2>
              C'est dans la boite! 
          </h2>
          <p>Merci de votre participation et à très vite sur les sentiers :)</p>
          <p><b>Christophe Le Saux</b></p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import emailjs from 'emailjs-com';
var service_id = "default_service";
var template_id = "template_ay9aVQN9";
var user_id = "user_CaI0G7bimMynXpfJfBFUa";

export default {
    mounted() {
        let data = JSON.parse(localStorage.getItem('form'));
        if(data){
            emailjs.send(service_id,template_id, data, user_id);
            localStorage.removeItem('form');
        }
    }
}
</script>