<template>
  <div class="flex justify-center">
    <form v-on:submit.prevent="createTransport" class="w-1/2 p-6">
      <h2 class="text-2xl mb-4 text-center" style="color: dimgrey">Добавление транспорта</h2>
      <div class="flex flex-col">
        <InputText type="text" placeholder="Введите наименование" v-model="transportName" />
      </div>
      <div class="flex flex-col mt-4">
        <InputText type="number" placeholder="Введите грузоподъемность" v-model.number="transportCapacity" step="10" />
      </div>
      <div class="mb-4 mt-4">
        <label for="file" id="file-label" class="block text-md font-medium text-gray-500 border border-gray-300 rounded-md p-2">
          <span class="pi pi-upload mx-3"></span>
          <span>Выбрать изображение</span>
        </label>
        <input type="file" hidden id="file" name="file" v-on:change="changeCaption" required accept="image/*" />
      </div>

      <div class="flex flex-col mt-6">
        <Button type="submit" label="Создать" />
      </div>
    </form>
  </div>
  <Toast position="bottom-right" />
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useDataStore } from '@/stores/dataStore.js';
import Toast from 'primevue/toast';

export default {
  name: "CreateTransport",
  components: { InputText, Button, Toast },

  data() {
    return {
      // Инициализация хранилища данных
      dataStore: useDataStore(),
      // Локальные данные формы
      transportName: '',
      transportCapacity: '',
      transportImage: null,
    }
  },

  computed: {
    // Вычисляемые свойства для получения сообщений об ошибках из хранилища
    errorMessage() {
      return this.dataStore.errorMessage
    },
    errorCode() {
      return this.dataStore.errorCode
    },
  },

  methods: {
    // Метод для обновления текста лейбла файла при выборе изображения
    changeCaption(event) {
      const file = event.target.files[0];
      if (file) {
        // Обновление лейбла на имя файла
        document.getElementById('file-label').innerHTML = '<span class="pi pi-file mx-3"></span>' + file.name;
        this.transportImage = file;
      } else {
        // Восстановление текста лейбла по умолчанию
        document.getElementById('file-label').innerHTML = '<span class="pi pi-upload mx-3"></span>Выбрать изображение';
        this.transportImage = null;
      }
    },

    // Асинхронный метод для отправки формы
    async createTransport() {
      // Создание объекта FormData для отправки данных, включая файл
      const formData = new FormData();
      formData.append('name', this.transportName);
      formData.append('capacity', this.transportCapacity);
      formData.append('image', this.transportImage);

      // Вызов действия хранилища для создания категории
      await this.dataStore.create_transport(formData);

      // Отображение уведомления (Toast) в зависимости от результата
      if (this.errorCode > 0) {
        this.$toast.add({ severity: 'error', summary: "Ошибка добавления данных", detail: this.errorMessage, life: 4000 });
      } else {
        this.$toast.add({ severity: 'success', summary: 'Данные успешно добавлены', detail: this.errorMessage, life: 4000 });
      }
    }
  }
}
</script>

<style scoped>
</style>
