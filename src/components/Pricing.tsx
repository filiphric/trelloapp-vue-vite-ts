import React, { useRef } from 'react';
import { useStore } from '@/store/store';
import emoji from 'node-emoji';
import * as L from 'leaflet';
import RoundCheckbox from '@/assets/icons/roundCheckbox.svg';
import { useEffect } from 'react';

const plans: { [key: string]: any }[] = [
  { id: 1, name: 'Basic', price: { GBP: '39', USD: '49', EUR: '59' } },
  { id: 2, name: 'Pro', price: { GBP: '79', USD: '99', EUR: '129' } },
  { id: 3, name: 'Enterprise', price: { GBP: '119', USD: '149', EUR: '179' } },
];

const Pricing: React.FC = () => {
  const pricing = useStore((s) => s.pricing);
  const getLocation = useStore((s) => s.getLocation);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getLocation();
  }, []);

  const geolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(drawMap);
    }
 else {
      console.log('not working!!');
    }
  };

  const drawMap = (position: GeolocationPosition) => {
    if (!mapRef.current) return;
    const map = L.map(mapRef.current);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
    const target = L.latLng(position.coords.latitude, position.coords.longitude);
    map.setView(target, 14);
  };

  const setActivePlan = (planId: number) => {
    useStore.setState({ pricing: { ...pricing, activePlan: planId } });
  };

  return (
    <div className="bg-white">
      <div className="container py-8 px-6 mx-auto">
        <h1 className="mt-4 text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl">Pricing Plan</h1>
        {pricing.discountEligible && (
          <div data-test-id="discount" className="grid mx-auto mt-4 max-w-2xl bg-yellow-100 rounded-sm border border-yellow-300">
            <p className="pb-1 text-center">
              Your country is <span className="text-2xl">{emoji.emojify(`:flag-${pricing.location}:`)}</span>,
              {pricing.discountEligible ? ` you are eligible for a discount of ${pricing.discountAmount}%` : ' you are unfortunately not eligible for discount'}
            </p>
          </div>
        )}
        {plans.map((plan) => (
          <div key={plan.id}>
            <div className="mt-6 space-y-8 xl:mt-12">
              <div
                className={`flex justify-between items-center py-4 px-8 mx-auto max-w-2xl rounded-sm border cursor-pointer ${
                  plan.id === pricing.activePlan ? 'border-blue6 text-blue6' : ''
                }`}
                data-test-id="plan-item"
                onClick={() => setActivePlan(plan.id)}
              >
                <div className="flex items-center">
                  <RoundCheckbox className={`w-5 h-5 text-gray-400 sm:w-9 sm:h-9 ${plan.id === pricing.activePlan ? 'text-blue6' : ''}`} />
                  <div className="flex flex-col items-center mx-5 space-y-1">
                    <h2 className={`text-lg font-medium text-gray-700 sm:text-2xl ${plan.id === pricing.activePlan ? 'text-blue6' : ''}`}>{plan.name}</h2>
                  </div>
                </div>
                <h2
                  className={`text-2xl font-semibold sm:text-4xl ${plan.id === pricing.activePlan ? 'text-blue6' : 'text-gray-500'}`}
                  data-test-id="plan-price"
                >
                  {pricing.currency === 'EUR' ? '\u20AC' : pricing.currency === 'GBP' ? '\u00A3' : '$'} {plan.price[pricing.currency]}
                  <span className="text-base font-medium">/ Month</span>
                </h2>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-center mt-6">
          <button
            className="py-2 px-8 tracking-wide text-white capitalize bg-green7 hover:bg-green6 rounded-sm focus:outline-none"
            data-test-id="find-location"
            onClick={geolocation}
          >
            Find my location
          </button>
        </div>
        <div id="map" ref={mapRef} className="mx-auto mt-4 max-w-2xl h-64" />
      </div>
    </div>
  );
};

export default Pricing;
