<template>
  <div class="w-full surface-card p-4 shadow-2 border-round mb-5">
    <h1>Info for Order {{ orderId }}</h1>
  </div>

  <div class="w-full flex justify-content-end mb-3">
    <Button @click="orderStore.showUpsertSendPDFModal = true, setCurrentInvoice(orderStore.orderRow)"
      >Send PDF</Button
    >
  </div>
  <!-- @vue-ignore -->
  <DataView :value="orderStore.orderRow">
    <template #list="slotProps">
      <div class="col-12">
        <div
          class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4"
        >
          <div
            class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
          >
            <div
              class="flex flex-column align-items-center sm:align-items-start gap-3"
            >
              <div class="text-2xl font-bold text-900">
                {{ slotProps.data.product_name }}
              </div>
              <Rating
                :modelValue="slotProps.data.rating"
                readonly
                :cancel="false"
              ></Rating>
              <div class="flex align-items-center gap-3">
                <span class="flex align-items-center gap-2">
                  <i class="pi pi-tag"></i>
                  <span class="font-semibold">{{
                    slotProps.data.product_code
                  }}</span>
                  (Product Code)
                </span>
              </div>
              <div class="flex align-items-center gap-3">
                <span class="flex align-items-center gap-2">
                  <i class="pi pi-info"></i>

                  <span class="font-semibold">{{
                    slotProps.data.ordered_quantity
                  }}</span>
                  (Ordered Quantity)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </DataView>
  <UpsertSendPDFModal :orderId="orderId" :selectedInvoice="selectedInvoice" @close="
        orderStore.showUpsertSendPDFModal = false;
      "/>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useOrdersStore } from "../stores/order";
import { useRoute } from "vue-router";
import UpsertSendPDFModal from "../components/UpsertSendPDFModal.vue";
const orderStore = useOrdersStore();

const route = useRoute();
const orderId = route.params.id as string;
const selectedInvoice = ref(null)
const setCurrentInvoice = (invoice: any) => {
  selectedInvoice.value = invoice
}


onMounted(async () => {
  await orderStore.getOrderRow(orderId);
});
</script>
