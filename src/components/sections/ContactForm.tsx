"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Send,
  Upload,
  X,
  Loader2,
  ChevronRight,
  ChevronLeft,
  FileText,
  Image as ImageIcon,
  Check,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const SERVICE_TYPES = [
  { value: "kuechenmontage", label: "Küchenmontage" },
  { value: "moebelmontage", label: "Möbelmontage" },
  { value: "lieferung", label: "Lieferung / Transport" },
  { value: "lieferung-montage", label: "Lieferung + Montage" },
  { value: "sonstiges", label: "Sonstiges" },
];

const ANREDE_OPTIONS = [
  { value: "herr", label: "Herr" },
  { value: "frau", label: "Frau" },
  { value: "divers", label: "Divers" },
  { value: "keine", label: "Keine Angabe" },
];

// TIMING OPTIONS
const URGENCY_OPTIONS = [
  { value: "express", label: "Dringend (Express)" },
  { value: "normal", label: "Normal" },
  { value: "flexibel", label: "Flexibel" },
];

const TIMEFRAME_OPTIONS = [
  { value: "diese-woche", label: "Diese Woche" },
  { value: "naechste-woche", label: "Nächste Woche" },
  { value: "2-wochen", label: "In 2 Wochen" },
  { value: "monat", label: "Innerhalb eines Monats" },
  { value: "spaeter", label: "Später / Flexibel" },
];

const TIME_OF_DAY_OPTIONS = [
  { value: "vormittags", label: "Vormittags" },
  { value: "nachmittags", label: "Nachmittags" },
  { value: "flexibel", label: "Flexibel" },
];

// KITCHEN OPTIONS
const KITCHEN_BRANDS = [
  { value: "ikea", label: "IKEA" },
  { value: "nobilia", label: "Nobilia" },
  { value: "nolte", label: "Nolte" },
  { value: "haecker", label: "Häcker" },
  { value: "schueller", label: "Schüller" },
  { value: "ballerina", label: "Ballerina" },
  { value: "alno", label: "ALNO" },
  { value: "bulthaup", label: "bulthaup" },
  { value: "poggenpohl", label: "Poggenpohl" },
  { value: "siematic", label: "SieMatic" },
  { value: "leicht", label: "LEICHT" },
  { value: "burger", label: "Burger Küchen" },
  { value: "express", label: "Express Küchen" },
  { value: "andere", label: "Andere Marke" },
];

const KITCHEN_SHAPES = [
  { value: "i-form", label: "I-Form (Küchenzeile)" },
  { value: "l-form", label: "L-Form (Eckküche)" },
  { value: "u-form", label: "U-Form" },
  { value: "g-form", label: "G-Form" },
  { value: "insel", label: "Kochinsel" },
  { value: "zweizeilig", label: "Zweizeilig" },
  { value: "andere", label: "Andere Form" },
  { value: "weiss-nicht", label: "Weiß ich nicht" },
];

const CABINET_COUNT = [
  { value: "1-5", label: "1-5 Schränke" },
  { value: "6-10", label: "6-10 Schränke" },
  { value: "11-15", label: "11-15 Schränke" },
  { value: "16-20", label: "16-20 Schränke" },
  { value: "20+", label: "Mehr als 20" },
  { value: "weiss-nicht", label: "Weiß ich nicht" },
];

const APPLIANCES_OPTIONS = [
  { value: "herd", label: "Herd / Kochfeld" },
  { value: "backofen", label: "Backofen" },
  { value: "spuelmaschine", label: "Spülmaschine" },
  { value: "kuehlschrank", label: "Kühlschrank" },
  { value: "dunstabzug", label: "Dunstabzugshaube" },
  { value: "mikrowelle", label: "Mikrowelle" },
];

// NEW KITCHEN OPTIONS
const OLD_KITCHEN_ACTION_OPTIONS = [
  { value: "entsorgen", label: "Entsorgen (wir nehmen sie mit)" },
  { value: "behalten", label: "Demontieren & Behalten" },
];

const COUNTERTOP_TYPE_OPTIONS = [
  { value: "normal", label: "Normal (Holz/Laminat)" },
  { value: "stein", label: "Stein (Granit/Quarz/Keramik)" },
];

const KITCHEN_CONDITION_OPTIONS = [
  { value: "zerlegt", label: "Zerlegt (in Paketen)" },
  { value: "fertig", label: "Fertig montiert / Einzelteile" },
];

// FURNITURE OPTIONS
const FURNITURE_TYPES = [
  { value: "pax", label: "PAX Schrank" },
  { value: "bett", label: "Bett" },
  { value: "regal", label: "Regal (KALLAX, BILLY...)" },
  { value: "schreibtisch", label: "Schreibtisch" },
  { value: "kommode", label: "Kommode" },
  { value: "sofa", label: "Sofa / Couch" },
  { value: "esstisch", label: "Esstisch & Stühle" },
  { value: "kinderzimmer", label: "Kinderzimmer Möbel" },
  { value: "buero", label: "Büromöbel" },
  { value: "andere", label: "Andere Möbel" },
];

const FURNITURE_BRANDS = [
  { value: "ikea", label: "IKEA" },
  { value: "hoeffner", label: "Höffner" },
  { value: "xxxlutz", label: "XXXLutz" },
  { value: "poco", label: "POCO" },
  { value: "roller", label: "Roller" },
  { value: "segmueller", label: "Segmüller" },
  { value: "andere", label: "Andere" },
];

const ITEM_COUNT = [
  { value: "1", label: "1 Stück" },
  { value: "2", label: "2 Stück" },
  { value: "3", label: "3 Stück" },
  { value: "4", label: "4 Stück" },
  { value: "5+", label: "5 oder mehr" },
];

// DELIVERY OPTIONS
const PICKUP_LOCATIONS = [
  { value: "ikea", label: "IKEA" },
  { value: "hoeffner", label: "Höffner" },
  { value: "xxxlutz", label: "XXXLutz" },
  { value: "poco", label: "POCO" },
  { value: "roller", label: "Roller" },
  { value: "segmueller", label: "Segmüller" },
  { value: "privat", label: "Privatadresse" },
  { value: "andere", label: "Anderer Ort" },
];

const FLOOR_OPTIONS = [
  { value: "eg", label: "Erdgeschoss" },
  { value: "1", label: "1. Stock" },
  { value: "2", label: "2. Stock" },
  { value: "3", label: "3. Stock" },
  { value: "4", label: "4. Stock" },
  { value: "5+", label: "5. Stock oder höher" },
];

const ITEM_SIZE_OPTIONS = [
  { value: "klein", label: "Klein (Regal, Stuhl)" },
  { value: "mittel", label: "Mittel (Kommode, Tisch)" },
  { value: "gross", label: "Groß (Schrank, Sofa)" },
  { value: "sehr-gross", label: "Sehr groß (Küche, PAX)" },
];

// ACCESS OPTIONS (affects pricing)
const PARKING_OPTIONS = [
  { value: "direkt", label: "Direkt vor der Tür" },
  { value: "nah", label: "In der Nähe (< 50m)" },
  { value: "weit", label: "Weiter entfernt (> 50m)" },
  { value: "schwierig", label: "Schwierige Parksituation" },
];

const ACCESS_OPTIONS = [
  { value: "eg-mit-aufzug", label: "Erdgeschoss (Straßenzugang)" },
  { value: "eg-ohne-aufzug", label: "Erdgeschoss (kein Aufzug)" },
  { value: "1-mit-aufzug", label: "1. Etage (mit Aufzug)" },
  { value: "1-ohne-aufzug", label: "1. Etage (ohne Aufzug)" },
  { value: "2-mit-aufzug", label: "2. Etage (mit Aufzug)" },
  { value: "2-ohne-aufzug", label: "2. Etage (ohne Aufzug)" },
  { value: "3-mit-aufzug", label: "3. Etage (mit Aufzug)" },
  { value: "3-ohne-aufzug", label: "3. Etage (ohne Aufzug)" },
  { value: "4-mit-aufzug", label: "4. Etage (mit Aufzug)" },
  { value: "4-ohne-aufzug", label: "4. Etage (ohne Aufzug)" },
  { value: "5-mit-aufzug", label: "5. Etage (mit Aufzug)" },
  { value: "5-ohne-aufzug", label: "5. Etage (ohne Aufzug)" },
  { value: "6-mit-aufzug", label: "6. Etage (mit Aufzug)" },
  { value: "6-ohne-aufzug", label: "6. Etage (ohne Aufzug)" },
  { value: "7-mit-aufzug", label: "7. Etage (mit Aufzug)" },
  { value: "7-ohne-aufzug", label: "7. Etage (ohne Aufzug)" },
  { value: "sonstige", label: "Sonstige" },
];

// Pickup location options for kitchen
const KITCHEN_PICKUP_LOCATIONS = [
  { value: "ikea", label: "IKEA" },
  { value: "hoeffner", label: "Höffner" },
  { value: "xxxlutz", label: "XXXLutz" },
  { value: "poco", label: "POCO" },
  { value: "roller", label: "Roller" },
  { value: "segmueller", label: "Segmüller" },
  { value: "keller-kuechenwelt", label: "KELLER Küchenwelt" },
  { value: "andere", label: "Anderes Geschäft" },
];

const YES_NO_OPTIONS = [
  { value: "ja", label: "Ja" },
  { value: "nein", label: "Nein" },
];

const YES_NO_UNKNOWN_OPTIONS = [
  { value: "ja", label: "Ja" },
  { value: "nein", label: "Nein" },
  { value: "weiss-nicht", label: "Weiß nicht" },
];

interface FormData {
  service: string;
  // Timing
  urgency: string;
  timeframe: string;
  timeOfDay: string;
  // Kitchen specific - Basic
  brand: string;
  kitchenShape: string;
  cabinetCount: string;
  appliances: string[];
  // Kitchen specific - Old Kitchen
  hasOldKitchen: string;
  oldKitchenAction: string;
  // Kitchen specific - Special Features
  hasWaterSystem: string;
  hasMuldenluefter: string;
  // Kitchen specific - Location & Condition
  kitchenAtCustomer: string;
  needsPickup: string;
  pickupLocationName: string; // Where to pickup the kitchen from
  countertopType: string;
  kitchenCondition: string;
  // Kitchen specific - Connections
  needsWater: string;
  needsElectric: string;
  needsCountertop: string;
  // Furniture specific
  furnitureType: string;
  furnitureBrand: string;
  itemCount: string;
  // Delivery specific
  pickupLocation: string;
  floor: string;
  hasElevator: string;
  itemSize: string;
  // Access & Logistics (affects pricing)
  parking: string;
  accessDifficulty: string;
  // Common
  message: string;
  // Personal
  anrede: string;
  name: string;
  phone: string;
  email: string;
  city: string;
}

interface FileWithPreview extends File {
  preview?: string;
  id: string;
}

interface FormErrors {
  [key: string]: string;
}

interface SelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  error?: string;
}

function CustomSelect({ id, value, onChange, options, placeholder, error }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div ref={selectRef} className="relative">
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all duration-200
          ${error ? "border-red-500 bg-red-50 dark:bg-red-950/20" : "border-[#E8E0E0] dark:border-[#2A2F3A] bg-white dark:bg-[#151821]"}
          ${isOpen ? "ring-2 ring-primary/20" : ""}
          text-[#1F2430] dark:text-white hover:border-primary/50`}
      >
        <span className={selectedOption ? "" : "text-[#9CA3AF]"}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown className={`w-5 h-5 text-[#9CA3AF] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 py-2 bg-white dark:bg-[#1B1F2A] border border-[#E8E0E0] dark:border-[#232837] rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => { onChange(option.value); setIsOpen(false); }}
              className={`w-full px-4 py-2.5 text-left hover:bg-[#F5F5F5] dark:hover:bg-[#232837] transition-colors
                ${value === option.value ? "text-primary font-medium bg-primary/5" : "text-[#1F2430] dark:text-white"}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Radio Button Group Component
function RadioGroup({ options, value, onChange, name, columns = "auto" }: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  name: string;
  columns?: "auto" | 2 | 3;
}) {
  const gridClass = columns === 2 ? "grid grid-cols-2 gap-2" : columns === 3 ? "grid grid-cols-3 gap-2" : "flex flex-wrap gap-2";

  return (
    <div className={gridClass}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all
            ${value === option.value
              ? "bg-primary text-white border-primary"
              : "bg-white dark:bg-[#151821] border-[#E8E0E0] dark:border-[#2A2F3A] text-[#1F2430] dark:text-white hover:border-primary/50"
            }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

// Checkbox Group Component for multiple selections
function CheckboxGroup({
  options,
  values,
  onChange,
  name
}: {
  options: { value: string; label: string }[];
  values: string[];
  onChange: (values: string[]) => void;
  name: string;
}) {
  const toggleValue = (value: string) => {
    if (values.includes(value)) {
      onChange(values.filter(v => v !== value));
    } else {
      onChange([...values, value]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => toggleValue(option.value)}
          className={`px-3 py-1.5 rounded-lg border text-sm transition-all flex items-center gap-1.5
            ${values.includes(option.value)
              ? "bg-primary/10 text-primary border-primary"
              : "bg-white dark:bg-[#151821] border-[#E8E0E0] dark:border-[#2A2F3A] text-[#1F2430] dark:text-white hover:border-primary/50"
            }`}
        >
          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all
            ${values.includes(option.value) ? "bg-primary border-primary" : "border-[#E8E0E0] dark:border-[#2A2F3A]"}`}>
            {values.includes(option.value) && <Check className="w-3 h-3 text-white" />}
          </div>
          {option.label}
        </button>
      ))}
    </div>
  );
}

// Collapsible Section Component for better organization
function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
  icon,
  color = "primary"
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
  color?: "primary" | "blue" | "amber" | "green";
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const colorClasses = {
    primary: "bg-[#FDF8F8] dark:bg-[#1a1520] border-primary/10 text-primary",
    blue: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/30 text-blue-700 dark:text-blue-400",
    amber: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/30 text-amber-700 dark:text-amber-400",
    green: "bg-[#F0FDF4] dark:bg-[#0f1a15] border-green-200 dark:border-green-900/30 text-green-700 dark:text-green-400",
  };

  return (
    <div className={`rounded-xl border ${colorClasses[color]} overflow-hidden`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium">{title}</span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="px-4 pb-4 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
}

export function ContactForm({ variant = "default" }: { variant?: "default" | "minimal" }) {
  const router = useRouter();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const planInputRef = useRef<HTMLInputElement>(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [images, setImages] = useState<FileWithPreview[]>([]);
  const [planFiles, setPlanFiles] = useState<FileWithPreview[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isCompressing, setIsCompressing] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    service: "",
    urgency: "",
    timeframe: "",
    timeOfDay: "",
    brand: "",
    kitchenShape: "",
    cabinetCount: "",
    appliances: [],
    // Old Kitchen
    hasOldKitchen: "",
    oldKitchenAction: "",
    // Special Features
    hasWaterSystem: "",
    hasMuldenluefter: "",
    // Location & Condition
    kitchenAtCustomer: "",
    needsPickup: "",
    pickupLocationName: "",
    countertopType: "",
    kitchenCondition: "",
    // Connections
    needsWater: "",
    needsElectric: "",
    needsCountertop: "",
    // Furniture
    furnitureType: "",
    furnitureBrand: "",
    itemCount: "",
    // Delivery
    pickupLocation: "",
    floor: "",
    hasElevator: "",
    itemSize: "",
    // Access
    parking: "",
    accessDifficulty: "",
    message: "",
    anrede: "",
    name: "",
    phone: "",
    email: "",
    city: "",
  });

  const isKitchenService = formData.service === "kuechenmontage";
  const isFurnitureService = formData.service === "moebelmontage";
  const isDeliveryService = formData.service === "lieferung" || formData.service === "lieferung-montage";
  const isDeliveryWithAssembly = formData.service === "lieferung-montage";
  const needsAccessInfo = formData.service && formData.service !== "sonstiges";

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const scrollToError = useCallback((fieldName: string) => {
    const element = document.getElementById(fieldName);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      element.classList.add("ring-2", "ring-red-500", "ring-offset-2");
      setTimeout(() => {
        element.classList.remove("ring-2", "ring-red-500", "ring-offset-2");
      }, 3000);
    }
  }, []);

  const clearError = (fieldName: string) => {
    if (errors[fieldName]) {
      setErrors((prev) => { const n = { ...prev }; delete n[fieldName]; return n; });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearError(name);

    // Reset service-specific fields when service changes
    if (name === "service") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        brand: "", kitchenShape: "", cabinetCount: "", needsWater: "", needsElectric: "", needsCountertop: "",
        appliances: [],
        hasOldKitchen: "", oldKitchenAction: "",
        hasWaterSystem: "", hasMuldenluefter: "",
        kitchenAtCustomer: "", needsPickup: "",
        countertopType: "", kitchenCondition: "",
        furnitureType: "", furnitureBrand: "", itemCount: "",
        pickupLocation: "", floor: "", hasElevator: "", itemSize: "",
        parking: "", accessDifficulty: ""
      }));
    }

    // Reset conditional fields
    if (name === "hasOldKitchen" && value === "nein") {
      setFormData((prev) => ({ ...prev, oldKitchenAction: "" }));
    }
    if (name === "kitchenAtCustomer" && value === "ja") {
      setFormData((prev) => ({ ...prev, needsPickup: "" }));
    }
  };

  const handleAppliancesChange = (values: string[]) => {
    setFormData((prev) => ({ ...prev, appliances: values }));
  };

  const compressImage = async (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let { width, height } = img;
          const maxSize = 1200;
          if (width > maxSize || height > maxSize) {
            if (width > height) { height = (height / width) * maxSize; width = maxSize; }
            else { width = (width / height) * maxSize; height = maxSize; }
          }
          canvas.width = width;
          canvas.height = height;
          canvas.getContext("2d")?.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => {
            if (blob) resolve(new File([blob], file.name, { type: "image/jpeg", lastModified: Date.now() }));
            else resolve(file);
          }, "image/jpeg", 0.7);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (images.length + selectedFiles.length > 5) {
      setErrors((prev) => ({ ...prev, images: "Maximal 5 Bilder erlaubt" }));
      return;
    }
    setIsCompressing(true);
    clearError("images");
    const processed: FileWithPreview[] = [];
    for (const file of selectedFiles) {
      if (!file.type.startsWith("image/")) continue;
      const compressed = await compressImage(file);
      const f = compressed as FileWithPreview;
      f.preview = URL.createObjectURL(compressed);
      f.id = generateId();
      processed.push(f);
    }
    setImages((prev) => [...prev, ...processed]);
    setIsCompressing(false);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const handlePlanSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (planFiles.length + selectedFiles.length > 3) {
      setErrors((prev) => ({ ...prev, plans: "Maximal 3 Dateien erlaubt" }));
      return;
    }
    clearError("plans");
    const processed: FileWithPreview[] = selectedFiles.map((file) => {
      const f = file as FileWithPreview;
      f.id = generateId();
      if (file.type.startsWith("image/")) f.preview = URL.createObjectURL(file);
      return f;
    });
    setPlanFiles((prev) => [...prev, ...processed]);
    if (planInputRef.current) planInputRef.current.value = "";
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file?.preview) URL.revokeObjectURL(file.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  const removePlanFile = (id: string) => {
    setPlanFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file?.preview) URL.revokeObjectURL(file.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.service) newErrors.service = "Bitte wählen Sie eine Dienstleistung aus";

    // Timing validation - required for all services except "sonstiges"
    if (formData.service && formData.service !== "sonstiges") {
      if (!formData.urgency) newErrors.urgency = "Bitte wählen Sie die Dringlichkeit";
      if (!formData.timeframe) newErrors.timeframe = "Bitte wählen Sie einen Zeitraum";
    }

    // Kitchen validation
    if (isKitchenService) {
      if (!formData.brand) newErrors.brand = "Bitte wählen Sie eine Marke aus";
      if (!formData.kitchenShape) newErrors.kitchenShape = "Bitte wählen Sie eine Küchenform aus";
      if (!formData.cabinetCount) newErrors.cabinetCount = "Bitte wählen Sie die Anzahl der Schränke";
      if (!formData.kitchenAtCustomer) newErrors.kitchenAtCustomer = "Bitte angeben ob die Küche vor Ort ist";
      if (formData.kitchenAtCustomer === "nein" && !formData.needsPickup) {
        newErrors.needsPickup = "Bitte angeben ob Abholung benötigt wird";
      }
      if (formData.needsPickup === "ja" && !formData.pickupLocationName) {
        newErrors.pickupLocationName = "Bitte geben Sie den Abholort ein";
      }
      if (!formData.hasOldKitchen) newErrors.hasOldKitchen = "Bitte angeben ob alte Küche vorhanden";
      if (formData.hasOldKitchen === "ja" && !formData.oldKitchenAction) {
        newErrors.oldKitchenAction = "Bitte wählen Sie was mit der alten Küche passieren soll";
      }
    }

    // Furniture validation
    if (isFurnitureService || isDeliveryWithAssembly) {
      if (!formData.furnitureType) newErrors.furnitureType = "Bitte wählen Sie einen Möbeltyp aus";
      if (!formData.itemCount) newErrors.itemCount = "Bitte wählen Sie die Anzahl";
    }

    // Delivery validation
    if (isDeliveryService) {
      if (!formData.pickupLocation) newErrors.pickupLocation = "Bitte wählen Sie den Abholort aus";
      if (!formData.itemSize) newErrors.itemSize = "Bitte wählen Sie die Größe";
    }

    // Access validation - required for all services except "sonstiges"
    if (formData.service && formData.service !== "sonstiges") {
      if (!formData.accessDifficulty) newErrors.accessDifficulty = "Bitte wählen Sie den Zugang zur Wohnung";
    }

    if (!formData.message.trim()) newErrors.message = "Bitte beschreiben Sie Ihr Projekt";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) { scrollToError(Object.keys(newErrors)[0]); return false; }
    return true;
  };

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.anrede) newErrors.anrede = "Bitte wählen Sie eine Anrede";
    if (!formData.name.trim()) newErrors.name = "Bitte geben Sie Ihren Namen ein";
    if (!formData.phone.trim()) newErrors.phone = "Bitte geben Sie Ihre Telefonnummer ein";
    else if (!/^[\d\s+\-()]{8,}$/.test(formData.phone)) newErrors.phone = "Ungültige Telefonnummer";
    if (!formData.email.trim()) newErrors.email = "Bitte geben Sie Ihre E-Mail-Adresse ein";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Ungültige E-Mail-Adresse";
    if (!formData.city.trim()) newErrors.city = "Bitte geben Sie Ihre Stadt ein";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) { scrollToError(Object.keys(newErrors)[0]); return false; }
    return true;
  };

  const handleNextStep = (e?: React.MouseEvent) => {
    // Prevent any default behavior that might cause scroll
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (validateStep1()) {
      // Store current scroll position before state change
      const formElement = document.getElementById("kontakt-form");
      const formTop = formElement?.getBoundingClientRect().top ?? 0;
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      const targetScrollPosition = currentScroll + formTop - 120;

      setCurrentStep(2);

      // Immediately set scroll position to prevent jump
      requestAnimationFrame(() => {
        window.scrollTo({
          top: Math.max(0, targetScrollPosition),
          behavior: "instant"
        });
      });
    }
  };

  const handlePrevStep = (e?: React.MouseEvent) => {
    // Prevent any default behavior
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Store current scroll position before state change
    const formElement = document.getElementById("kontakt-form");
    const formTop = formElement?.getBoundingClientRect().top ?? 0;
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const targetScrollPosition = currentScroll + formTop - 120;

    setCurrentStep(1);
    setErrors({});

    // Immediately set scroll position to prevent jump
    requestAnimationFrame(() => {
      window.scrollTo({
        top: Math.max(0, targetScrollPosition),
        behavior: "instant"
      });
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validateStep2()) return;
    setIsSubmitting(true);
    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        if (Array.isArray(v)) {
          submitData.append(k, v.join(", "));
        } else {
          submitData.append(k, v);
        }
      });
      images.forEach((img, i) => submitData.append(`image_${i}`, img));
      planFiles.forEach((f, i) => submitData.append(`plan_${i}`, f));

      // Send form data to API
      const response = await fetch("/api/contact", {
        method: "POST",
        body: submitData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Fehler beim Senden der Anfrage");
      }

      // Track form submission events using global trackEvent
      // @ts-expect-error - trackEvent is added by layout.tsx script
      if (typeof window !== "undefined" && typeof window.trackEvent === "function") {
        // @ts-expect-error - trackEvent is added by layout.tsx script
        const trackEvent = window.trackEvent;

        // 1. form_submit event
        trackEvent("form_submit", {
          event_category: "Form",
          event_label: "Contact Form",
          form_name: "contact_form",
          service: formData.service || "unknown",
          city: formData.city || "unknown",
        });

        // 2. generate_lead event (value: 100 EUR)
        trackEvent("generate_lead", {
          event_category: "Lead",
          event_label: "Form Submission",
          value: 100,
          currency: "EUR",
          lead_source: "contact_form",
          service_type: formData.service || "unknown",
          city: formData.city || "unknown",
        });

        // 3. conversion event for Google Ads
        trackEvent("conversion", {
          send_to: "G-N15LLLP7VV",
          event_category: "Conversion",
          event_label: "Lead Form Submitted",
          value: 100,
          currency: "EUR",
        });

        console.log("📝 Form submission tracked:", formData.service, formData.city);
      }

      // Set flag for thank-you page access validation
      sessionStorage.setItem("formSubmitted", "true");

      router.push("/thank-you");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unbekannter Fehler. Bitte kontaktieren Sie uns telefonisch.");
      setTimeout(() => document.getElementById("submit-error")?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    return () => {
      images.forEach((f) => f.preview && URL.revokeObjectURL(f.preview));
      planFiles.forEach((f) => f.preview && URL.revokeObjectURL(f.preview));
    };
  }, [images, planFiles]);

  // Listen for service selection from ServicesSection
  useEffect(() => {
    const handleServiceSelected = (event: CustomEvent<{ service: string }>) => {
      const serviceMap: { [key: string]: string } = {
        'kuechenmontage': 'kuechenmontage',
        'moebelmontage': 'moebelmontage',
        'lieferungen': 'lieferung',
      };
      const mappedService = serviceMap[event.detail.service] || event.detail.service;
      handleSelectChange('service', mappedService);
    };

    // Check sessionStorage for pre-selected service
    const storedService = sessionStorage.getItem('selectedService');
    if (storedService) {
      const serviceMap: { [key: string]: string } = {
        'kuechenmontage': 'kuechenmontage',
        'moebelmontage': 'moebelmontage',
        'lieferungen': 'lieferung',
      };
      const mappedService = serviceMap[storedService] || storedService;
      handleSelectChange('service', mappedService);
      sessionStorage.removeItem('selectedService');
    }

    window.addEventListener('serviceSelected', handleServiceSelected as EventListener);
    return () => {
      window.removeEventListener('serviceSelected', handleServiceSelected as EventListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="kontakt-form" className={variant === "minimal" ? "" : "section-padding section-gradient dark:bg-[#151821]"}>
      <div className={variant === "minimal" ? "" : "container-max relative z-10"}>
        {variant !== "minimal" && (
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-[#1F2430] dark:text-white">Kostenloses Angebot anfordern</h2>
            <p className="text-[#5F6673] dark:text-[#AAB0BC] max-w-2xl mx-auto">In nur 2 Schritten zum verbindlichen Festpreis-Angebot</p>
          </div>
        )}

        <div className={variant === "minimal" ? "" : "max-w-xl mx-auto"}>
          {/* Progress */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${currentStep >= 1 ? "bg-primary text-white" : "bg-[#E8E0E0] dark:bg-[#2A2F3A] text-[#9CA3AF]"}`}>
                {currentStep > 1 ? <Check className="w-5 h-5" /> : "1"}
              </div>
              <span className={`text-sm font-medium hidden sm:inline ${currentStep >= 1 ? "text-[#1F2430] dark:text-white" : "text-[#9CA3AF]"}`}>Projekt</span>
            </div>
            <div className={`w-12 h-1 rounded-full transition-all ${currentStep >= 2 ? "bg-primary" : "bg-[#E8E0E0] dark:bg-[#2A2F3A]"}`} />
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${currentStep >= 2 ? "bg-primary text-white" : "bg-[#E8E0E0] dark:bg-[#2A2F3A] text-[#9CA3AF]"}`}>2</div>
              <span className={`text-sm font-medium hidden sm:inline ${currentStep >= 2 ? "text-[#1F2430] dark:text-white" : "text-[#9CA3AF]"}`}>Kontakt</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1B1F2A] border border-[#F1E7E7] dark:border-[#232837] rounded-2xl p-6 md:p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              {submitError && (
                <div id="submit-error" className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-800 dark:text-red-200">Fehler beim Senden</p>
                    <p className="text-sm text-red-600 dark:text-red-300 mt-1">{submitError}</p>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-5">
                  {/* Service Type */}
                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-[#1F2430] dark:text-white font-medium">Art der Dienstleistung *</Label>
                    <CustomSelect id="service" value={formData.service} onChange={(v) => handleSelectChange("service", v)} options={SERVICE_TYPES} placeholder="Bitte wählen..." error={errors.service} />
                    {errors.service && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.service}</p>}
                  </div>

                  {/* TIMING SECTION - Shows for all services */}
                  {formData.service && formData.service !== "sonstiges" && (
                    <div className="space-y-4 p-4 bg-[#F0FDF4] dark:bg-[#0f1a15] rounded-xl border border-green-200 dark:border-green-900/30">
                      <p className="text-sm font-medium text-green-700 dark:text-green-400">Wann soll es losgehen?</p>

                      <div className="space-y-2">
                        <Label className="text-[#1F2430] dark:text-white font-medium text-sm">Wie dringend?</Label>
                        <RadioGroup options={URGENCY_OPTIONS} value={formData.urgency} onChange={(v) => handleSelectChange("urgency", v)} name="urgency" />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[#1F2430] dark:text-white font-medium text-sm">Gewünschter Zeitraum</Label>
                        <CustomSelect id="timeframe" value={formData.timeframe} onChange={(v) => handleSelectChange("timeframe", v)} options={TIMEFRAME_OPTIONS} placeholder="Auswählen..." />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[#1F2430] dark:text-white font-medium text-sm">Bevorzugte Tageszeit</Label>
                        <RadioGroup options={TIME_OF_DAY_OPTIONS} value={formData.timeOfDay} onChange={(v) => handleSelectChange("timeOfDay", v)} name="timeOfDay" />
                      </div>
                    </div>
                  )}

                  {/* KITCHEN SPECIFIC FIELDS */}
                  {isKitchenService && (
                    <>
                      {/* Basic Kitchen Info */}
                      <div className="space-y-4 p-4 bg-[#FDF8F8] dark:bg-[#1a1520] rounded-xl border border-primary/10">
                        <p className="text-sm font-medium text-primary">Küchen-Grunddaten</p>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label htmlFor="brand" className="text-[#1F2430] dark:text-white font-medium text-sm">Marke *</Label>
                            <CustomSelect id="brand" value={formData.brand} onChange={(v) => handleSelectChange("brand", v)} options={KITCHEN_BRANDS} placeholder="Auswählen..." error={errors.brand} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="kitchenShape" className="text-[#1F2430] dark:text-white font-medium text-sm">Form *</Label>
                            <CustomSelect id="kitchenShape" value={formData.kitchenShape} onChange={(v) => handleSelectChange("kitchenShape", v)} options={KITCHEN_SHAPES} placeholder="Auswählen..." error={errors.kitchenShape} />
                          </div>
                        </div>
                        {(errors.brand || errors.kitchenShape) && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />Bitte alle Pflichtfelder ausfüllen</p>}

                        <div className="space-y-2">
                          <Label className="text-[#1F2430] dark:text-white font-medium text-sm">Anzahl Schränke (ca.)</Label>
                          <CustomSelect id="cabinetCount" value={formData.cabinetCount} onChange={(v) => handleSelectChange("cabinetCount", v)} options={CABINET_COUNT} placeholder="Auswählen..." />
                        </div>
                      </div>

                      {/* Kitchen Status & Location */}
                      <div className="space-y-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-900/30">
                        <p className="text-sm font-medium text-blue-700 dark:text-blue-400">Küchenstatus & Standort</p>

                        {/* Is kitchen at customer location? */}
                        <div className="space-y-2">
                          <Label className="text-[#1F2430] dark:text-white font-medium text-sm">Ist die neue Küche bereits bei Ihnen vor Ort?</Label>
                          <RadioGroup options={YES_NO_OPTIONS} value={formData.kitchenAtCustomer} onChange={(v) => handleSelectChange("kitchenAtCustomer", v)} name="kitchenAtCustomer" columns={2} />
                        </div>

                        {/* Conditional: Needs pickup */}
                        {formData.kitchenAtCustomer === "nein" && (
                          <div className="space-y-3 pl-4 border-l-2 border-blue-300 dark:border-blue-700">
                            <div className="space-y-2">
                              <Label className="text-[#1F2430] dark:text-white font-medium text-sm">Sollen wir die Küche abholen/liefern?</Label>
                              <RadioGroup options={YES_NO_OPTIONS} value={formData.needsPickup} onChange={(v) => handleSelectChange("needsPickup", v)} name="needsPickup" columns={2} />
                            </div>

                            {/* Pickup location - shows when needsPickup is "ja" */}
                            {formData.needsPickup === "ja" && (
                              <div className="space-y-2 mt-3 p-3 bg-blue-100/50 dark:bg-blue-900/20 rounded-lg">
                                <Label htmlFor="pickupAddress" className="text-[#1F2430] dark:text-white font-medium text-sm">
                                  Abholadresse eingeben *
                                </Label>
                                <Input
                                  id="pickupAddress"
                                  type="text"
                                  value={formData.pickupLocationName}
                                  onChange={(e) => handleSelectChange("pickupLocationName", e.target.value)}
                                  placeholder="z.B. IKEA Nürnberg, Musterstraße 123..."
                                  className={`bg-white dark:bg-[#1B1F2A] border-[#E8E0E0] dark:border-[#2A2F3A] ${errors.pickupLocationName ? 'border-red-500' : ''}`}
                                />
                                {errors.pickupLocationName && (
                                  <p className="text-sm text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />{errors.pickupLocationName}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Kitchen condition */}
                        <div className="space-y-2">
                          <Label className="text-[#1F2430] dark:text-white font-medium text-sm">In welchem Zustand ist die neue Küche?</Label>
                          <RadioGroup options={KITCHEN_CONDITION_OPTIONS} value={formData.kitchenCondition} onChange={(v) => handleSelectChange("kitchenCondition", v)} name="kitchenCondition" columns={2} />
                        </div>

                        {/* Countertop type */}
                        <div className="space-y-2">
                          <Label className="text-[#1F2430] dark:text-white font-medium text-sm">Arbeitsplatten-Typ</Label>
                          <RadioGroup options={COUNTERTOP_TYPE_OPTIONS} value={formData.countertopType} onChange={(v) => handleSelectChange("countertopType", v)} name="countertopType" columns={2} />
                        </div>
                      </div>

                      {/* Old Kitchen Section */}
                      <div className="space-y-4 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900/30">
                        <p className="text-sm font-medium text-amber-700 dark:text-amber-400">Alte Küche</p>

                        <div className="space-y-2">
                          <Label className="text-[#1F2430] dark:text-white font-medium text-sm">Gibt es eine alte Küche, die entfernt werden muss?</Label>
                          <RadioGroup options={YES_NO_OPTIONS} value={formData.hasOldKitchen} onChange={(v) => handleSelectChange("hasOldKitchen", v)} name="hasOldKitchen" columns={2} />
                        </div>

                        {/* Conditional: What to do with old kitchen */}
                        {formData.hasOldKitchen === "ja" && (
                          <div className="space-y-2 pl-4 border-l-2 border-amber-300 dark:border-amber-700">
                            <Label className="text-[#1F2430] dark:text-white font-medium text-sm">Was soll mit der alten Küche passieren?</Label>
                            <RadioGroup options={OLD_KITCHEN_ACTION_OPTIONS} value={formData.oldKitchenAction} onChange={(v) => handleSelectChange("oldKitchenAction", v)} name="oldKitchenAction" />
                          </div>
                        )}
                      </div>

                      {/* Special Features */}
                      <div className="space-y-4 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-xl border border-purple-200 dark:border-purple-900/30">
                        <p className="text-sm font-medium text-purple-700 dark:text-purple-400">Besondere Ausstattung</p>

                        {/* Water System */}
                        <div className="space-y-2">
                          <Label className="text-[#1F2430] dark:text-white font-medium text-sm">Wassersystem vorhanden? (z.B. Quooker, GROHE Blue)</Label>
                          <RadioGroup options={YES_NO_UNKNOWN_OPTIONS} value={formData.hasWaterSystem} onChange={(v) => handleSelectChange("hasWaterSystem", v)} name="hasWaterSystem" />
                        </div>

                        {/* Muldenlüfter */}
                        <div className="space-y-2">
                          <Label className="text-[#1F2430] dark:text-white font-medium text-sm">Muldenlüfter vorhanden? (integrierter Kochfeldabzug)</Label>
                          <RadioGroup options={YES_NO_UNKNOWN_OPTIONS} value={formData.hasMuldenluefter} onChange={(v) => handleSelectChange("hasMuldenluefter", v)} name="hasMuldenluefter" />
                        </div>
                      </div>

                      {/* Appliances & Connections */}
                      <div className="space-y-4 p-4 bg-[#FDF8F8] dark:bg-[#1a1520] rounded-xl border border-primary/10">
                        <p className="text-sm font-medium text-primary">Geräte & Anschlüsse</p>

                        <div className="space-y-2">
                          <Label className="text-[#1F2430] dark:text-white font-medium text-sm">Welche Geräte sollen angeschlossen werden?</Label>
                          <CheckboxGroup options={APPLIANCES_OPTIONS} values={formData.appliances} onChange={handleAppliancesChange} name="appliances" />
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div className="space-y-1">
                            <Label className="text-[#1F2430] dark:text-white font-medium text-xs">Wasseranschluss?</Label>
                            <RadioGroup options={YES_NO_OPTIONS} value={formData.needsWater} onChange={(v) => handleSelectChange("needsWater", v)} name="needsWater" />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-[#1F2430] dark:text-white font-medium text-xs">Elektroanschluss?</Label>
                            <RadioGroup options={YES_NO_OPTIONS} value={formData.needsElectric} onChange={(v) => handleSelectChange("needsElectric", v)} name="needsElectric" />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-[#1F2430] dark:text-white font-medium text-xs">Platte zuschneiden?</Label>
                            <RadioGroup options={YES_NO_OPTIONS} value={formData.needsCountertop} onChange={(v) => handleSelectChange("needsCountertop", v)} name="needsCountertop" />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* FURNITURE SPECIFIC FIELDS */}
                  {(isFurnitureService || isDeliveryWithAssembly) && (
                    <div className="space-y-4 p-4 bg-[#FDF8F8] dark:bg-[#1a1520] rounded-xl border border-primary/10">
                      <p className="text-sm font-medium text-primary">Möbel-Details</p>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="furnitureType" className="text-[#1F2430] dark:text-white font-medium text-sm">Möbelart *</Label>
                          <CustomSelect id="furnitureType" value={formData.furnitureType} onChange={(v) => handleSelectChange("furnitureType", v)} options={FURNITURE_TYPES} placeholder="Auswählen..." error={errors.furnitureType} />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[#1F2430] dark:text-white font-medium text-sm">Marke</Label>
                          <CustomSelect id="furnitureBrand" value={formData.furnitureBrand} onChange={(v) => handleSelectChange("furnitureBrand", v)} options={FURNITURE_BRANDS} placeholder="Auswählen..." />
                        </div>
                      </div>
                      {errors.furnitureType && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.furnitureType}</p>}

                      <div className="space-y-2">
                        <Label className="text-[#1F2430] dark:text-white font-medium text-sm">Anzahl Möbelstücke</Label>
                        <RadioGroup options={ITEM_COUNT} value={formData.itemCount} onChange={(v) => handleSelectChange("itemCount", v)} name="itemCount" />
                      </div>
                    </div>
                  )}

                  {/* DELIVERY SPECIFIC FIELDS */}
                  {isDeliveryService && (
                    <div className="space-y-4 p-4 bg-[#FDF8F8] dark:bg-[#1a1520] rounded-xl border border-primary/10">
                      <p className="text-sm font-medium text-primary">Liefer-Details</p>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="pickupLocation" className="text-[#1F2430] dark:text-white font-medium text-sm">Abholort *</Label>
                          <CustomSelect id="pickupLocation" value={formData.pickupLocation} onChange={(v) => handleSelectChange("pickupLocation", v)} options={PICKUP_LOCATIONS} placeholder="Auswählen..." error={errors.pickupLocation} />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[#1F2430] dark:text-white font-medium text-sm">Größe der Artikel</Label>
                          <CustomSelect id="itemSize" value={formData.itemSize} onChange={(v) => handleSelectChange("itemSize", v)} options={ITEM_SIZE_OPTIONS} placeholder="Auswählen..." />
                        </div>
                      </div>
                      {errors.pickupLocation && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.pickupLocation}</p>}

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label className="text-[#1F2430] dark:text-white font-medium text-sm">Stockwerk</Label>
                          <CustomSelect id="floor" value={formData.floor} onChange={(v) => handleSelectChange("floor", v)} options={FLOOR_OPTIONS} placeholder="Auswählen..." />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[#1F2430] dark:text-white font-medium text-sm">Aufzug?</Label>
                          <RadioGroup options={YES_NO_UNKNOWN_OPTIONS} value={formData.hasElevator} onChange={(v) => handleSelectChange("hasElevator", v)} name="hasElevator" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ACCESS & LOGISTICS - Shows for all services except "sonstiges" */}
                  {needsAccessInfo && (
                    <div className="space-y-4 p-4 bg-[#FFF7ED] dark:bg-[#1a1510] rounded-xl border border-orange-200 dark:border-orange-900/30">
                      <p className="text-sm font-medium text-orange-700 dark:text-orange-400">Zugang & Parken (für genaue Preisberechnung)</p>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label className="text-[#1F2430] dark:text-white font-medium text-sm">Parkmöglichkeit</Label>
                          <CustomSelect id="parking" value={formData.parking} onChange={(v) => handleSelectChange("parking", v)} options={PARKING_OPTIONS} placeholder="Auswählen..." />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[#1F2430] dark:text-white font-medium text-sm">Zugang zur Wohnung</Label>
                          <CustomSelect id="accessDifficulty" value={formData.accessDifficulty} onChange={(v) => handleSelectChange("accessDifficulty", v)} options={ACCESS_OPTIONS} placeholder="Auswählen..." />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[#1F2430] dark:text-white font-medium">Weitere Details *</Label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Sonstige Infos, besondere Anforderungen, Fragen..." rows={3} className={`resize-none bg-white dark:bg-[#151821] border ${errors.message ? "border-red-500" : "border-[#E8E0E0] dark:border-[#2A2F3A]"} rounded-xl`} />
                    {errors.message && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.message}</p>}
                  </div>

                  {/* Images */}
                  <div className="space-y-2">
                    <Label className="text-[#1F2430] dark:text-white font-medium">Bilder (optional, max. 5)</Label>
                    <p className="text-xs text-[#5F6673]">Werden automatisch komprimiert</p>
                    <div className="flex flex-wrap gap-3">
                      {images.map((f) => (
                        <div key={f.id} className="relative w-16 h-16 rounded-lg border overflow-hidden group">
                          {f.preview && <img src={f.preview} alt="" className="w-full h-full object-cover" />}
                          <button type="button" onClick={() => removeImage(f.id)} className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-5 h-5 text-white" /></button>
                        </div>
                      ))}
                      {images.length < 5 && (
                        <button type="button" onClick={() => imageInputRef.current?.click()} disabled={isCompressing} className="w-16 h-16 rounded-lg border-2 border-dashed hover:border-primary flex flex-col items-center justify-center text-[#9CA3AF] hover:text-primary disabled:opacity-50">
                          {isCompressing ? <Loader2 className="w-5 h-5 animate-spin" /> : <><ImageIcon className="w-5 h-5" /><span className="text-[10px]">Bild</span></>}
                        </button>
                      )}
                      <input ref={imageInputRef} type="file" accept="image/*" multiple onChange={handleImageSelect} className="hidden" />
                    </div>
                    {errors.images && <p className="text-sm text-red-500">{errors.images}</p>}
                  </div>

                  {/* Plans */}
                  <div className="space-y-2">
                    <Label className="text-[#1F2430] dark:text-white font-medium">Pläne (optional, max. 3)</Label>
                    <p className="text-xs text-[#5F6673]">Küchenplanung, Grundrisse (PDF, Bilder)</p>
                    <div className="flex flex-wrap gap-3">
                      {planFiles.map((f) => (
                        <div key={f.id} className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-[#F9F9F9] dark:bg-[#151821]">
                          <FileText className="w-4 h-4 text-primary" />
                          <span className="text-xs max-w-[80px] truncate">{f.name}</span>
                          <button type="button" onClick={() => removePlanFile(f.id)} className="text-[#9CA3AF] hover:text-red-500"><X className="w-4 h-4" /></button>
                        </div>
                      ))}
                      {planFiles.length < 3 && (
                        <button type="button" onClick={() => planInputRef.current?.click()} className="px-4 py-2 rounded-lg border-2 border-dashed hover:border-primary flex items-center gap-2 text-[#9CA3AF] hover:text-primary text-sm">
                          <Upload className="w-4 h-4" /><span>Datei</span>
                        </button>
                      )}
                      <input ref={planInputRef} type="file" accept=".pdf,.doc,.docx,image/*" multiple onChange={handlePlanSelect} className="hidden" />
                    </div>
                    {errors.plans && <p className="text-sm text-red-500">{errors.plans}</p>}
                  </div>

                  <Button type="button" onClick={handleNextStep} className="w-full btn-primary py-5 text-base rounded-xl">
                    Weiter zu Kontaktdaten<ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-5">
                  {/* Anrede */}
                  <div className="space-y-2">
                    <Label className="text-[#1F2430] dark:text-white font-medium">Anrede *</Label>
                    <RadioGroup options={ANREDE_OPTIONS} value={formData.anrede} onChange={(v) => handleSelectChange("anrede", v)} name="anrede" />
                    {errors.anrede && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.anrede}</p>}
                  </div>

                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#1F2430] dark:text-white font-medium">Ihr Name *</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Max Mustermann" className={`rounded-xl ${errors.name ? "border-red-500" : ""}`} />
                    {errors.name && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[#1F2430] dark:text-white font-medium">Telefonnummer *</Label>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="+49 123 456789" className={`rounded-xl ${errors.phone ? "border-red-500" : ""}`} />
                    {errors.phone && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.phone}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#1F2430] dark:text-white font-medium">E-Mail *</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="email@beispiel.de" className={`rounded-xl ${errors.email ? "border-red-500" : ""}`} />
                    {errors.email && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.email}</p>}
                  </div>

                  {/* City */}
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-[#1F2430] dark:text-white font-medium">Stadt / PLZ *</Label>
                    <Input id="city" name="city" value={formData.city} onChange={handleInputChange} placeholder="Nürnberg oder 90431" className={`rounded-xl ${errors.city ? "border-red-500" : ""}`} />
                    {errors.city && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.city}</p>}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <Button type="button" onClick={handlePrevStep} variant="outline" className="flex-1 py-5 rounded-xl">
                      <ChevronLeft className="w-5 h-5 mr-2" />Zurück
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="flex-[2] btn-primary py-5 rounded-xl">
                      {isSubmitting ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Wird gesendet...</> : <><Send className="w-5 h-5 mr-2" />Anfrage senden</>}
                    </Button>
                  </div>

                  <p className="text-xs text-center text-[#5F6673]">
                    Mit dem Absenden stimmen Sie unserer <Link href="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</Link> zu.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
