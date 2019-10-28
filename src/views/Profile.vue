<template>
  <div class="container">
    <div>
      <div>
        <h1>Welcome back {{userOptions.uidUser.displayName}}</h1>
      </div>
      <div>
        <img src="https://via.placeholder.com/150" />
      </div>
      <div>
        <label>Change username:</label>
        <input type="text" v-model="userOptions.setUsername" />
        <input type="button" value="Change" @click="setDisplayName" />
      </div>
      <div>
        <label>Change email:</label>
        <input type="text" v-model="userOptions.setEmail" />
        <input type="button" value="Change" @click="setEmailAddress" />
      </div>
      <div>
        <label>Change password:</label>
        <input type="text" v-model="userOptions.setPassword" />
        <input type="button" value="Change" @click="setNewPassword" />
      </div>
      <div>
        <label>ReAuth:</label>
        <input type="text" v-model="userOptions.reMail" />
        <input type="text" v-model="userOptions.rePassword" />
        <input type="button" value="ReAuth" @click="reAuthRequest" />
      </div>
      <div>
        <label>Delete:</label>
        <input type="button" value="Delete Account" @click="deleteAccount" />
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/main";
import { auth } from "@/main";
import firebase from "firebase/app";

export default {
  data() {
    return {
      userOptions: {
        reMail: null,
        rePassword: null,
        setUsername: null,
        setEmail: null,
        setPassword: null,
        uidUser: this.$store.state.userOptions.user
      }
    };
  },
  computed: {
    uidUser() {
      return (this.userOptions.uidUser = this.$store.state.userOptions.user);
    }
  },
  methods: {
    setDisplayName() {
      const navigation = this.$router;
      db.collection("users")
        .doc(this.userOptions.uidUser.uid)
        .update({
          displayName: this.userOptions.setUsername
        })
        .then(() => {
          auth.currentUser
            .updateProfile({
              displayName: this.userOptions.setUsername
            })
            .then(
              function() {
                console.log("Updated");
                navigation.go();
              },
              function(error) {
                console.log("Error happened");
              }
            );
        });
    },
    setEmailAddress() {
      auth.currentUser
        .updateEmail(this.userOptions.setEmail)
        .then(function() {
          console.log("Email changed");
          navigator.go();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    setNewPassword() {
      auth.currentUser
        .updatePassword(this.userOptions.setPassword)
        .then(function() {
          console.log("Password changed");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    reAuthRequest() {
      const user = auth.currentUser;
      var credentials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        this.userOptions.rePassword
      );
      // Prompt the user to re-provide their sign-in credentials

      user
        .reauthenticateWithCredential(credentials)
        .then(function() {
          // User re-authenticated.
          console.log("ReAuth True");
        })
        .catch(function(error) {
          // An error happened.
          console.log(error);
        });
    },
    deleteAccount() {
      var user = auth.currentUser;

      user
        .delete()
        .then(function() {
          // User deleted.
        })
        .catch(function(error) {
          // An error happened.
        });
    }
  }
};
</script>