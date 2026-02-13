import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CurrencyDollar, CurrencyEur } from "@phosphor-icons/react";

export type Currency = "HUF" | "USD" | "EUR";

interface CurrencySelectorProps {
  value?: Currency;
  onChange?: (currency: Currency) => void;
  className?: string;
}

const currencies: { value: Currency; label: string; symbol: string; flag: string }[] = [
  { value: "HUF", label: "Hungarian Forint", symbol: "Ft", flag: "🇭🇺" },
  { value: "USD", label: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { value: "EUR", label: "Euro", symbol: "€", flag: "🇪🇺" },
];

export function CurrencySelector({ value = "HUF", onChange, className }: CurrencySelectorProps) {
  const [selected, setSelected] = useState<Currency>(value);

  const handleChange = (newValue: Currency) => {
    setSelected(newValue);
    onChange?.(newValue);
  };

  const selectedCurrency = currencies.find((c) => c.value === selected);

  return (
    <Select value={selected} onValueChange={handleChange}>
      <SelectTrigger className={className}>
        <SelectValue>
          <div className="flex items-center gap-2">
            <span>{selectedCurrency?.flag}</span>
            <span className="font-medium">{selectedCurrency?.value}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem key={currency.value} value={currency.value}>
            <div className="flex items-center gap-3 py-1">
              <span className="text-xl">{currency.flag}</span>
              <div className="flex flex-col">
                <span className="font-medium">{currency.value}</span>
                <span className="text-xs text-muted-foreground">{currency.label}</span>
              </div>
              <span className="ml-auto text-muted-foreground">{currency.symbol}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// Currency conversion rates (simplified - in production, fetch from API)
const conversionRates: Record<Currency, Record<Currency, number>> = {
  HUF: { HUF: 1, USD: 0.0028, EUR: 0.0026 },
  USD: { HUF: 357, USD: 1, EUR: 0.92 },
  EUR: { HUF: 388, USD: 1.09, EUR: 1 },
};

/**
 * Convert amount from one currency to another
 */
export function convertCurrency(
  amount: number,
  from: Currency,
  to: Currency
): number {
  if (from === to) return amount;
  return Math.round(amount * conversionRates[from][to]);
}

/**
 * Format currency with symbol
 */
export function formatCurrency(
  amount: number,
  currency: Currency,
  compact: boolean = false
): string {
  const currencyInfo = currencies.find((c) => c.value === currency);
  if (!currencyInfo) return amount.toString();

  const formatted = compact && amount >= 1000
    ? `${(amount / 1000).toFixed(1)}K`
    : amount.toLocaleString();

  if (currency === "HUF") {
    return `${formatted} ${currencyInfo.symbol}`;
  }
  return `${currencyInfo.symbol}${formatted}`;
}
