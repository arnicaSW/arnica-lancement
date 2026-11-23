/** Icônes Lucide utilisables dans content.ts (seules celles-ci sont incluses au build). */
import {
  BadgePercent,
  Dumbbell,
  Flower2,
  HeartHandshake,
  Map,
  MapPin,
  ShoppingBag,
  Smartphone,
  Ticket,
  UserPlus,
  UtensilsCrossed,
  Wallet,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

export const icons = {
  BadgePercent,
  Dumbbell,
  Flower2,
  HeartHandshake,
  Map,
  MapPin,
  ShoppingBag,
  Smartphone,
  Ticket,
  UserPlus,
  UtensilsCrossed,
  Wallet,
  Wrench,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;
