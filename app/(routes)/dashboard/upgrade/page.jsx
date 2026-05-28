"use client";
import React from "react";
import { Check, Crown, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

function UpgradeScreen() {
  const tiers = [
    {
      name: "Free Starter",
      price: "₹0",
      description: "Manage your personal expenses with essential budgeting tools.",
      features: [
        "Create up to 5 Budgets",
        "Log unlimited expenses",
        "Interactive Bar Chart analysis",
        "Real-time over-budget warning alerts",
        "Standard multi-device syncing",
      ],
      isPopular: false,
      buttonText: "Current Plan",
      gradient: "from-slate-100 to-slate-200",
      borderGlow: "hover:border-slate-300",
      icon: Zap,
    },
    {
      name: "Pro Financer",
      price: "₹399",
      period: "/month",
      description: "Take control of your wealth with dynamic breakdowns and smart automation.",
      features: [
        "Create UNLIMITED Budgets",
        "Access Category Doughnut (Pie) Charts",
        "Detailed financial analytics dashboards",
        "Monthly PDF expense report exports",
        "CSV & Excel spreadsheet export capabilities",
        "Ad-free user experience",
      ],
      isPopular: true,
      buttonText: "Upgrade to Pro (Coming Soon)",
      gradient: "from-primary-soft to-primary-lighter/35",
      borderGlow: "hover:border-primary-light/50 hover:shadow-[0_10px_30px_rgba(134,181,80,0.15)]",
      icon: Sparkles,
    },
    {
      name: "Ultimate Elite",
      price: "₹799",
      period: "/month",
      description: "Complete financial command with smart recommendation engines and family sharing.",
      features: [
        "Everything in Pro Tier",
        "Auto-receipt scanning & OCR parsing",
        "AI Budget Recommendation assistant",
        "Shared budgets (Family / Business groups)",
        "Premium 24/7 dedicated support",
      ],
      isPopular: false,
      buttonText: "Join Elite Waiting List",
      gradient: "from-amber-50 to-orange-100/40",
      borderGlow: "hover:border-amber-300/50 hover:shadow-[0_10px_30px_rgba(245,158,11,0.1)]",
      icon: Crown,
    },
  ];

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="text-center">
        <h2 className="font-bold text-4xl text-gray-900">Upgrade Your Plan</h2>
        <p className="text-slate-500 mt-3 text-lg">
          Select a pricing tier that fits your financial goals. Unlock advanced automation and detailed analytics.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier, index) => {
          const Icon = tier.icon;
          return (
            <div
              key={index}
              className={`relative border border-slate-100 bg-white/75 backdrop-blur-md rounded-3xl p-8 flex flex-col justify-between shadow-2xs transition-all duration-500 hover:scale-[1.03] hover:shadow-lg ${tier.borderGlow} overflow-hidden group`}
            >
              {/* Popular Ribbon/Badge */}
              {tier.isPopular && (
                <div className="absolute top-0 right-0 bg-primary text-white font-bold text-xs uppercase px-4 py-1.5 rounded-bl-xl shadow-xs">
                  Most Popular
                </div>
              )}

              {/* Light beam background effect */}
              <div className={`absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br ${tier.isPopular ? "from-primary-light/10" : "from-slate-100/50"} rounded-full blur-xl group-hover:scale-150 transition-all duration-700`} />

              <div>
                {/* Header */}
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-xl bg-gradient-to-br ${tier.isPopular ? "from-primary-light/20 to-primary-lighter/10" : "bg-slate-100"} text-primary group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900">{tier.name}</h3>
                </div>

                {/* Price */}
                <div className="mt-5 flex items-baseline">
                  <span className="text-4xl font-extrabold text-gray-900">{tier.price}</span>
                  {tier.period && (
                    <span className="text-slate-500 text-sm font-medium ml-1">{tier.period}</span>
                  )}
                </div>

                <p className="text-slate-500 text-sm mt-3 leading-relaxed">{tier.description}</p>

                {/* Divider */}
                <div className="my-6 border-b border-slate-100" />

                {/* Features List */}
                <ul className="space-y-3.5">
                  {tier.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <div className={`mt-0.5 rounded-full p-0.5 ${tier.isPopular ? "bg-primary-soft text-primary" : "bg-slate-100 text-slate-500"}`}>
                        <Check className="w-3.5 h-3.5 stroke-[3px]" />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button Action */}
              <div className="mt-8">
                <Button
                  disabled={tier.price !== "₹0"}
                  className={`w-full py-6 rounded-2xl font-bold transition-all duration-300 ${
                    tier.isPopular
                      ? "bg-slate-50 text-slate-400 border border-slate-100 cursor-not-allowed"
                      : tier.price === "₹0"
                      ? "bg-slate-100 text-slate-800 hover:bg-slate-200 cursor-default"
                      : "bg-slate-50 text-slate-400 hover:bg-slate-50 cursor-not-allowed border border-slate-100"
                  }`}
                >
                  {tier.buttonText}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UpgradeScreen;
