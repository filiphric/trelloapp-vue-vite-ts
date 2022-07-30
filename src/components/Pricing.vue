<template>
  <div class="bg-white">
    <div class="container py-8 px-6 mx-auto">
      <p class="text-xl text-center text-gray-500">
        Choose your plan
      </p>

      <h1 class="mt-4 text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl">
        Pricing Plan
      </h1>
      <p class="mt-3 text-center">
        Seeing that you are from {{ emoji.emojify(`:flag-${pricing.location}:`) }}, {{ pricing.discountEligible ? `you are eligible for a discount of ${pricing.discountAmount}%` : 'you are unfortunately not eligible for discount' }}
      </p>
             
      <div
        v-for="plan in plans"
        :key="plan.id"
      >
        <div class="mt-6 space-y-8 xl:mt-12">
          <div
            class="flex justify-between items-center py-4 px-8 mx-auto max-w-2xl rounded-sm border cursor-pointer"
            :class="plan.id === pricing.activePlan && 'border-blue6 text-blue6'"
            @click="pricing.activePlan = plan.id"
          >
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-gray-400 sm:w-9 sm:h-9"
                :class="plan.id === pricing.activePlan && 'text-blue6'"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>

              <div class="flex flex-col items-center mx-5 space-y-1">
                <h2
                  class="text-lg font-medium text-gray-700 sm:text-2xl"
                  :class="plan.id === pricing.activePlan && 'text-blue6'"
                >
                  {{ plan.name }}
                </h2>
              </div>
            </div>
                        
            <h2
              class="text-2xl font-semibold text-gray-500 sm:text-4xl"
              :class="plan.id === pricing.activePlan && 'text-blue6'"
            >
              {{ pricing.currency === 'EUR' ? '€' : pricing.currency === 'GBP' ? '£' : '$' }} {{ plan.price[pricing.currency] }} <span class="text-base font-medium">/ Month</span>
            </h2>
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-6">
        <button class="py-2 px-8 tracking-wide text-white capitalize bg-green7 hover:bg-green6 rounded-sm focus:outline-none">
          Choose Plan
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useStore } from '@/store/store';
import { storeToRefs } from 'pinia';
import emoji from 'node-emoji'
const { pricing } = storeToRefs(useStore());
const { getLocation } = useStore();
getLocation()

const plans: { [key: string]: any } = [
  {
    id: 1,
    name: 'Basic',
    price: {
      GBP: '39',
      USD: '49',
      EUR: '59'
    } 
  },
  {
    id: 2,
    name: 'Pro',
    price: {
      GBP: '79',
      USD: '99',
      EUR: '129',
    } 
  },
  {
    id: 3,
    name: 'Enterprise',
    price: {
      GBP: '119',
      USD: '149',
      EUR: '179'
    } 
  },
]


</script>