<template>
  <div class="w-full surface-card p-4 shadow-2 border-round mb-5">
    <h1>Info on all Orders</h1>
  </div>

  <div class="w-full">
    <div>
      <DataTable
        paginator
        :rows="5"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        ref="dt"
        :value="displayedOrders"
        v-model:filters="filters1"
        responsiveLayout="scroll"
        :globalFilterFields="['customer_code', 'order_number']"
      >
        <template #header>
          <div v-if="orderStore.isLoading" class="flex justify-content-between">
            <Skeleton style="width: 234px; height: 43px"></Skeleton>
            <div class="flex justify-content-between">
              <Skeleton
                class="mr-2"
                style="width: 177px; height: 43px"
              ></Skeleton>

              <Skeleton style="width: 134px; height: 43px"></Skeleton>
            </div>
          </div>
          <div v-else class="flex justify-content-between">
            <span class="p-input-icon-left">
              <i class="pi pi-search z-1" />
              <InputText
                v-model="filters1['global'].value"
                placeholder="Find orders"
              />
            </span>
            <div>
              <button
                class="mr-2 p-button p-component p-button-outlined w-full sm:w-auto flex-order-0 sm:flex-order-1"
                type="button"
                aria-label="Add New"
                @click="exportCSV($event)"
              >
                <!----><span
                  class="pi pi-download p-button-icon p-button-icon-left"
                ></span
                ><span class="p-button-label">Download Info</span
                ><!----><span
                  class="p-ink"
                  role="presentation"
                  aria-hidden="true"
                ></span>
              </button>
            </div>
          </div>
        </template>
        <Column field="orderNumber" header="Order Number" :sortable="true">
          <template #body="slotProps">
            <div v-if="orderStore.isLoading">
              <Skeleton></Skeleton>
            </div>
            <div v-else>
              <p>{{ slotProps.data.order_number }}</p>
            </div>
          </template>
        </Column>
        <Column field="customerCode" header="Customer Code" :sortable="true">
          <template #body="slotProps">
            <div v-if="orderStore.isLoading">
              <Skeleton></Skeleton>
            </div>
            <div v-else>
              <p>{{ slotProps.data.customer_code }}</p>
            </div>
          </template>
        </Column>
        <Column field="customerName" header="Customer Name" :sortable="true">
          <template #body="slotProps">
            <div v-if="orderStore.isLoading">
              <Skeleton></Skeleton>
            </div>
            <div v-else>
              <p>{{ slotProps.data.customer_name }}</p>
            </div>
          </template>
        </Column>
        <Column field="date" header="Date" :sortable="true">
          <template #body="slotProps">
            <div v-if="orderStore.isLoading">
              <Skeleton></Skeleton>
            </div>
            <div v-else>
              <p>{{ formatDate(slotProps.data.date) }}</p>
            </div>
          </template>
        </Column>
        <Column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <div
              class="flex justify-content-center"
              v-if="orderStore.isLoading"
            >
              <Skeleton shape="circle" size="3rem" class="mr-2"></Skeleton>
            </div>
            <div v-else>
              <RouterLink :to="`/${slotProps.data.id}`">
                <Button icon="pi pi-info-circle" outlined rounded />
              </RouterLink>
            </div>
          </template>
        </Column>
        <template v-if="!orderStore.isLoading" #empty> Empty </template>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useOrdersStore } from "../stores/order";
import { FilterMatchMode } from "primevue/api";

const orderStore = useOrdersStore();

const dt = ref();

//@ts-ignore
const exportCSV = (event: any) => {
  dt.value.exportCSV();
};

const displayedOrders = computed(() => {
  const defaultClients = Array(5).fill(null);
  return orderStore.isLoading ? defaultClients : orderStore.orders;
});

const filters1 = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString();
}

onMounted(async () => {
  await orderStore.getData();
});
</script>
