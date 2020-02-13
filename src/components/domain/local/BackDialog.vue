<template>
  <v-card>
    <v-tabs vertical>
      <v-tab>所有链接</v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-list>
              <v-list-item v-for="(item, i) in links" :key="i">
                <v-list-item-icon>
                  <img
                    style="height: 24px; width: 24px;"
                    :src="'data:image/png;base64,' + item.ico"
                  />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
export default {
  name: "BackDialog",
  props: ["links"]
};
</script>