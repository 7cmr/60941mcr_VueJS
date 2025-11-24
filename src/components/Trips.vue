<template>
  <DataTable
    :value="trips"
    :lazy="true"
    :loading="dataStore.loading"
    :paginator="true"
    :rows="perpage"
    :rowsPerPageOptions="[2, 5, 10]"
    :totalRecords="trips_total"
    @page="onPageChange"
    responsive-layout="scroll"
    :first="offset"
  >
    <Column field="route_cities" header="Маршрут"/>
    <Column field="transport_name" header="Транспорт"/>
    <Column field="start" header="Начало"/>
    <Column field="finish" header="Конец"/>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {useDataStore} from '@/stores/dataStore';

export default {
  name: "Trips",
  components: {DataTable, Column},
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
    }
  },
  computed: {
    trips() {
      return this.dataStore.trips;
    },
    trips_total() {
      return this.dataStore.trips_total;
    }
  },
  mounted() {
    console.log('Trips component MOUNTED!');
    this.dataStore.get_trips();
    this.dataStore.get_trips_total();
    console.log('Categories=', this.trips);
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      this.dataStore.get_trips(this.offset / this.perpage, this.perpage);
    }
  }
}
</script>

<style scoped>
</style>
