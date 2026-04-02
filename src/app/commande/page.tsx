"use client";

import { Suspense } from 'react';
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cartStore";
import { Mail, Phone, MapPin, Edit3, User, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';
import CommandeContent from './CommandeContent';

interface FormData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  codePostal: string;
  ville: string;
  pays: string;
  personnalisation: string;
}

export default function CommandePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513] mx-auto mb-4"></div>
          <p className="text-[#2C2C2C]">Chargement...</p>
        </div>
      </div>
    }>
      <CommandeContent />
    </Suspense>
  );
}
