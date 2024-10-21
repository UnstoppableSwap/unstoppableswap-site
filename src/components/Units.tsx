import { Tooltip } from "@mui/material";
import { ReactNode } from "react";
import { piconerosToXmr, satsToBtc } from "../utils";
import BitcoinIcon from "./icons/BitcoinIcon";

type Amount = number | null | undefined;

export function AmountWithUnit({
  amount,
  unit,
  fixedPrecision,
  dollarRate,
}: {
  amount: Amount;
  unit: ReactNode;
  fixedPrecision: number;
  dollarRate?: Amount;
}) {
  return (
    <Tooltip
      arrow
      title={
        dollarRate != null && amount != null
          ? `≈ $${(dollarRate * amount).toFixed(2)}`
          : ""
      }
    >
      <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        {amount != null
          ? Number.parseFloat(amount.toFixed(fixedPrecision))
          : "?"}{" "}
        {unit}
      </span>
    </Tooltip>
  );
}

AmountWithUnit.defaultProps = {
  dollarRate: null,
};

export function BitcoinAmount({ amount }: { amount: Amount }) {
  return (
    <AmountWithUnit amount={amount} unit={<BitcoinIcon />} fixedPrecision={4} />
  );
}

export function MoneroAmount({ amount }: { amount: Amount }) {
  return <AmountWithUnit amount={amount} unit="XMR" fixedPrecision={4} />;
}

export function MoneroBitcoinExchangeRate({ rate }: { rate: Amount }) {
  return <AmountWithUnit amount={rate} unit="BTC/XMR" fixedPrecision={8} />;
}

export function SatsAmount({ amount }: { amount: Amount }) {
  const btcAmount = amount == null ? null : satsToBtc(amount);
  return <BitcoinAmount amount={btcAmount} />;
}

export function PiconeroAmount({ amount }: { amount: Amount }) {
  return (
    <MoneroAmount amount={amount == null ? null : piconerosToXmr(amount)} />
  );
}
