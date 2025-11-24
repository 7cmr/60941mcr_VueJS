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
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {useDataStore} from '@/stores/dataStore';

export default {
  name: "Transports",
  components: {DataTable, Column},
  data() {
    return {
      dataStore: useDataStore(),
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
