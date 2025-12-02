<template>
  <DataTable
    :value="transports"
    :lazy="true"
    :loading="dataStore.loading"
    :paginator="true"
    :rows="perpage"
    :rowsPerPageOptions="[2, 5, 10]"
    :totalRecords="transports_total"
    @page="onPageChange"
    responsive-layout="scroll"
    :first="offset"
  >
    <Column field="name" header="Транспорт"/>
    <Column field="capacity" header="Грузоподъемность"/>
    <Column header="Фото">
      <template #body="slotProps">
        <img v-if="slotProps.data.picture_url"
             :src="slotProps.data.picture_url"
             alt="Изображение"
             class="max-h-32 max-w-32 object-contain rounded bg-gray-100" />
        <span v-else>Нет изображения</span>
      </template>
    </Column>
    <template #footer v-if="authStore.isAuthenticated">
      <div class="text-end">
        <Button type="button" @click="this.$router.push('/createTransport')" icon="pi pi-plus" label="Добавить транспорт" />
      </div>
    </template>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from 'primevue/button';
import { useAuthStore } from '@/stores/authStore.js'
import {useDataStore} from '@/stores/dataStore';

export default {
  name: "Transports",
  components: {DataTable, Column, Button},
  data() {
    return {
      dataStore: useDataStore(),
      authStore: useAuthStore(),
      perpage: 5,
      offset: 0,
    }
  },
  computed: {
    transports() {
      return this.dataStore.transports;
    },
    transports_total() {
      return this.dataStore.transports_total;
    }
  },
  mounted() {
    console.log('Transports component MOUNTED!');
    this.dataStore.get_transports();
    this.dataStore.get_transports_total();
    console.log('Categories=', this.transports);
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      this.dataStore.get_transports(this.offset / this.perpage, this.perpage);
    }
  }
}
</script>

<style scoped>
</style>
