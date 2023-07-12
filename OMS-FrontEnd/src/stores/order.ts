import { defineStore } from "pinia";
import { httpClient } from "../axios";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";
import type { IOrder } from "../types/interfaces/order";
export const useOrdersStore = defineStore("orders", () => {
  const toast = useToast();
  const isLoading = ref(false);
  const orders = ref([] as IOrder[]);

  const showError = (error: any) => {
    let message = "An error occurred";
    if (error.response) {
      message = error.response.data.error || message;
    } else if (error.message) {
      message = error.message;
    }
    toast.add({
      severity: "error",
      summary: "Error Message",
      detail: message,
      life: 3000,
    });
  };

  const showSuccess = (message: string) => {
    toast.add({
      severity: "success",
      summary: "Success Message",
      detail: message,
      life: 3000,
    });
  };

  async function getData() {
    try {
      isLoading.value = true;
      const { data } = await httpClient.get(`api/`);
      orders.value = data;
      console.log(data);
    } catch (error) {
      showError(error);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    isLoading,
    orders,
    getData
  };
});
