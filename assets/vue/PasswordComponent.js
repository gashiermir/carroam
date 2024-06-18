// assets/vue/PasswordComponent.js
export default {
    data() {
        return {
            password: ""
        }
    },
    props: {
        title: String
    },
    computed: {
        qualityclass() {
            if (this.password.length > 8) {
                return "alert alert-success";
            } else {
                return "alert alert-danger";
            }
        }
    },
    template: `
     <div class="mt-4">
        <div>
            <label>{{title}}</label>
            <input class="form-control" type="password" v-model="password" @input="$emit('update', $event.target.value)">
        </div>
        <div class="mt-4">
            <span v-bind:class="qualityclass">Password Quality</span>
        </div>
    </div>
    `
}
