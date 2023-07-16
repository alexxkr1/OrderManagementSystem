<template>
  <Dialog
    :visible="orderStore.showUpsertSendPDFModal"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    modal
    :style="{ width: '50vw', zIndex: 2 }"
    :closable="false"
  >
    <template #header>
      <div class="flex flex-column gap-2">
        <h1 class="m-0 text-900 font-semibold text-xl line-height-3">
          Send Invoice Details
        </h1>
        <span class="text-600 text-base font-normal"
          >Enter email who should get it.</span
        >
      </div>
    </template>

    <form @submit.prevent="handleSubmit" class="flex flex-column gap-3 mt-3">
      <div>
        <label for="emailrole" class="block mb-1 text-color text-base"
          >Email*</label
        ><span class="p-input-icon-left w-full"
          ><i class="pi pi-envelope z-1"></i>
          <InputText class="w-full" v-model="state.email" placeholder="Email" />
        </span>
        
        <span v-if="v$.email.$error && submitted">
          <span
            id="email-error"
            v-for="(error, index) of v$.email.$errors"
            :key="index"
          >
            <small class="p-error">{{ error.$message.replace('Value', 'Email') }}</small>
          </span>
        </span>
        <small
          v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response"
          class="p-error"
          >{{ v$.email.required.$message.replace('Value', 'Role') }}</small
        >
      </div>
      <pre>{{ props.selectedInvoice }}</pre>
    </form>
    <template #footer>
      <form @submit.prevent="handleSubmit"></form>
      <div
        class="flex gap-3 justify-content-end border-top-1 surface-border pt-5"
      >
        <button
          @click="close"
          aria-label="Cancel"
          class="p-button p-component p-button-text"
        >
          <span class="p-button-label p-c">Cancel</span
          ><span
            role="presentation"
            class="p-ink"
            style="height: 63.6861px; width: 63.6861px"
          ></span>
        </button>

        <button
          @click="handleSubmit"
          aria-label="Update"
          class="p-button p-component p-button-rounded"
        >
          <span class="p-button-label p-c">Send</span
          ><span
            role="presentation"
            class="p-ink"
            style="height: 67.6535px; width: 67.6535px"
          ></span>
        </button>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useOrdersStore } from "../stores/order";
import { useVuelidate } from "@vuelidate/core";
import { required, email as emailRule } from "@vuelidate/validators";

const orderStore = useOrdersStore();
const submitted = ref(false)

const state = reactive({
  email: "",
});

const rules = {
  email: { required, emailRule },
};

const v$ = useVuelidate(rules, state);

const emit = defineEmits<{
  (event: "close", ...args: any[]): void;
}>();

const props = defineProps<{
  selectedInvoice?: any;
  orderId: string;
}>();

const close = () => {
  emit("close");
  submitted.value = false
};

const handleSubmit = async () => {
  const result = await v$.value.$validate();
  submitted.value = true

  if (result) {
    await orderStore.sendEmail(state.email, props.orderId);
  }
};
</script>
