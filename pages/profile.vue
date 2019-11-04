<template>
  <div class="profile-wrapper">
    <div>
      <span>Welcome back, {{ user.firebase.displayName }}</span>
      <div class="avatar-wrapper">
        <span v-if="user.firebase.emailVerified"><i class="fas fa-check verified-profile"></i></span>
        <img class="profile-avatar" style="height: 150px; width: 150px; border-radius: 50%; background: black;" :src="user.firebase.photoURL">
      </div>
      <div class="profile-change">
        <div class="updateDisplayName">
          <input type="text" v-model="newProfile.displayName">
          <input type="button" value="Change Username" @click="updateDisplayName">
        </div>
        <div class="re-auth">
          <div class="isNotReAuth" v-if="isNotReAuth">
            <div>
              <input type="text" v-model="reAuth.emailAddress">
              <input type="text" v-model="reAuth.password">
              <input type="button" value="Re-Authenticate" @click="reAuthenticate">
            </div>
          </div>
          <div class="isReAuth" v-else>
            <div class="updateEmail">
              <input type="text" v-model="newProfile.newEmail">
              <input type="button" value="Change Email" @click="updateEmailAddress">
            </div>
            <div class="updatePassword">
              <input type="text" v-model="newProfile.newPassword">
              <input type="button" value="Change Password" @click="updatePassword">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '@/plugins/initializeFirebase'

export default {
  data () {
    return {
      isNotReAuth: true,
      user: {
        firebase: this.$store.state.user.data,
        db: this.$store.state.user.dataDB
      },
      newProfile: {
        displayName: null,
        photoURL: null,
        newEmail: null,
        newPassword: null
      },
      reAuth: {
        emailAddress: null,
        password: null
      }
    }
  },
  methods: {
    updateDisplayName () {
      auth.currentUser.updateProfile({
        displayName: this.newProfile.displayName
      })
    },
    updatePhotoURL () {
      auth.currentUser.updateProfile({
        photoURL: this.newProfile.photoURL
      })
    },
    updateEmailAddress () {
      auth.currentUser.updateEmail(this.newProfile.newEmail).then(() => {
        console.log('Email changed to: ' + this.newProfile.newEmail)
      }).catch((error) => {
        console.log('Error: ' + error)
      })
    },
    updatePassword () {
      auth.currentUser.updatePassword(this.newProfile.newPassword).then(() => {
        console.log('Password changed to: ' + this.newProfile.newPassword)
      }).catch((error) => {
        console.log('Error: ' + error)
      })
    },
    reAuthenticate () {
      console.log('Re-Auth')
    }
  }
}
</script>
