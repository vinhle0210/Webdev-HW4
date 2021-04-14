


(function (window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  var firebaseConfig = {
    apiKey: "AIzaSyD2JllBXHKa4f4_eIccZMNhdmDN9bLHeJI",
    authDomain: "coffee-run-49a05.firebaseapp.com",
    projectId: "coffee-run-49a05",
    storageBucket: "coffee-run-49a05.appspot.com",
    messagingSenderId: "105354119368",
    appId: "1:105354119368:web:dd54389f9c9e11188d7dfd"
  };
  // firebase.initializeApp(firebaseConfig);
  class FireBaseDataStore {
      constructor() {
          console.log('running the FireBaseDataStore function');
            firebase.initializeApp(firebaseConfig);
        // firebase.initializeApp(App.FirebaseConfig.firebaseConfig);
        this.firestore = firebase.firestore();
      }

      async add(key, val) {
          console.log('firebase add  ')
          const docRef = this.firestore.doc(`orders/${this.makeDocHash(20)}`);
          return docRef.set(val); // i realize that could just use .add, but wanted to try .set instead.
        // return this.firestore.doc(`orders/${key}`).set(val);
      }
      async get(email, cb)  { 
          const docRef = this.firestore.collection(`orders`);
          const snapshot = await docRef.where('emailAddress', '==', email).get();
          return await snapshot.docs.map(e => e.data());
      }
      async getAll(cb)    { 
          const docRef = this.firestore.collection(`orders`);
          const snapshot = await docRef.get();
          return await snapshot.docs.map(e => e.data());
      }
      async remove(email)   { 
          const docRef = await this.firestore.collection(`orders`);
          const batch = this.firestore.batch();
          const snapshot = await docRef.where('emailAddress', '==', email).get();
          snapshot.forEach(doc => {
              batch.delete(doc.ref);
          });
          await batch.commit();
      }
      makeDocHash(len) {
          var result           = '';
          var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          var charactersLength = characters.length;
          for ( var i = 0; i < len; i++ ) {
             result += characters.charAt(Math.floor(Math.random() * charactersLength));
          }
          return result;
       }
  }
  App.FireBaseDataStore = FireBaseDataStore;
  window.App = App;

})(window);