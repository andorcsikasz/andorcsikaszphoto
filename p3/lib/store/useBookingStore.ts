import { create } from 'zustand';

export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: 'seat' | 'piece' | 'sqm';
}

export interface BookingState {
  services: {
    sofa: ServiceItem;
    mattress: ServiceItem;
    carpet: ServiceItem;
  };
  customerDetails: {
    name: string;
    address: string;
    phone: string;
  };
  selectedDate: Date | null;
  currentStep: number;
  
  // Actions
  updateServiceQuantity: (serviceId: keyof BookingState['services'], quantity: number) => void;
  updateCarpetArea: (area: number) => void;
  updateCustomerDetails: (details: Partial<BookingState['customerDetails']>) => void;
  setSelectedDate: (date: Date | null) => void;
  setCurrentStep: (step: number) => void;
  resetBooking: () => void;
  
  // Computed
  getSubtotal: () => number;
  getDiscount: () => number;
  getTotal: () => number;
  hasBundleDiscount: () => boolean;
}

const BASE_FEE = 15000;
const SOFA_PRICE_PER_SEAT = 7000;
const MATTRESS_PRICE = 6000;
const CARPET_PRICE_PER_SQM = 1200;
const BUNDLE_DISCOUNT_THRESHOLD = 45000;
const BUNDLE_DISCOUNT_PERCENTAGE = 0.1;

const initialServices = {
  sofa: {
    id: 'sofa',
    name: 'Kanapé',
    price: SOFA_PRICE_PER_SEAT,
    quantity: 0,
    unit: 'seat' as const,
  },
  mattress: {
    id: 'mattress',
    name: 'Matrac',
    price: MATTRESS_PRICE,
    quantity: 0,
    unit: 'piece' as const,
  },
  carpet: {
    id: 'carpet',
    name: 'Szőnyeg',
    price: CARPET_PRICE_PER_SQM,
    quantity: 0,
    unit: 'sqm' as const,
  },
};

export const useBookingStore = create<BookingState>((set, get) => ({
  services: initialServices,
  customerDetails: {
    name: '',
    address: '',
    phone: '',
  },
  selectedDate: null,
  currentStep: 1,

  updateServiceQuantity: (serviceId, quantity) => {
    set((state) => ({
      services: {
        ...state.services,
        [serviceId]: {
          ...state.services[serviceId],
          quantity: Math.max(0, quantity),
        },
      },
    }));
  },

  updateCarpetArea: (area) => {
    set((state) => ({
      services: {
        ...state.services,
        carpet: {
          ...state.services.carpet,
          quantity: Math.max(0, area),
        },
      },
    }));
  },

  updateCustomerDetails: (details) => {
    set((state) => ({
      customerDetails: {
        ...state.customerDetails,
        ...details,
      },
    }));
  },

  setSelectedDate: (date) => {
    set({ selectedDate: date });
  },

  setCurrentStep: (step) => {
    set({ currentStep: step });
  },

  resetBooking: () => {
    set({
      services: initialServices,
      customerDetails: {
        name: '',
        address: '',
        phone: '',
      },
      selectedDate: null,
      currentStep: 1,
    });
  },

  getSubtotal: () => {
    const state = get();
    const sofaTotal = state.services.sofa.quantity * state.services.sofa.price;
    const mattressTotal = state.services.mattress.quantity * state.services.mattress.price;
    const carpetTotal = state.services.carpet.quantity * state.services.carpet.price;
    return BASE_FEE + sofaTotal + mattressTotal + carpetTotal;
  },

  getDiscount: () => {
    const state = get();
    const subtotal = state.getSubtotal();
    if (subtotal > BUNDLE_DISCOUNT_THRESHOLD) {
      return subtotal * BUNDLE_DISCOUNT_PERCENTAGE;
    }
    return 0;
  },

  getTotal: () => {
    const state = get();
    return state.getSubtotal() - state.getDiscount();
  },

  hasBundleDiscount: () => {
    const state = get();
    return state.getSubtotal() > BUNDLE_DISCOUNT_THRESHOLD;
  },
}));

