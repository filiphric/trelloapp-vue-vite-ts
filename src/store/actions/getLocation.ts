import axios from 'axios';

export const getLocation = async (set: any, get: any) => {
  axios.get('/api/location').then(({ data }) => {
    set({
      pricing: {
        ...get().pricing,
        location: data.location,
        currency: data.currency,
        discountEligible: data.discountEligible,
        discountAmount: data.discountAmount,
      },
    });
  });
};
