<template>
  <div class="container">
    <div v-if="layoutOptions.loading">LOADING</div>
    <div class="chat-wrapper" v-else>
      <div v-if="!userOptions.uidUser.displayName">
        <div>
          <input
            @keyup.enter="setDisplayName"
            type="text"
            maxlength="12"
            v-model="userOptions.setUsername"
          />
          <input type="button" value="Send" @click="setDisplayName" />
        </div>
      </div>

      <div class="chat" v-else>
        <div class="messages scrollable" v-chat-scroll>
          <div class="message">
            <div
              v-for="(message, index) in messagesOptions.messages"
              :key="index"
              v-bind:class="messageType(message)"
            >
              <p>{{message.message}}</p>
              <span>
                {{message.date}} by
                <router-link v-bind:to="'/profile/' + message.uid">{{message.displayName}}</router-link>
              </span>
            </div>
          </div>
        </div>

        <div class="chat-input">
          <input type="text" v-model="messagesOptions.currentMessage" @keyup.enter="sendMessage" />
          <input type="button" value="Send" @click="sendMessage" />
        </div>
      </div>

      <div class="users-online">
        <h2>Online in the last 15 minutes:</h2>
        <div class="user">
          <span v-for="(user, index) in messagesOptions.lastOnline.slice().reverse()" :key="index">
            <router-link v-bind:to="'/profile/' + user.uid">{{user.displayName}}</router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/main";
import { auth } from "@/main";
import moment from "moment";

export default {
  name: "app",
  data() {
    return {
      adminOptions: {},
      layoutOptions: {
        loading: true
      },
      messagesOptions: {
        messages: [],
        lastOnline: [],
        usersContainer: [],
        currentMessage: null
      },
      userOptions: {
        setUsername: null,
        uidUser: this.$store.state.userOptions.user
      }
    };
  },
  methods: {
    usersOnline() {
      var newDate = new Date();

      const opt = this.messagesOptions;
      opt.usersContainer = [];
      opt.lastOnline = [];
      opt.messages
        .slice()
        .reverse()
        .forEach((mUser, mIndex) => {
          // Get users that wrote a message in chat in the last 15 minutes
          if (
            !opt.usersContainer.includes(mUser.uid) &&
            newDate.getTime() / 1000 - mUser.createdAt.seconds <= 900
          ) {
            opt.usersContainer.unshift(mUser.uid);
            opt.lastOnline.unshift({
              uid: mUser.uid,
              displayName: mUser.displayName,
              createdAt: mUser.createdAt,
              date: mUser.date
            });
          }
        });
    },
    sendMessage() {
      // Initialize Database
      db.collection("globalChat").add({
        message: this.messagesOptions.currentMessage,
        date: moment().format("lll"),
        createdAt: new Date(),
        displayName: this.userOptions.uidUser.displayName,
        uid: this.userOptions.uidUser.uid
      });
      this.messagesOptions.currentMessage = null;
      this.usersOnline();
    },
    loadMessages() {
      db.collection("globalChat")
        .orderBy("createdAt")
        .onSnapshot(querySnapshot => {
          let allMessages = [];
          querySnapshot.forEach(doc => {
            allMessages.push(doc.data());
          });
          this.messagesOptions.messages = allMessages;
          /*let onlineUsers = new Set();
          allMessages.forEach(function(user) {
            if (!onlineUsers.has(JSON.stringify(user.uid))) {
              onlineUsers.add(
                JSON.stringify({ uid: user.uid, displayName: user.displayName })
              );
            }
          });      
          /*this.messagesOptions.lastOnline = new Set(
            [...onlineUsers].map(obj => JSON.parse(obj))
          );
          this.messagesOptions.lastOnline = Array.from(new Set(
            [...onlineUsers].map(obj => JSON.parse(obj))
          ));
          console.log(this.messagesOptions.lastOnline); */
          this.layoutOptions.loading = false;
          this.usersOnline();
        });
    },
    setDisplayName() {
      const navigation = this.$router;
      // POST NAME in ('users') collection
      db.collection("users")
        .doc(this.userOptions.uidUser.uid)
        .update({
          displayName: this.userOptions.setUsername
        })
        .then(() => {
          // Updating the Profile

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
    messageType(message) {
      if (message.uid === this.userOptions.uidUser.uid) {
        return "message-author animated bounceInRight";
      }
      return "message-content animated bounceInLeft";
    }
  },
  created() {
    this.loadMessages();
    setInterval(function () {
      this.usersOnline();
    }.bind(this), 15000);

  },
  computed: {
    uidUser() {
      return (this.userOptions.uidUser = this.$store.state.userOptions.user);
    }
  }
};
</script>