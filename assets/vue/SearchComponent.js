export default {
    data() {
      return {
        standort: '',
        abholdatum: '',
        rueckgabedatum: ''
      };
    },
    methods: {
      submitForm() {
        const searchParams = new URLSearchParams({
          standort: this.standort,
          abholdatum: this.abholdatum,
          rueckgabedatum: this.rueckgabedatum
        });
        window.location.href = `/search?${searchParams.toString()}`;
      }
    },
    template: `
      <div class="search-container">
        <form @submit.prevent="submitForm">
          <div class="search-field">
            <input v-model="standort" type="text" placeholder="Abholort suchen" required>
          </div>
          <div class="search-field">
            <input v-model="abholdatum" type="date" placeholder="Abholdatum">
          </div>
          <div class="search-field">
            <input v-model="rueckgabedatum" type="date" placeholder="Rückgabedatum">
          </div>
          <button type="submit" class="search-button">
            <img src="/images/search.svg" alt="search">
          </button>
        </form>
      </div>
    `
  };
  