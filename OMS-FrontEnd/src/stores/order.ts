import { defineStore } from "pinia";
import { httpClient } from "../axios";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";
import type { IOrder } from "../types/interfaces/order";
export const useOrdersStore = defineStore("orders", () => {
  const toast = useToast();
  const isLoading = ref(false);
  const orders = ref([] as IOrder[]);
  const orderRow = ref([]);
  const showUpsertSendPDFModal = ref(false);
  const showError = (error: any) => {
    let message = "An error occurred";
    if (error.response) {
      message = error.response.data.detail || message;
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
    } catch (error) {
      showError(error);
    } finally {
      isLoading.value = false;
    }
  }

  async function getOrderRow(orderId: string) {
    try {
      isLoading.value = true;
      const { data } = await httpClient.get(`api/order-rows/${orderId}/`);
      orderRow.value = data;
    } catch (error) {
      showError(error);
    } finally {
      isLoading.value = false;
    }
  }

  async function sendEmail(email: string, orderId: string) {
    try {
      const { data } = await httpClient.post(`api/send-order`, {
        email: email,
        orderId: orderId
      });

      showSuccess(`Order info sent to: ${email}`);
    } catch (error) {
      showError(error);
    }
  }

  return {
    isLoading,
    orders,
    orderRow,
    showUpsertSendPDFModal,
    getData,
    getOrderRow,
    sendEmail,
  };
});
