"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Send, Loader2, Upload, X, FileText, FileImage, File, ArrowRight, ArrowLeft, Check, Zap, AlertCircle, Phone, MessageCircle } from "lucide-react";
import { trackEvent, trackFormStart, trackFormSubmit, trackLead } from "@/lib/analytics";
import { getTrackingData } from "@/lib/tracking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { services, businessInfo } from "@/lib/data";
import { supabase, BUCKET_NAME, generateFilePath, getPublicUrl, isSupabaseConfigured } from "@/lib/supabase";
import { uploadToImgbb, isImgbbConfigured, isImageFile as isImgbbImage } from "@/lib/imgbb";
import { compressFiles, formatFileSize, calculateSavings, isImageFile, type CompressionProgress } from "@/lib/compression";

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const ALLOWED_DOC_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_IMAGES = 5;
const MAX_PLANS = 3;

// Smooth scroll helper function
function scrollToElement(elementId: string, offset: number = 100) {
  setTimeout(() => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  }, 150);
}

// Scroll to first invalid field and highlight it
function scrollToInvalidField(fieldId: string) {
  const element = document.getElementById(fieldId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition - 120,
      behavior: 'smooth'
    });
    // Add shake animation
    element.classList.add('animate-shake');
    setTimeout(() => {
      element.classList.remove('animate-shake');
    }, 600);
  }
}

// File type info
interface UploadedFile {
  file: File;
  preview: string;
  type: 'image' | 'pdf' | 'word' | 'other';
  uploading?: boolean;
  uploaded?: boolean;
  url?: string;
  error?: string;
}

// Get file type category
function getFileType(mimeType: string): UploadedFile['type'] {
  if (ALLOWED_IMAGE_TYPES.includes(mimeType)) return 'image';
  if (mimeType === 'application/pdf') return 'pdf';
  if (mimeType.includes('word')) return 'word';
  return 'other';
}

// Get file icon based on type
function FileIcon({ type }: { type: UploadedFile['type'] }) {
  switch (type) {
    case 'image':
      return <FileImage className="w-5 h-5" />;
    case 'pdf':
      return <FileText className="w-5 h-5 text-red-500" />;
    case 'word':
      return <FileText className="w-5 h-5 text-blue-500" />;
    default:
      return <File className="w-5 h-5" />;
  }
}

// Toggle Button Component - Mobile Responsive with Auto-Scroll
function ToggleButton({
  options,
  value,
  onChange,
  columns = 2,
  nextSectionId,
  inline = false
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  columns?: number;
  nextSectionId?: string;
  inline?: boolean;
}) {
  const handleChange = (newValue: string) => {
    onChange(newValue);
    if (nextSectionId) {
      scrollToElement(nextSectionId);
    }
  };

  // For inline mode (Yes/No side by side compactly)
  if (inline) {
    return (
      <div className="flex gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleChange(option.value)}
            className={`flex-1 px-3 py-2.5 rounded-lg border-2 text-sm font-medium transition-all min-h-[44px] active:scale-[0.98] ${
              value === option.value
                ? 'border-primary bg-primary text-white shadow-md'
                : 'border-border bg-background hover:border-primary/50 active:bg-primary/5'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  }

  // Mobile responsive: 3 cols → 1 col on mobile, 2 cols stays 2
  const getGridClass = () => {
    if (columns === 3) return 'grid-cols-1 sm:grid-cols-3';
    if (columns === 2) return 'grid-cols-2';
    return 'grid-cols-1';
  };

  return (
    <div className={`grid gap-2 sm:gap-3 ${getGridClass()}`}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => handleChange(option.value)}
          className={`px-3 sm:px-4 py-3.5 sm:py-3 rounded-xl border-2 text-sm font-medium transition-all min-h-[48px] active:scale-[0.98] ${
            value === option.value
              ? 'border-primary bg-primary text-white shadow-md'
              : 'border-border bg-background hover:border-primary/50 active:bg-primary/5'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

// Section Header Component - Mobile Responsive
function SectionHeader({ title, color = "primary" }: { title: string; color?: string }) {
  return (
    <div className={`text-sm sm:text-base font-semibold mb-3 ${color === "primary" ? "text-primary" : "text-orange-600"}`}>
      {title}
    </div>
  );
}

// Progress Bar Component
interface ProgressState {
  stage: 'idle' | 'compressing' | 'uploading' | 'sending' | 'done';
  progress: number;
  message: string;
  details?: string;
}

function ProgressBar({ state }: { state: ProgressState }) {
  if (state.stage === 'idle') return null;

  const getStageColor = () => {
    switch (state.stage) {
      case 'compressing': return 'bg-blue-500';
      case 'uploading': return 'bg-orange-500';
      case 'sending': return 'bg-green-500';
      case 'done': return 'bg-green-600';
      default: return 'bg-primary';
    }
  };

  const getStageIcon = () => {
    switch (state.stage) {
      case 'compressing': return <Zap className="w-4 h-4 animate-pulse" />;
      case 'uploading': return <Upload className="w-4 h-4 animate-bounce" />;
      case 'sending': return <Send className="w-4 h-4 animate-pulse" />;
      case 'done': return <Check className="w-4 h-4" />;
      default: return <Loader2 className="w-4 h-4 animate-spin" />;
    }
  };

  return (
    <div className="bg-muted/50 rounded-xl p-4 border border-border space-y-3 animate-in fade-in slide-in-from-bottom-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${getStageColor()} text-white`}>
            {getStageIcon()}
          </div>
          <span className="font-medium text-sm">{state.message}</span>
        </div>
        <span className="text-sm font-bold text-primary">{Math.round(state.progress)}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full ${getStageColor()} transition-all duration-300 ease-out rounded-full`}
          style={{ width: `${state.progress}%` }}
        />
      </div>
      {state.details && (
        <p className="text-xs text-muted-foreground truncate">{state.details}</p>
      )}
    </div>
  );
}

// Convert file to base64
function fileToBase64(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

// Upload file - tries imgbb first (for images), then Supabase
async function uploadFile(file: File | Blob, fileName: string): Promise<string> {
  const isImage = isImageFile(file as File) || /\.(jpg|jpeg|png|webp|gif)$/i.test(fileName);

  // Try imgbb first for images (simpler, no bucket config needed)
  if (isImage && isImgbbConfigured()) {
    console.log('Uploading to imgbb:', fileName);
    const url = await uploadToImgbb(file, fileName);
    if (url) {
      console.log('imgbb upload success:', url);
      return url;
    }
  }

  // Fallback to Supabase
  if (supabase && isSupabaseConfigured()) {
    console.log('Uploading to Supabase:', fileName);
    const filePath = generateFilePath(fileName);

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Supabase upload failed:', error.message);
      return '';
    }

    const url = getPublicUrl(filePath);
    console.log('Supabase upload success:', url);
    return url;
  }

  // No upload service configured - convert to base64 data URL for small files
  console.warn('No upload service configured, using base64');
  if (file instanceof Blob && file.size < 500 * 1024) { // < 500KB
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }

  console.error('File too large and no upload service configured');
  return '';
}

export default function QuickContactForm() {
  const router = useRouter();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const planInputRef = useRef<HTMLInputElement>(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    service: "",
    details: "",
    name: "",
    phone: "",
    email: "",
  });

  // Küchenmontage specific fields
  const [kitchenFields, setKitchenFields] = useState({
    // Timing
    urgency: "",
    timeframe: "",
    dayTime: "",
    // Basic data
    brand: "",
    form: "",
    cabinetCount: "",
    // Status & Location
    kitchenOnSite: "",
    needPickup: "",
    pickupAddress: "",
    kitchenCondition: "",
    countertopType: "",
    // Old kitchen
    hasOldKitchen: "",
    oldKitchenAction: "",
    // Special equipment
    hasWaterSystem: "",
    // Connections
    waterConnection: "",
    electricConnection: "",
    cutCountertop: "",
    // Access & Parking
    parking: "",
    access: "",
  });

  // Möbelmontage specific fields
  const [furnitureFields, setFurnitureFields] = useState({
    // Timing
    urgency: "",
    timeframe: "",
    dayTime: "",
    // Furniture details
    furnitureType: "",
    brand: "",
    itemCount: "",
    // Status & Location
    furnitureOnSite: "",
    needPickup: "",
    pickupAddress: "",
    furnitureCondition: "",
    // Access & Parking
    parking: "",
    access: "",
  });

  // Lieferung specific fields
  const [deliveryFields, setDeliveryFields] = useState({
    // Timing
    urgency: "",
    timeframe: "",
    dayTime: "",
    // Pickup
    pickupAddress: "",
    pickupFloor: "",
    pickupParking: "",
    // Delivery
    deliveryAddress: "",
    deliveryFloor: "",
    deliveryParking: "",
    // Items
    itemDescription: "",
    itemCount: "",
    itemSize: "",
    needHelpers: "",
  });

  // Umzüge specific fields
  const [movingFields, setMovingFields] = useState({
    // Timing
    urgency: "",
    moveDate: "",
    dayTime: "",
    // Current address
    currentAddress: "",
    currentFloor: "",
    currentParking: "",
    currentRooms: "",
    currentSize: "",
    hasElevator: "",
    // New address
    newAddress: "",
    newFloor: "",
    newParking: "",
    newHasElevator: "",
    // Items
    hasHeavyItems: "",
    heavyItemsDescription: "",
    needPacking: "",
    needStorage: "",
  });

  // Entrümpelung specific fields
  const [clearanceFields, setClearanceFields] = useState({
    // Timing
    urgency: "",
    timeframe: "",
    dayTime: "",
    // Location
    address: "",
    floor: "",
    parking: "",
    hasElevator: "",
    // Area
    areaType: "",
    areaSize: "",
    roomCount: "",
    // Items
    itemTypes: "",
    hasHeavyItems: "",
    needsDisposal: "",
    specialItems: "",
  });

  const [images, setImages] = useState<UploadedFile[]>([]);
  const [plans, setPlans] = useState<UploadedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [hasStartedForm, setHasStartedForm] = useState(false);

  // Progress state for compression/upload/send
  const [progressState, setProgressState] = useState<ProgressState>({
    stage: 'idle',
    progress: 0,
    message: '',
  });

  // Reset service-specific fields when service changes
  useEffect(() => {
    setKitchenFields({
      urgency: "",
      timeframe: "",
      dayTime: "",
      brand: "",
      form: "",
      cabinetCount: "",
      kitchenOnSite: "",
      needPickup: "",
      pickupAddress: "",
      kitchenCondition: "",
      countertopType: "",
      hasOldKitchen: "",
      oldKitchenAction: "",
      hasWaterSystem: "",
      waterConnection: "",
      electricConnection: "",
      cutCountertop: "",
      parking: "",
      access: "",
    });
    setFurnitureFields({
      urgency: "",
      timeframe: "",
      dayTime: "",
      furnitureType: "",
      brand: "",
      itemCount: "",
      furnitureOnSite: "",
      needPickup: "",
      pickupAddress: "",
      furnitureCondition: "",
      parking: "",
      access: "",
    });
    setDeliveryFields({
      urgency: "",
      timeframe: "",
      dayTime: "",
      pickupAddress: "",
      pickupFloor: "",
      pickupParking: "",
      deliveryAddress: "",
      deliveryFloor: "",
      deliveryParking: "",
      itemDescription: "",
      itemCount: "",
      itemSize: "",
      needHelpers: "",
    });
    setMovingFields({
      urgency: "",
      moveDate: "",
      dayTime: "",
      currentAddress: "",
      currentFloor: "",
      currentParking: "",
      currentRooms: "",
      currentSize: "",
      hasElevator: "",
      newAddress: "",
      newFloor: "",
      newParking: "",
      newHasElevator: "",
      hasHeavyItems: "",
      heavyItemsDescription: "",
      needPacking: "",
      needStorage: "",
    });
    setClearanceFields({
      urgency: "",
      timeframe: "",
      dayTime: "",
      address: "",
      floor: "",
      parking: "",
      hasElevator: "",
      areaType: "",
      areaSize: "",
      roomCount: "",
      itemTypes: "",
      hasHeavyItems: "",
      needsDisposal: "",
      specialItems: "",
    });
  }, [formData.service]);

  // Track form start when user begins filling
  useEffect(() => {
    const hasData = formData.service || formData.details || formData.name;
    if (hasData && !hasStartedForm) {
      setHasStartedForm(true);
      trackFormStart("quick_contact_form");
    }
  }, [formData, hasStartedForm]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setError("");

    if (images.length + selectedFiles.length > MAX_IMAGES) {
      setError(`Maximal ${MAX_IMAGES} Bilder erlaubt`);
      return;
    }

    for (const file of selectedFiles) {
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        setError(`Nur Bilder erlaubt: ${file.name}`);
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        setError(`Datei zu groß (max. 10MB): ${file.name}`);
        continue;
      }

      const preview = URL.createObjectURL(file);
      setImages((prev) => [...prev, { file, preview, type: 'image', uploading: false }]);
    }

    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  const handlePlanUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setError("");

    if (plans.length + selectedFiles.length > MAX_PLANS) {
      setError(`Maximal ${MAX_PLANS} Pläne erlaubt`);
      return;
    }

    for (const file of selectedFiles) {
      if (!ALLOWED_DOC_TYPES.includes(file.type) && !ALLOWED_IMAGE_TYPES.includes(file.type)) {
        setError(`Dateityp nicht erlaubt: ${file.name}`);
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        setError(`Datei zu groß (max. 10MB): ${file.name}`);
        continue;
      }

      const fileType = getFileType(file.type);
      const preview = fileType === 'image' ? URL.createObjectURL(file) : '';
      setPlans((prev) => [...prev, { file, preview, type: fileType, uploading: false }]);
    }

    if (planInputRef.current) {
      planInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const newFiles = [...prev];
      if (newFiles[index].preview) {
        URL.revokeObjectURL(newFiles[index].preview);
      }
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const removePlan = (index: number) => {
    setPlans((prev) => {
      const newFiles = [...prev];
      if (newFiles[index].preview) {
        URL.revokeObjectURL(newFiles[index].preview);
      }
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const goToStep2 = () => {
    if (!formData.service) {
      setError("Bitte wählen Sie eine Dienstleistung");
      scrollToInvalidField("quick-service");
      return;
    }
    setError("");
    setCurrentStep(2);
    trackEvent({
      action: "form_step",
      category: "engagement",
      label: "quick_contact_form_step_2",
      customParams: { form_step: 2, service_type: formData.service },
    });
    scrollToElement("form-step-indicator", 20);
  };

  const goToStep1 = () => {
    setCurrentStep(1);
    setError("");
    scrollToElement("form-step-indicator", 20);
  };

  // Build message from all fields
  const buildMessage = () => {
    let message = "";

    if (formData.service === "kuechenmontage") {
      const labels: Record<string, string> = {
        urgency: "Dringlichkeit",
        timeframe: "Gewünschter Zeitraum",
        dayTime: "Bevorzugte Tageszeit",
        brand: "Marke",
        form: "Form",
        cabinetCount: "Anzahl Schränke",
        kitchenOnSite: "Küche vor Ort",
        needPickup: "Abholung gewünscht",
        pickupAddress: "Abholadresse",
        kitchenCondition: "Zustand der Küche",
        countertopType: "Arbeitsplatten-Typ",
        hasOldKitchen: "Alte Küche vorhanden",
        oldKitchenAction: "Alte Küche",
        hasWaterSystem: "Wassersystem",
        waterConnection: "Wasseranschluss",
        electricConnection: "Elektroanschluss",
        cutCountertop: "Platte zuschneiden",
        parking: "Parkmöglichkeit",
        access: "Zugang zur Wohnung",
      };

      for (const [key, label] of Object.entries(labels)) {
        const value = kitchenFields[key as keyof typeof kitchenFields];
        if (value) {
          message += `${label}: ${value}\n`;
        }
      }
    }

    if (formData.service === "moebelmontage") {
      const labels: Record<string, string> = {
        urgency: "Dringlichkeit",
        timeframe: "Gewünschter Zeitraum",
        dayTime: "Bevorzugte Tageszeit",
        furnitureType: "Möbelart",
        brand: "Marke",
        itemCount: "Anzahl Möbelstücke",
        furnitureOnSite: "Möbel vor Ort",
        needPickup: "Abholung gewünscht",
        pickupAddress: "Abholadresse",
        furnitureCondition: "Zustand der Möbel",
        parking: "Parkmöglichkeit",
        access: "Zugang zur Wohnung",
      };

      for (const [key, label] of Object.entries(labels)) {
        const value = furnitureFields[key as keyof typeof furnitureFields];
        if (value) {
          message += `${label}: ${value}\n`;
        }
      }
    }

    if (formData.service === "lieferungen") {
      const labels: Record<string, string> = {
        urgency: "Dringlichkeit",
        timeframe: "Gewünschter Zeitraum",
        dayTime: "Bevorzugte Tageszeit",
        pickupAddress: "Abholadresse",
        pickupFloor: "Etage (Abholung)",
        pickupParking: "Parken (Abholung)",
        deliveryAddress: "Lieferadresse",
        deliveryFloor: "Etage (Lieferung)",
        deliveryParking: "Parken (Lieferung)",
        itemDescription: "Beschreibung der Gegenstände",
        itemCount: "Anzahl Gegenstände",
        itemSize: "Größe/Gewicht",
        needHelpers: "Helfer benötigt",
      };

      for (const [key, label] of Object.entries(labels)) {
        const value = deliveryFields[key as keyof typeof deliveryFields];
        if (value) {
          message += `${label}: ${value}\n`;
        }
      }
    }

    if (formData.service === "umzuege") {
      const labels: Record<string, string> = {
        urgency: "Dringlichkeit",
        moveDate: "Umzugsdatum",
        dayTime: "Bevorzugte Tageszeit",
        currentAddress: "Aktuelle Adresse",
        currentFloor: "Etage (aktuell)",
        currentParking: "Parken (aktuell)",
        currentRooms: "Anzahl Zimmer",
        currentSize: "Wohnfläche",
        hasElevator: "Aufzug vorhanden (aktuell)",
        newAddress: "Neue Adresse",
        newFloor: "Etage (neu)",
        newParking: "Parken (neu)",
        newHasElevator: "Aufzug vorhanden (neu)",
        hasHeavyItems: "Schwere Gegenstände",
        heavyItemsDescription: "Beschreibung schwere Gegenstände",
        needPacking: "Verpackung benötigt",
        needStorage: "Zwischenlagerung benötigt",
      };

      for (const [key, label] of Object.entries(labels)) {
        const value = movingFields[key as keyof typeof movingFields];
        if (value) {
          message += `${label}: ${value}\n`;
        }
      }
    }

    if (formData.service === "entruempelung") {
      const labels: Record<string, string> = {
        urgency: "Dringlichkeit",
        timeframe: "Gewünschter Zeitraum",
        dayTime: "Bevorzugte Tageszeit",
        address: "Adresse",
        floor: "Etage",
        parking: "Parkmöglichkeit",
        hasElevator: "Aufzug vorhanden",
        areaType: "Art des Bereichs",
        areaSize: "Fläche",
        roomCount: "Anzahl Räume",
        itemTypes: "Art der Gegenstände",
        hasHeavyItems: "Schwere Gegenstände",
        needsDisposal: "Entsorgung benötigt",
        specialItems: "Besondere Gegenstände",
      };

      for (const [key, label] of Object.entries(labels)) {
        const value = clearanceFields[key as keyof typeof clearanceFields];
        if (value) {
          message += `${label}: ${value}\n`;
        }
      }
    }

    if (formData.details) {
      message += `\n---\n\nWeitere Details:\n${formData.details}`;
    }

    return message || formData.details;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const uploadedImageUrls: string[] = [];
      const fileAttachments: { filename: string; content: string }[] = [];

      const allFiles = [...images, ...plans];
      const filesToProcess = allFiles.map(f => f.file);

      // Separate images and documents
      const imageFiles: File[] = [];
      const documentFiles: File[] = [];

      for (const file of filesToProcess) {
        if (isImageFile(file)) {
          imageFiles.push(file);
        } else {
          documentFiles.push(file);
        }
      }

      console.log(`Processing ${imageFiles.length} images and ${documentFiles.length} documents`);

      // Process images - compress and upload to imgbb
      if (imageFiles.length > 0) {
        setProgressState({
          stage: 'compressing',
          progress: 0,
          message: 'Bilder werden komprimiert...',
          details: `0 von ${imageFiles.length} Bilder`,
        });

        const compressedImages = await compressFiles(
          imageFiles,
          (progress) => {
            setProgressState({
              stage: 'compressing',
              progress: progress.progress,
              message: 'Bilder werden komprimiert...',
              details: `${progress.currentFileIndex} von ${progress.totalFiles} - ${progress.currentFile}`,
            });
          },
          { maxWidth: 1920, maxHeight: 1080, quality: 0.7, maxSizeMB: 1 }
        );

        // Show compression savings briefly
        const savings = calculateSavings(imageFiles, compressedImages);
        if (savings.savedPercent > 5) {
          setProgressState({
            stage: 'compressing',
            progress: 100,
            message: 'Komprimierung abgeschlossen!',
            details: `Gespart: ${formatFileSize(savings.savedSize)} (${Math.round(savings.savedPercent)}%)`,
          });
          await new Promise(resolve => setTimeout(resolve, 800));
        }

        // Upload images to imgbb
        for (let i = 0; i < compressedImages.length; i++) {
          const file = compressedImages[i];
          const originalFile = imageFiles[i];

          setProgressState({
            stage: 'uploading',
            progress: (i / compressedImages.length) * 100,
            message: 'Bilder werden hochgeladen...',
            details: `${i + 1} von ${compressedImages.length} - ${originalFile.name}`,
          });

          try {
            const fileName = originalFile.name.replace(/\.[^.]+$/, '.jpg');
            const url = await uploadFile(file, fileName);
            if (url) {
              uploadedImageUrls.push(url);
              console.log(`Image uploaded: ${url}`);
            }
          } catch {
            console.error(`Failed to upload image ${originalFile.name}`);
          }
        }
      }

      // Process documents - convert to base64 for email attachment
      if (documentFiles.length > 0) {
        setProgressState({
          stage: 'uploading',
          progress: 50,
          message: 'Dateien werden vorbereitet...',
          details: `${documentFiles.length} Dateien`,
        });

        for (const file of documentFiles) {
          try {
            const base64 = await fileToBase64(file);
            // Remove data URL prefix to get pure base64
            const content = base64.replace(/^data:[^;]+;base64,/, '');
            fileAttachments.push({
              filename: file.name,
              content: content,
            });
            console.log(`Document prepared as attachment: ${file.name}`);
          } catch {
            console.error(`Failed to process document ${file.name}`);
          }
        }
      }

      // Stage 3: Send form
      setProgressState({
        stage: 'sending',
        progress: 30,
        message: 'Anfrage wird gesendet...',
      });

      // Get tracking data (GCLID, source, page)
      const tracking = getTrackingData();

      // Debug log
      console.log("Image URLs to send:", uploadedImageUrls);
      console.log("File attachments to send:", fileAttachments.length);

      const submissionId = crypto.randomUUID();
      const submitData = {
        submissionId,
        service: formData.service,
        message: buildMessage(),
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        fileUrls: uploadedImageUrls,
        fileAttachments: fileAttachments,
        serviceDetails:
          formData.service === "kuechenmontage"
            ? kitchenFields
            : formData.service === "moebelmontage"
            ? furnitureFields
            : formData.service === "lieferungen"
            ? deliveryFields
            : formData.service === "umzuege"
            ? movingFields
            : formData.service === "entruempelung"
            ? clearanceFields
            : {},
        gclid: tracking.gclid,
        quelle: tracking.source,
        seite: tracking.page,
      };

      setProgressState({
        stage: 'sending',
        progress: 60,
        message: 'Anfrage wird gesendet...',
      });

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      setProgressState({
        stage: 'sending',
        progress: 90,
        message: 'Verarbeitung...',
      });

      const result = await response.json().catch(() => ({}));

      // Only treat as success if the server actually delivered the request.
      // The API returns { success: true } exclusively when the notification email was sent.
      if (!response.ok || !result?.success || result?.submissionId !== submissionId) {
        throw new Error(
          result?.error ||
            "Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch.",
        );
      }

      // Confirmed success -> fire conversion tracking now (not before)
      trackFormSubmit("quick_contact_form", formData.service);
      trackLead({
        source: "quick_contact_form",
        service: formData.service,
        phone: formData.phone,
        email: formData.email,
      });

      setProgressState({
        stage: 'done',
        progress: 100,
        message: 'Erfolgreich gesendet!',
      });

      await new Promise(resolve => setTimeout(resolve, 500));

      // One-time access flag for the thank-you page (checked + cleared there)
      sessionStorage.setItem("form_submitted", "true");
      router.push("/thank-you");
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Fehler beim Senden. Bitte versuchen Sie es erneut.";
      setError(errorMessage);
      trackEvent({
        action: "form_error",
        category: "engagement",
        label: "quick_contact_form",
        customParams: { service_type: formData.service },
      });
      setIsSubmitting(false);
      setProgressState({ stage: 'idle', progress: 0, message: '' });
      // Bring the error into view so the reason is always visible
      scrollToInvalidField("quick-submit-error");
    }
  };

  // Render Möbelmontage specific fields
  const renderFurnitureFields = () => (
    <div className="space-y-6">
      {/* Wann soll es losgehen? */}
      <div className="bg-primary/5 rounded-xl p-3 sm:p-4 border border-primary/10 space-y-3 sm:space-y-4">
        <SectionHeader title="Wann soll es losgehen?" />

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Wie dringend?</Label>
          <ToggleButton
            options={[
              { value: "Dringend (Express)", label: "Dringend (Express)" },
              { value: "Normal", label: "Normal" },
              { value: "Flexibel", label: "Flexibel" },
            ]}
            value={furnitureFields.urgency}
            onChange={(v) => setFurnitureFields({ ...furnitureFields, urgency: v })}
            columns={3}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Gewünschter Zeitraum</Label>
          <Select
            value={furnitureFields.timeframe}
            onValueChange={(v) => setFurnitureFields({ ...furnitureFields, timeframe: v })}
          >
            <SelectTrigger className="input-focus">
              <SelectValue placeholder="Auswählen..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Diese Woche">Diese Woche</SelectItem>
              <SelectItem value="Nächste Woche">Nächste Woche</SelectItem>
              <SelectItem value="In 2-3 Wochen">In 2-3 Wochen</SelectItem>
              <SelectItem value="In 1 Monat">In 1 Monat</SelectItem>
              <SelectItem value="Flexibel">Flexibel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Bevorzugte Tageszeit</Label>
          <ToggleButton
            options={[
              { value: "Vormittags", label: "Vormittags" },
              { value: "Nachmittags", label: "Nachmittags" },
              { value: "Flexibel", label: "Flexibel" },
            ]}
            value={furnitureFields.dayTime}
            onChange={(v) => setFurnitureFields({ ...furnitureFields, dayTime: v })}
            columns={3}
          />
        </div>
      </div>

      {/* Möbel-Grunddaten */}
      <div className="bg-primary/5 rounded-xl p-3 sm:p-4 border border-primary/10 space-y-3 sm:space-y-4">
        <SectionHeader title="Möbel-Grunddaten" />

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Möbelart *</Label>
          <Select
            value={furnitureFields.furnitureType}
            onValueChange={(v) => setFurnitureFields({ ...furnitureFields, furnitureType: v })}
          >
            <SelectTrigger className="input-focus">
              <SelectValue placeholder="Auswählen..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PAX Kleiderschrank">PAX Kleiderschrank</SelectItem>
              <SelectItem value="Bett">Bett</SelectItem>
              <SelectItem value="Kommode">Kommode</SelectItem>
              <SelectItem value="Regal">Regal</SelectItem>
              <SelectItem value="Schreibtisch">Schreibtisch</SelectItem>
              <SelectItem value="Esstisch">Esstisch</SelectItem>
              <SelectItem value="Sofa">Sofa</SelectItem>
              <SelectItem value="TV-Möbel">TV-Möbel</SelectItem>
              <SelectItem value="Mehrere Möbelstücke">Mehrere Möbelstücke</SelectItem>
              <SelectItem value="Andere">Andere</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-2">
            <Label className="text-sm leading-relaxed">Marke</Label>
            <Select
              value={furnitureFields.brand}
              onValueChange={(v) => setFurnitureFields({ ...furnitureFields, brand: v })}
            >
              <SelectTrigger className="input-focus">
                <SelectValue placeholder="Auswählen..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IKEA">IKEA</SelectItem>
                <SelectItem value="POCO">POCO</SelectItem>
                <SelectItem value="Roller">Roller</SelectItem>
                <SelectItem value="XXXLutz">XXXLutz</SelectItem>
                <SelectItem value="Höffner">Höffner</SelectItem>
                <SelectItem value="Andere">Andere</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm leading-relaxed">Anzahl Möbelstücke</Label>
            <Select
              value={furnitureFields.itemCount}
              onValueChange={(v) => setFurnitureFields({ ...furnitureFields, itemCount: v })}
            >
              <SelectTrigger className="input-focus">
                <SelectValue placeholder="Auswählen..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2-3">2-3</SelectItem>
                <SelectItem value="4-5">4-5</SelectItem>
                <SelectItem value="6-10">6-10</SelectItem>
                <SelectItem value="Mehr als 10">Mehr als 10</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Möbelstatus & Standort */}
      <div className="bg-primary/5 rounded-xl p-3 sm:p-4 border border-primary/10 space-y-3 sm:space-y-4">
        <SectionHeader title="Möbelstatus & Standort" />

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Sind die Möbel bereits bei Ihnen vor Ort?</Label>
          <ToggleButton
            options={[
              { value: "Ja", label: "Ja" },
              { value: "Nein", label: "Nein" },
            ]}
            value={furnitureFields.furnitureOnSite}
            onChange={(v) => setFurnitureFields({ ...furnitureFields, furnitureOnSite: v, needPickup: "", pickupAddress: "" })}
          />
        </div>

        {furnitureFields.furnitureOnSite === "Nein" && (
          <div className="ml-2 sm:ml-4 pl-3 sm:pl-4 border-l-2 border-primary/30 space-y-3 sm:space-y-4">
            <div className="space-y-2">
              <Label className="text-sm leading-relaxed">Sollen wir die Möbel abholen/liefern?</Label>
              <ToggleButton
                options={[
                  { value: "Ja", label: "Ja" },
                  { value: "Nein", label: "Nein" },
                ]}
                value={furnitureFields.needPickup}
                onChange={(v) => setFurnitureFields({ ...furnitureFields, needPickup: v })}
              />
            </div>

            {furnitureFields.needPickup === "Ja" && (
              <div className="space-y-2">
                <Label className="text-sm leading-relaxed">Abholadresse eingeben *</Label>
                <Input
                  placeholder="z.B. IKEA Nürnberg, Musterstraße 123..."
                  value={furnitureFields.pickupAddress}
                  onChange={(e) => setFurnitureFields({ ...furnitureFields, pickupAddress: e.target.value })}
                  className="input-focus"
                />
              </div>
            )}
          </div>
        )}

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">In welchem Zustand sind die Möbel?</Label>
          <ToggleButton
            options={[
              { value: "Zerlegt (in Paketen)", label: "Zerlegt (in Paketen)" },
              { value: "Fertig montiert", label: "Fertig montiert" },
            ]}
            value={furnitureFields.furnitureCondition}
            onChange={(v) => setFurnitureFields({ ...furnitureFields, furnitureCondition: v })}
          />
        </div>
      </div>

      {/* Zugang & Parken */}
      <div className="bg-primary/5 rounded-xl p-3 sm:p-4 border border-primary/10 space-y-3 sm:space-y-4">
        <SectionHeader title="Zugang & Parken" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-2">
            <Label className="text-sm leading-relaxed">Parkmöglichkeit</Label>
            <Select
              value={furnitureFields.parking}
              onValueChange={(v) => setFurnitureFields({ ...furnitureFields, parking: v })}
            >
              <SelectTrigger className="input-focus">
                <SelectValue placeholder="Auswählen..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Direkt vor der Tür">Direkt vor der Tür</SelectItem>
                <SelectItem value="In der Nähe (< 50m)">In der Nähe (&lt; 50m)</SelectItem>
                <SelectItem value="Weiter entfernt (> 50m)">Weiter entfernt (&gt; 50m)</SelectItem>
                <SelectItem value="Schwierige Parksituation">Schwierige Parksituation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm leading-relaxed">Zugang zur Wohnung</Label>
            <Select
              value={furnitureFields.access}
              onValueChange={(v) => setFurnitureFields({ ...furnitureFields, access: v })}
            >
              <SelectTrigger className="input-focus">
                <SelectValue placeholder="Auswählen..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Erdgeschoss">Erdgeschoss</SelectItem>
                <SelectItem value="1. Etage (mit Aufzug)">1. Etage (mit Aufzug)</SelectItem>
                <SelectItem value="1. Etage (ohne Aufzug)">1. Etage (ohne Aufzug)</SelectItem>
                <SelectItem value="2. Etage (mit Aufzug)">2. Etage (mit Aufzug)</SelectItem>
                <SelectItem value="2. Etage (ohne Aufzug)">2. Etage (ohne Aufzug)</SelectItem>
                <SelectItem value="3. Etage oder höher (mit Aufzug)">3. Etage oder höher (mit Aufzug)</SelectItem>
                <SelectItem value="3. Etage oder höher (ohne Aufzug)">3. Etage oder höher (ohne Aufzug)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Lieferung specific fields
  const renderDeliveryFields = () => (
    <div className="space-y-6">
      {/* Wann soll es losgehen? */}
      <div className="bg-primary/5 rounded-xl p-3 sm:p-4 border border-primary/10 space-y-3 sm:space-y-4">
        <SectionHeader title="Wann soll es losgehen?" />

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Wie dringend?</Label>
          <ToggleButton
            options={[
              { value: "Dringend (Express)", label: "Dringend (Express)" },
              { value: "Normal", label: "Normal" },
              { value: "Flexibel", label: "Flexibel" },
            ]}
            value={deliveryFields.urgency}
            onChange={(v) => setDeliveryFields({ ...deliveryFields, urgency: v })}
            columns={3}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Gewünschter Zeitraum</Label>
          <Select
            value={deliveryFields.timeframe}
            onValueChange={(v) => setDeliveryFields({ ...deliveryFields, timeframe: v })}
          >
            <SelectTrigger className="input-focus">
              <SelectValue placeholder="Auswählen..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Heute">Heute</SelectItem>
              <SelectItem value="Morgen">Morgen</SelectItem>
              <SelectItem value="Diese Woche">Diese Woche</SelectItem>
              <SelectItem value="Nächste Woche">Nächste Woche</SelectItem>
              <SelectItem value="Flexibel">Flexibel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Bevorzugte Tageszeit</Label>
          <ToggleButton
            options={[
              { value: "Vormittags", label: "Vormittags" },
              { value: "Nachmittags", label: "Nachmittags" },
              { value: "Flexibel", label: "Flexibel" },
            ]}
            value={deliveryFields.dayTime}
            onChange={(v) => setDeliveryFields({ ...deliveryFields, dayTime: v })}
            columns={3}
          />
        </div>
      </div>

      {/* Abholung */}
      <div className="bg-primary/5 rounded-xl p-3 sm:p-4 border border-primary/10 space-y-3 sm:space-y-4">
        <SectionHeader title="Abholung" />

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Abholadresse *</Label>
          <Input
            placeholder="z.B. IKEA Nürnberg, Musterstraße 123..."
            value={deliveryFields.pickupAddress}
            onChange={(e) => setDeliveryFields({ ...deliveryFields, pickupAddress: e.target.value })}
            className="input-focus"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-2">
            <Label className="text-sm leading-relaxed">Etage</Label>
            <Select
              value={deliveryFields.pickupFloor}
              onValueChange={(v) => setDeliveryFields({ ...deliveryFields, pickupFloor: v })}
            >
              <SelectTrigger className="input-focus">
                <SelectValue placeholder="Auswählen..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Erdgeschoss">Erdgeschoss</SelectItem>
                <SelectItem value="1. Etage">1. Etage</SelectItem>
                <SelectItem value="2. Etage">2. Etage</SelectItem>
                <SelectItem value="3. Etage oder höher">3. Etage oder höher</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm leading-relaxed">Parkmöglichkeit</Label>
            <Select
              value={deliveryFields.pickupParking}
              onValueChange={(v) => setDeliveryFields({ ...deliveryFields, pickupParking: v })}
            >
              <SelectTrigger className="input-focus">
                <SelectValue placeholder="Auswählen..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Direkt vor der Tür">Direkt vor der Tür</SelectItem>
                <SelectItem value="In der Nähe">In der Nähe</SelectItem>
                <SelectItem value="Schwierig">Schwierig</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Lieferung */}
      <div className="bg-primary/5 rounded-xl p-3 sm:p-4 border border-primary/10 space-y-3 sm:space-y-4">
        <SectionHeader title="Lieferung" />

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Lieferadresse *</Label>
          <Input
            placeholder="Ihre Adresse..."
            value={deliveryFields.deliveryAddress}
            onChange={(e) => setDeliveryFields({ ...deliveryFields, deliveryAddress: e.target.value })}
            className="input-focus"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-2">
            <Label className="text-sm leading-relaxed">Etage</Label>
            <Select
              value={deliveryFields.deliveryFloor}
              onValueChange={(v) => setDeliveryFields({ ...deliveryFields, deliveryFloor: v })}
            >
              <SelectTrigger className="input-focus">
                <SelectValue placeholder="Auswählen..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Erdgeschoss">Erdgeschoss</SelectItem>
                <SelectItem value="1. Etage">1. Etage</SelectItem>
                <SelectItem value="2. Etage">2. Etage</SelectItem>
                <SelectItem value="3. Etage oder höher">3. Etage oder höher</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm leading-relaxed">Parkmöglichkeit</Label>
            <Select
              value={deliveryFields.deliveryParking}
              onValueChange={(v) => setDeliveryFields({ ...deliveryFields, deliveryParking: v })}
            >
              <SelectTrigger className="input-focus">
                <SelectValue placeholder="Auswählen..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Direkt vor der Tür">Direkt vor der Tür</SelectItem>
                <SelectItem value="In der Nähe">In der Nähe</SelectItem>
                <SelectItem value="Schwierig">Schwierig</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Gegenstände */}
      <div className="bg-primary/5 rounded-xl p-3 sm:p-4 border border-primary/10 space-y-3 sm:space-y-4">
        <SectionHeader title="Gegenstände" />

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Was soll geliefert werden? *</Label>
          <Input
            placeholder="z.B. PAX Schrank, Küche, Sofa..."
            value={deliveryFields.itemDescription}
            onChange={(e) => setDeliveryFields({ ...deliveryFields, itemDescription: e.target.value })}
            className="input-focus"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-2">
            <Label className="text-sm leading-relaxed">Anzahl Pakete/Teile</Label>
            <Select
              value={deliveryFields.itemCount}
              onValueChange={(v) => setDeliveryFields({ ...deliveryFields, itemCount: v })}
            >
              <SelectTrigger className="input-focus">
                <SelectValue placeholder="Auswählen..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-5">1-5</SelectItem>
                <SelectItem value="6-10">6-10</SelectItem>
                <SelectItem value="11-20">11-20</SelectItem>
                <SelectItem value="Mehr als 20">Mehr als 20</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm leading-relaxed">Größe/Gewicht</Label>
            <Select
              value={deliveryFields.itemSize}
              onValueChange={(v) => setDeliveryFields({ ...deliveryFields, itemSize: v })}
            >
              <SelectTrigger className="input-focus">
                <SelectValue placeholder="Auswählen..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Klein (bis 20kg)">Klein (bis 20kg)</SelectItem>
                <SelectItem value="Mittel (20-50kg)">Mittel (20-50kg)</SelectItem>
                <SelectItem value="Groß (über 50kg)">Groß (über 50kg)</SelectItem>
                <SelectItem value="Sehr groß/schwer">Sehr groß/schwer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Helfer beim Tragen benötigt?</Label>
          <ToggleButton
            options={[
              { value: "Ja", label: "Ja" },
              { value: "Nein", label: "Nein" },
            ]}
            value={deliveryFields.needHelpers}
            onChange={(v) => setDeliveryFields({ ...deliveryFields, needHelpers: v })}
          />
        </div>
      </div>
    </div>
  );

  // Render Umzüge specific fields
  const renderMovingFields = () => (
    <div className="space-y-6">
      {/* Wann soll es losgehen? */}
      <div className="bg-primary/5 rounded-xl p-3 sm:p-4 border border-primary/10 space-y-3 sm:space-y-4">
        <SectionHeader title="Wann soll es losgehen?" />

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Wie dringend?</Label>
          <ToggleButton
            options={[
              { value: "Dringend (Express)", label: "Dringend (Express)" },
              { value: "Normal", label: "Normal" },
              { value: "Flexibel", label: "Flexibel" },
            ]}
            value={movingFields.urgency}
            onChange={(v) => setMovingFields({ ...movingFields, urgency: v })}
            columns={3}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Gewünschtes Umzugsdatum</Label>
          <Input
            type="date"
            value={movingFields.moveDate}
            onChange={(e) => setMovingFields({ ...movingFields, moveDate: e.target.value })}
            className="input-focus"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Bevorzugte Tageszeit</Label>
          <ToggleButton
            options={[
              { value: "Vormittags", label: "Vormittags" },
              { value: "Nachmittags", label: "Nachmittags" },
              { value: "Ganztägig", label: "Ganztägig" },
            ]}
            value={movingFields.dayTime}
            onChange={(v) => setMovingFields({ ...movingFields, dayTime: v })}
            columns={3}
          />
        </div>
      </div>

      {/* Aktuelle Wohnung */}
      <div className="bg-primary/5 rounded-xl p-3 sm:p-4 border border-primary/10 space-y-3 sm:space-y-4">
        <SectionHeader title="Aktuelle Wohnung (Auszug)" />

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Aktuelle Adresse *</Label>
          <Input
            placeholder="Straße, Hausnummer, PLZ, Ort"
            value={movingFields.currentAddress}
            onChange={(e) => setMovingFields({ ...movingFields, currentAddress: e.target.value })}
            className="input-focus"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-2">
            <Label className="text-sm leading-relaxed">Wohnfläche ca.</Label>
            <Select
              value={movingFields.currentSize}
              onValueChange={(v) => setMovingFields({ ...movingFields, currentSize: v })}
            >
              <SelectTrigger className="input-focus">
                <SelectValue placeholder="Auswählen..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bis 30 m²">Bis 30 m²</SelectItem>
                <SelectItem value="30-50 m²">30-50 m²</SelectItem>
                <SelectItem value="50-80 m²">50-80 m²</SelectItem>
                <SelectItem value="80-100 m²">80-100 m²</SelectItem>
                <SelectItem value="100-150 m²">100-150 m²</SelectItem>
                <SelectItem value="Über 150 m²">Über 150 m²</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm leading-relaxed">Anzahl Zimmer</Label>
            <Select
              value={movingFields.currentRooms}
              onValueChange={(v) => setMovingFields({ ...movingFields, currentRooms: v })}
            >
              <SelectTrigger className="input-focus">
                <SelectValue placeholder="Auswählen..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1 Zimmer">1 Zimmer</SelectItem>
                <SelectItem value="2 Zimmer">2 Zimmer</SelectItem>
                <SelectItem value="3 Zimmer">3 Zimmer</SelectItem>
                <SelectItem value="4 Zimmer">4 Zimmer</SelectItem>
                <SelectItem value="5+ Zimmer">5+ Zimmer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-2">
            <Label className="text-sm leading-relaxed">Etage</Label>
            <Select
              value={movingFields.currentFloor}
              onValueChange={(v) => setMovingFields({ ...movingFields, currentFloor: v })}
            >
              <SelectTrigger className="input-focus">
                <SelectValue placeholder="Auswählen..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Erdgeschoss">Erdgeschoss</SelectItem>
                <SelectItem value="1. Etage">1. Etage</SelectItem>
                <SelectItem value="2. Etage">2. Etage</SelectItem>
                <SelectItem value="3. Etage">3. Etage</SelectItem>
                <SelectItem value="4. Etage oder höher">4. Etage oder höher</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm leading-relaxed">Aufzug vorhanden?</Label>
            <ToggleButton
              options={[
                { value: "Ja", label: "Ja" },
                { value: "Nein", label: "Nein" },
              ]}
              value={movingFields.hasElevator}
              onChange={(v) => setMovingFields({ ...movingFields, hasElevator: v })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Parkmöglichkeit</Label>
          <Select
            value={movingFields.currentParking}
            onValueChange={(v) => setMovingFields({ ...movingFields, currentParking: v })}
          >
            <SelectTrigger className="input-focus">
              <SelectValue placeholder="Auswählen..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Direkt vor der Tür">Direkt vor der Tür</SelectItem>
              <SelectItem value="In der Nähe (< 50m)">In der Nähe (&lt; 50m)</SelectItem>
              <SelectItem value="Weiter entfernt">Weiter entfernt</SelectItem>
              <SelectItem value="Halteverbot nötig">Halteverbot nötig</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Neue Wohnung */}
      <div className="bg-primary/5 rounded-xl p-3 sm:p-4 border border-primary/10 space-y-3 sm:space-y-4">
        <SectionHeader title="Neue Wohnung (Einzug)" />

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Neue Adresse *</Label>
          <Input
            placeholder="Straße, Hausnummer, PLZ, Ort"
            value={movingFields.newAddress}
            onChange={(e) => setMovingFields({ ...movingFields, newAddress: e.target.value })}
            className="input-focus"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-2">
            <Label className="text-sm leading-relaxed">Etage</Label>
            <Select
              value={movingFields.newFloor}
              onValueChange={(v) => setMovingFields({ ...movingFields, newFloor: v })}
            >
              <SelectTrigger className="input-focus">
                <SelectValue placeholder="Auswählen..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Erdgeschoss">Erdgeschoss</SelectItem>
                <SelectItem value="1. Etage">1. Etage</SelectItem>
                <SelectItem value="2. Etage">2. Etage</SelectItem>
                <SelectItem value="3. Etage">3. Etage</SelectItem>
                <SelectItem value="4. Etage oder höher">4. Etage oder höher</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm leading-relaxed">Aufzug vorhanden?</Label>
            <ToggleButton
              options={[
                { value: "Ja", label: "Ja" },
                { value: "Nein", label: "Nein" },
              ]}
              value={movingFields.newHasElevator}
              onChange={(v) => setMovingFields({ ...movingFields, newHasElevator: v })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Parkmöglichkeit</Label>
          <Select
            value={movingFields.newParking}
            onValueChange={(v) => setMovingFields({ ...movingFields, newParking: v })}
          >
            <SelectTrigger className="input-focus">
              <SelectValue placeholder="Auswählen..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Direkt vor der Tür">Direkt vor der Tür</SelectItem>
              <SelectItem value="In der Nähe (< 50m)">In der Nähe (&lt; 50m)</SelectItem>
              <SelectItem value="Weiter entfernt">Weiter entfernt</SelectItem>
              <SelectItem value="Halteverbot nötig">Halteverbot nötig</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Zusätzliche Services */}
      <div className="bg-orange-50 dark:bg-orange-950/20 rounded-xl p-3 sm:p-4 border border-orange-200 dark:border-orange-900/30 space-y-3 sm:space-y-4">
        <SectionHeader title="Zusätzliche Services" color="orange" />

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Schwere/sperrige Gegenstände?</Label>
          <ToggleButton
            options={[
              { value: "Ja", label: "Ja" },
              { value: "Nein", label: "Nein" },
            ]}
            value={movingFields.hasHeavyItems}
            onChange={(v) => setMovingFields({ ...movingFields, hasHeavyItems: v, heavyItemsDescription: "" })}
          />
        </div>

        {movingFields.hasHeavyItems === "Ja" && (
          <div className="ml-2 sm:ml-4 pl-3 sm:pl-4 border-l-2 border-orange-300 space-y-2">
            <Label className="text-sm leading-relaxed">Welche Gegenstände?</Label>
            <Input
              placeholder="z.B. Klavier, Tresor, große Möbel..."
              value={movingFields.heavyItemsDescription}
              onChange={(e) => setMovingFields({ ...movingFields, heavyItemsDescription: e.target.value })}
              className="input-focus"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Verpackungsservice benötigt?</Label>
          <ToggleButton
            options={[
              { value: "Ja", label: "Ja" },
              { value: "Nein", label: "Nein" },
            ]}
            value={movingFields.needPacking}
            onChange={(v) => setMovingFields({ ...movingFields, needPacking: v })}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Zwischenlagerung benötigt?</Label>
          <ToggleButton
            options={[
              { value: "Ja", label: "Ja" },
              { value: "Nein", label: "Nein" },
            ]}
            value={movingFields.needStorage}
            onChange={(v) => setMovingFields({ ...movingFields, needStorage: v })}
          />
        </div>
      </div>
    </div>
  );

  // Render Entrümpelung specific fields
  const renderClearanceFields = () => (
    <div className="space-y-6">
      {/* Wann soll es losgehen? */}
      <div className="bg-primary/5 rounded-xl p-3 sm:p-4 border border-primary/10 space-y-3 sm:space-y-4">
        <SectionHeader title="Wann soll es losgehen?" />

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Wie dringend?</Label>
          <ToggleButton
            options={[
              { value: "Dringend (Express)", label: "Dringend (Express)" },
              { value: "Normal", label: "Normal" },
              { value: "Flexibel", label: "Flexibel" },
            ]}
            value={clearanceFields.urgency}
            onChange={(v) => setClearanceFields({ ...clearanceFields, urgency: v })}
            columns={3}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Gewünschter Zeitraum</Label>
          <Select
            value={clearanceFields.timeframe}
            onValueChange={(v) => setClearanceFields({ ...clearanceFields, timeframe: v })}
          >
            <SelectTrigger className="input-focus">
              <SelectValue placeholder="Auswählen..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Diese Woche">Diese Woche</SelectItem>
              <SelectItem value="Nächste Woche">Nächste Woche</SelectItem>
              <SelectItem value="In 2-3 Wochen">In 2-3 Wochen</SelectItem>
              <SelectItem value="In 1 Monat">In 1 Monat</SelectItem>
              <SelectItem value="Flexibel">Flexibel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Bevorzugte Tageszeit</Label>
          <ToggleButton
            options={[
              { value: "Vormittags", label: "Vormittags" },
              { value: "Nachmittags", label: "Nachmittags" },
              { value: "Flexibel", label: "Flexibel" },
            ]}
            value={clearanceFields.dayTime}
            onChange={(v) => setClearanceFields({ ...clearanceFields, dayTime: v })}
            columns={3}
          />
        </div>
      </div>

      {/* Standort */}
      <div className="bg-primary/5 rounded-xl p-3 sm:p-4 border border-primary/10 space-y-3 sm:space-y-4">
        <SectionHeader title="Standort" />

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Adresse *</Label>
          <Input
            placeholder="Straße, Hausnummer, PLZ, Ort"
            value={clearanceFields.address}
            onChange={(e) => setClearanceFields({ ...clearanceFields, address: e.target.value })}
            className="input-focus"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-2">
            <Label className="text-sm leading-relaxed">Etage</Label>
            <Select
              value={clearanceFields.floor}
              onValueChange={(v) => setClearanceFields({ ...clearanceFields, floor: v })}
            >
              <SelectTrigger className="input-focus">
                <SelectValue placeholder="Auswählen..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Keller">Keller</SelectItem>
                <SelectItem value="Erdgeschoss">Erdgeschoss</SelectItem>
                <SelectItem value="1. Etage">1. Etage</SelectItem>
                <SelectItem value="2. Etage">2. Etage</SelectItem>
                <SelectItem value="3. Etage oder höher">3. Etage oder höher</SelectItem>
                <SelectItem value="Dachboden">Dachboden</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm leading-relaxed">Aufzug vorhanden?</Label>
            <ToggleButton
              options={[
                { value: "Ja", label: "Ja" },
                { value: "Nein", label: "Nein" },
              ]}
              value={clearanceFields.hasElevator}
              onChange={(v) => setClearanceFields({ ...clearanceFields, hasElevator: v })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Parkmöglichkeit</Label>
          <Select
            value={clearanceFields.parking}
            onValueChange={(v) => setClearanceFields({ ...clearanceFields, parking: v })}
          >
            <SelectTrigger className="input-focus">
              <SelectValue placeholder="Auswählen..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Direkt vor der Tür">Direkt vor der Tür</SelectItem>
              <SelectItem value="In der Nähe (< 50m)">In der Nähe (&lt; 50m)</SelectItem>
              <SelectItem value="Weiter entfernt">Weiter entfernt</SelectItem>
              <SelectItem value="Schwierige Parksituation">Schwierige Parksituation</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bereich */}
      <div className="bg-primary/5 rounded-xl p-3 sm:p-4 border border-primary/10 space-y-3 sm:space-y-4">
        <SectionHeader title="Zu entrümpelnder Bereich" />

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Art des Bereichs *</Label>
          <Select
            value={clearanceFields.areaType}
            onValueChange={(v) => setClearanceFields({ ...clearanceFields, areaType: v })}
          >
            <SelectTrigger className="input-focus">
              <SelectValue placeholder="Auswählen..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Wohnung komplett">Wohnung komplett</SelectItem>
              <SelectItem value="Einzelne Zimmer">Einzelne Zimmer</SelectItem>
              <SelectItem value="Keller">Keller</SelectItem>
              <SelectItem value="Dachboden">Dachboden</SelectItem>
              <SelectItem value="Garage">Garage</SelectItem>
              <SelectItem value="Haus komplett">Haus komplett</SelectItem>
              <SelectItem value="Büro/Gewerbe">Büro/Gewerbe</SelectItem>
              <SelectItem value="Andere">Andere</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-2">
            <Label className="text-sm leading-relaxed">Fläche ca.</Label>
            <Select
              value={clearanceFields.areaSize}
              onValueChange={(v) => setClearanceFields({ ...clearanceFields, areaSize: v })}
            >
              <SelectTrigger className="input-focus">
                <SelectValue placeholder="Auswählen..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bis 20 m²">Bis 20 m²</SelectItem>
                <SelectItem value="20-50 m²">20-50 m²</SelectItem>
                <SelectItem value="50-80 m²">50-80 m²</SelectItem>
                <SelectItem value="80-100 m²">80-100 m²</SelectItem>
                <SelectItem value="Über 100 m²">Über 100 m²</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm leading-relaxed">Anzahl Räume</Label>
            <Select
              value={clearanceFields.roomCount}
              onValueChange={(v) => setClearanceFields({ ...clearanceFields, roomCount: v })}
            >
              <SelectTrigger className="input-focus">
                <SelectValue placeholder="Auswählen..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4-5">4-5</SelectItem>
                <SelectItem value="Mehr als 5">Mehr als 5</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Gegenstände */}
      <div className="bg-orange-50 dark:bg-orange-950/20 rounded-xl p-3 sm:p-4 border border-orange-200 dark:border-orange-900/30 space-y-3 sm:space-y-4">
        <SectionHeader title="Gegenstände" color="orange" />

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Art der Gegenstände</Label>
          <Select
            value={clearanceFields.itemTypes}
            onValueChange={(v) => setClearanceFields({ ...clearanceFields, itemTypes: v })}
          >
            <SelectTrigger className="input-focus">
              <SelectValue placeholder="Auswählen..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Hauptsächlich Möbel">Hauptsächlich Möbel</SelectItem>
              <SelectItem value="Hauptsächlich Kleinkram">Hauptsächlich Kleinkram</SelectItem>
              <SelectItem value="Gemischt">Gemischt</SelectItem>
              <SelectItem value="Elektrogeräte">Elektrogeräte</SelectItem>
              <SelectItem value="Alles muss raus">Alles muss raus</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Schwere/sperrige Gegenstände?</Label>
          <ToggleButton
            options={[
              { value: "Ja", label: "Ja" },
              { value: "Nein", label: "Nein" },
              { value: "Weiß nicht", label: "Weiß nicht" },
            ]}
            value={clearanceFields.hasHeavyItems}
            onChange={(v) => setClearanceFields({ ...clearanceFields, hasHeavyItems: v })}
            columns={3}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Entsorgung benötigt?</Label>
          <ToggleButton
            options={[
              { value: "Ja, alles entsorgen", label: "Ja, alles entsorgen" },
              { value: "Teilweise", label: "Teilweise" },
              { value: "Nein, nur Transport", label: "Nein, nur Transport" },
            ]}
            value={clearanceFields.needsDisposal}
            onChange={(v) => setClearanceFields({ ...clearanceFields, needsDisposal: v })}
            columns={1}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Besondere Gegenstände (z.B. Gefahrstoffe, Sondermüll)</Label>
          <Input
            placeholder="z.B. Farben, Öle, Elektroschrott..."
            value={clearanceFields.specialItems}
            onChange={(e) => setClearanceFields({ ...clearanceFields, specialItems: e.target.value })}
            className="input-focus"
          />
        </div>
      </div>
    </div>
  );

  // Render Küchenmontage specific fields
  const renderKitchenFields = () => (
    <div className="space-y-6">
      {/* Wann soll es losgehen? */}
      <div className="bg-primary/5 rounded-xl p-3 sm:p-4 border border-primary/10 space-y-3 sm:space-y-4">
        <SectionHeader title="Wann soll es losgehen?" />

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Wie dringend?</Label>
          <ToggleButton
            options={[
              { value: "Dringend (Express)", label: "Dringend (Express)" },
              { value: "Normal", label: "Normal" },
              { value: "Flexibel", label: "Flexibel" },
            ]}
            value={kitchenFields.urgency}
            onChange={(v) => setKitchenFields({ ...kitchenFields, urgency: v })}
            columns={3}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Gewünschter Zeitraum</Label>
          <Select
            value={kitchenFields.timeframe}
            onValueChange={(v) => setKitchenFields({ ...kitchenFields, timeframe: v })}
          >
            <SelectTrigger className="input-focus">
              <SelectValue placeholder="Auswählen..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Diese Woche">Diese Woche</SelectItem>
              <SelectItem value="Nächste Woche">Nächste Woche</SelectItem>
              <SelectItem value="In 2-3 Wochen">In 2-3 Wochen</SelectItem>
              <SelectItem value="In 1 Monat">In 1 Monat</SelectItem>
              <SelectItem value="Flexibel">Flexibel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Bevorzugte Tageszeit</Label>
          <ToggleButton
            options={[
              { value: "Vormittags", label: "Vormittags" },
              { value: "Nachmittags", label: "Nachmittags" },
              { value: "Flexibel", label: "Flexibel" },
            ]}
            value={kitchenFields.dayTime}
            onChange={(v) => setKitchenFields({ ...kitchenFields, dayTime: v })}
            columns={3}
          />
        </div>
      </div>

      {/* Küchen-Grunddaten */}
      <div className="bg-primary/5 rounded-xl p-3 sm:p-4 border border-primary/10 space-y-3 sm:space-y-4">
        <SectionHeader title="Küchen-Grunddaten" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-2">
            <Label className="text-sm leading-relaxed">Marke *</Label>
            <Select
              value={kitchenFields.brand}
              onValueChange={(v) => setKitchenFields({ ...kitchenFields, brand: v })}
            >
              <SelectTrigger className="input-focus">
                <SelectValue placeholder="Auswählen..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IKEA">IKEA</SelectItem>
                <SelectItem value="Nobilia">Nobilia</SelectItem>
                <SelectItem value="Nolte">Nolte</SelectItem>
                <SelectItem value="Häcker">Häcker</SelectItem>
                <SelectItem value="Schüller">Schüller</SelectItem>
                <SelectItem value="POCO">POCO</SelectItem>
                <SelectItem value="Roller">Roller</SelectItem>
                <SelectItem value="Andere">Andere</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm leading-relaxed">Form *</Label>
            <Select
              value={kitchenFields.form}
              onValueChange={(v) => setKitchenFields({ ...kitchenFields, form: v })}
            >
              <SelectTrigger className="input-focus">
                <SelectValue placeholder="Auswählen..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Küchenzeile">Küchenzeile</SelectItem>
                <SelectItem value="L-Form">L-Form</SelectItem>
                <SelectItem value="U-Form">U-Form</SelectItem>
                <SelectItem value="Inselküche">Inselküche</SelectItem>
                <SelectItem value="Andere">Andere</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Anzahl Schränke (ca.)</Label>
          <Select
            value={kitchenFields.cabinetCount}
            onValueChange={(v) => setKitchenFields({ ...kitchenFields, cabinetCount: v })}
          >
            <SelectTrigger className="input-focus">
              <SelectValue placeholder="Auswählen..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-5">1-5</SelectItem>
              <SelectItem value="6-10">6-10</SelectItem>
              <SelectItem value="11-15">11-15</SelectItem>
              <SelectItem value="16-20">16-20</SelectItem>
              <SelectItem value="Mehr als 20">Mehr als 20</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Küchenstatus & Standort */}
      <div className="bg-primary/5 rounded-xl p-3 sm:p-4 border border-primary/10 space-y-3 sm:space-y-4">
        <SectionHeader title="Küchenstatus & Standort" />

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Ist die neue Küche bereits bei Ihnen vor Ort?</Label>
          <ToggleButton
            options={[
              { value: "Ja", label: "Ja" },
              { value: "Nein", label: "Nein" },
            ]}
            value={kitchenFields.kitchenOnSite}
            onChange={(v) => setKitchenFields({ ...kitchenFields, kitchenOnSite: v, needPickup: "", pickupAddress: "" })}
          />
        </div>

        {kitchenFields.kitchenOnSite === "Nein" && (
          <div className="ml-2 sm:ml-4 pl-3 sm:pl-4 border-l-2 border-primary/30 space-y-3 sm:space-y-4">
            <div className="space-y-2">
              <Label className="text-sm leading-relaxed">Sollen wir die Küche abholen/liefern?</Label>
              <ToggleButton
                options={[
                  { value: "Ja", label: "Ja" },
                  { value: "Nein", label: "Nein" },
                ]}
                value={kitchenFields.needPickup}
                onChange={(v) => setKitchenFields({ ...kitchenFields, needPickup: v })}
              />
            </div>

            {kitchenFields.needPickup === "Ja" && (
              <div className="space-y-2">
                <Label className="text-sm leading-relaxed">Abholadresse eingeben *</Label>
                <Input
                  placeholder="z.B. IKEA Nürnberg, Musterstraße 123..."
                  value={kitchenFields.pickupAddress}
                  onChange={(e) => setKitchenFields({ ...kitchenFields, pickupAddress: e.target.value })}
                  className="input-focus"
                />
              </div>
            )}
          </div>
        )}

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">In welchem Zustand ist die neue Küche?</Label>
          <ToggleButton
            options={[
              { value: "Zerlegt (in Paketen)", label: "Zerlegt (in Paketen)" },
              { value: "Fertig montiert / Einzelteile", label: "Fertig montiert / Einzelteile" },
            ]}
            value={kitchenFields.kitchenCondition}
            onChange={(v) => setKitchenFields({ ...kitchenFields, kitchenCondition: v })}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Arbeitsplatten-Typ</Label>
          <ToggleButton
            options={[
              { value: "Normal (Holz/Laminat)", label: "Normal (Holz/Laminat)" },
              { value: "Stein (Granit/Quarz/Keramik)", label: "Stein (Granit/Quarz/Keramik)" },
            ]}
            value={kitchenFields.countertopType}
            onChange={(v) => setKitchenFields({ ...kitchenFields, countertopType: v })}
          />
        </div>
      </div>

      {/* Alte Küche */}
      <div className="bg-orange-50 dark:bg-orange-950/20 rounded-xl p-3 sm:p-4 border border-orange-200 dark:border-orange-900/30 space-y-3 sm:space-y-4">
        <SectionHeader title="Alte Küche" color="orange" />

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Gibt es eine alte Küche, die entfernt werden muss?</Label>
          <ToggleButton
            options={[
              { value: "Ja", label: "Ja" },
              { value: "Nein", label: "Nein" },
            ]}
            value={kitchenFields.hasOldKitchen}
            onChange={(v) => setKitchenFields({ ...kitchenFields, hasOldKitchen: v, oldKitchenAction: "" })}
          />
        </div>

        {kitchenFields.hasOldKitchen === "Ja" && (
          <div className="ml-2 sm:ml-4 pl-3 sm:pl-4 border-l-2 border-orange-300 space-y-2">
            <Label className="text-sm leading-relaxed">Was soll mit der alten Küche passieren?</Label>
            <ToggleButton
              options={[
                { value: "Entsorgen (wir nehmen sie mit)", label: "Entsorgen (wir nehmen sie mit)" },
                { value: "Demontieren & Behalten", label: "Demontieren & Behalten" },
              ]}
              value={kitchenFields.oldKitchenAction}
              onChange={(v) => setKitchenFields({ ...kitchenFields, oldKitchenAction: v })}
            />
          </div>
        )}
      </div>

      {/* Besondere Ausstattung */}
      <div className="bg-primary/5 rounded-xl p-3 sm:p-4 border border-primary/10 space-y-3 sm:space-y-4">
        <SectionHeader title="Besondere Ausstattung" />

        <div className="space-y-2">
          <Label className="text-sm leading-relaxed">Wassersystem vorhanden? (z.B. Quooker, GROHE Blue)</Label>
          <ToggleButton
            options={[
              { value: "Ja", label: "Ja" },
              { value: "Nein", label: "Nein" },
              { value: "Weiß nicht", label: "Weiß nicht" },
            ]}
            value={kitchenFields.hasWaterSystem}
            onChange={(v) => setKitchenFields({ ...kitchenFields, hasWaterSystem: v })}
            columns={3}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="space-y-2">
            <Label className="text-sm leading-relaxed">Wasseranschluss?</Label>
            <ToggleButton
              options={[
                { value: "Ja", label: "Ja" },
                { value: "Nein", label: "Nein" },
              ]}
              value={kitchenFields.waterConnection}
              onChange={(v) => setKitchenFields({ ...kitchenFields, waterConnection: v })}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm leading-relaxed">Elektroanschluss?</Label>
            <ToggleButton
              options={[
                { value: "Ja", label: "Ja" },
                { value: "Nein", label: "Nein" },
              ]}
              value={kitchenFields.electricConnection}
              onChange={(v) => setKitchenFields({ ...kitchenFields, electricConnection: v })}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm leading-relaxed">Platte zuschneiden?</Label>
            <ToggleButton
              options={[
                { value: "Ja", label: "Ja" },
                { value: "Nein", label: "Nein" },
              ]}
              value={kitchenFields.cutCountertop}
              onChange={(v) => setKitchenFields({ ...kitchenFields, cutCountertop: v })}
            />
          </div>
        </div>
      </div>

      {/* Zugang & Parken */}
      <div className="bg-primary/5 rounded-xl p-3 sm:p-4 border border-primary/10 space-y-3 sm:space-y-4">
        <SectionHeader title="Zugang & Parken (für genaue Preisberechnung)" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-2">
            <Label className="text-sm leading-relaxed">Parkmöglichkeit</Label>
            <Select
              value={kitchenFields.parking}
              onValueChange={(v) => setKitchenFields({ ...kitchenFields, parking: v })}
            >
              <SelectTrigger className="input-focus">
                <SelectValue placeholder="Auswählen..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Direkt vor der Tür">Direkt vor der Tür</SelectItem>
                <SelectItem value="In der Nähe (< 50m)">In der Nähe (&lt; 50m)</SelectItem>
                <SelectItem value="Weiter entfernt (> 50m)">Weiter entfernt (&gt; 50m)</SelectItem>
                <SelectItem value="Schwierige Parksituation">Schwierige Parksituation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm leading-relaxed">Zugang zur Wohnung</Label>
            <Select
              value={kitchenFields.access}
              onValueChange={(v) => setKitchenFields({ ...kitchenFields, access: v })}
            >
              <SelectTrigger className="input-focus">
                <SelectValue placeholder="Auswählen..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Erdgeschoss (Straßenzugang)">Erdgeschoss (Straßenzugang)</SelectItem>
                <SelectItem value="Erdgeschoss (kein Aufzug)">Erdgeschoss (kein Aufzug)</SelectItem>
                <SelectItem value="1. Etage (mit Aufzug)">1. Etage (mit Aufzug)</SelectItem>
                <SelectItem value="1. Etage (ohne Aufzug)">1. Etage (ohne Aufzug)</SelectItem>
                <SelectItem value="2. Etage (mit Aufzug)">2. Etage (mit Aufzug)</SelectItem>
                <SelectItem value="2. Etage (ohne Aufzug)">2. Etage (ohne Aufzug)</SelectItem>
                <SelectItem value="3. Etage (mit Aufzug)">3. Etage (mit Aufzug)</SelectItem>
                <SelectItem value="3. Etage (ohne Aufzug)">3. Etage (ohne Aufzug)</SelectItem>
                <SelectItem value="4. Etage (mit Aufzug)">4. Etage (mit Aufzug)</SelectItem>
                <SelectItem value="4. Etage (ohne Aufzug)">4. Etage (ohne Aufzug)</SelectItem>
                <SelectItem value="5. Etage (mit Aufzug)">5. Etage (mit Aufzug)</SelectItem>
                <SelectItem value="5. Etage (ohne Aufzug)">5. Etage (ohne Aufzug)</SelectItem>
                <SelectItem value="6. Etage oder höher (mit Aufzug)">6. Etage oder höher (mit Aufzug)</SelectItem>
                <SelectItem value="6. Etage oder höher (ohne Aufzug)">6. Etage oder höher (ohne Aufzug)</SelectItem>
                <SelectItem value="Sonstige">Sonstige</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );

  // Listen for service selection from HeroSection cards
  useEffect(() => {
    const handleServiceSelect = (event: CustomEvent<{ service: string }>) => {
      const selectedService = event.detail.service;
      if (selectedService && services.find(s => s.id === selectedService)) {
        setFormData(prev => ({ ...prev, service: selectedService }));
        if (!hasStartedForm) {
          setHasStartedForm(true);
          trackFormStart("quick_contact_form");
        }
      }
    };

    window.addEventListener('selectService', handleServiceSelect as EventListener);
    return () => {
      window.removeEventListener('selectService', handleServiceSelect as EventListener);
    };
  }, [hasStartedForm]);

  return (
    <section id="kontakt-form" className="section-padding bg-muted/30">
      <div className="container-max">
        <div className="max-w-2xl mx-auto">
          <div className="glass-card rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-xl">
            {/* Header */}
            <div className="text-center mb-6 lg:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Kostenloses Angebot anfordern
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">
                In nur 2 Schritten zum verbindlichen Festpreis-Angebot
              </p>
            </div>

            {/* Step Indicator */}
            <div id="form-step-indicator" className="flex items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  {currentStep > 1 ? <Check className="w-4 h-4" /> : '1'}
                </div>
                <span className={`text-sm font-medium ${currentStep >= 1 ? 'text-foreground' : 'text-muted-foreground'}`}>
                  Projekt
                </span>
              </div>
              <div className="w-12 h-0.5 bg-muted" />
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  2
                </div>
                <span className={`text-sm font-medium ${currentStep >= 2 ? 'text-foreground' : 'text-muted-foreground'}`}>
                  Kontakt
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Project Details */}
              {currentStep === 1 && (
                <div className="space-y-5">
                  {/* Service Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="quick-service">Art der Dienstleistung *</Label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => setFormData({ ...formData, service: value })}
                    >
                      <SelectTrigger id="quick-service" className="input-focus">
                        <SelectValue placeholder="Bitte wählen..." />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name}
                          </SelectItem>
                        ))}
                        <SelectItem value="andere">Andere</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Service-specific fields */}
                  {formData.service === "kuechenmontage" && renderKitchenFields()}
                  {formData.service === "moebelmontage" && renderFurnitureFields()}
                  {formData.service === "lieferungen" && renderDeliveryFields()}
                  {formData.service === "umzuege" && renderMovingFields()}
                  {formData.service === "entruempelung" && renderClearanceFields()}

                  {/* Details */}
                  <div className="space-y-2">
                    <Label htmlFor="quick-details">Weitere Details</Label>
                    <Textarea
                      id="quick-details"
                      placeholder="Sonstige Infos, besondere Anforderungen, Fragen..."
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      rows={4}
                      className="input-focus resize-none"
                    />
                  </div>

                  {/* Images Upload */}
                  <div className="space-y-2">
                    <Label>Bilder (optional, max. {MAX_IMAGES})</Label>
                    <p className="text-xs text-muted-foreground">Werden automatisch komprimiert</p>
                    <div className="flex flex-wrap gap-3 mt-2">
                      {images.map((img, index) => (
                        <div key={index} className="relative w-16 h-16 rounded-lg overflow-hidden border border-border bg-muted">
                          <img src={img.preview} alt={`Bild ${index + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white rounded-full flex items-center justify-center"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      {images.length < MAX_IMAGES && (
                        <button
                          type="button"
                          onClick={() => imageInputRef.current?.click()}
                          className="w-16 h-16 rounded-lg border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center gap-1 hover:border-primary/50 transition-colors"
                        >
                          <FileImage className="w-5 h-5 text-muted-foreground" />
                          <span className="text-[10px] text-muted-foreground">Bild</span>
                        </button>
                      )}
                    </div>
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>

                  {/* Plans Upload */}
                  <div className="space-y-2">
                    <Label>Pläne (optional, max. {MAX_PLANS})</Label>
                    <p className="text-xs text-muted-foreground">Küchenplanung, Grundrisse (PDF, Bilder)</p>
                    <div className="flex flex-wrap gap-3 mt-2">
                      {plans.map((plan, index) => (
                        <div key={index} className="relative flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-muted">
                          <FileIcon type={plan.type} />
                          <span className="text-xs truncate max-w-[100px]">{plan.file.name}</span>
                          <button
                            type="button"
                            onClick={() => removePlan(index)}
                            className="w-4 h-4 bg-destructive text-white rounded-full flex items-center justify-center"
                          >
                            <X className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      ))}
                      {plans.length < MAX_PLANS && (
                        <button
                          type="button"
                          onClick={() => planInputRef.current?.click()}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 transition-colors"
                        >
                          <Upload className="w-4 h-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Datei</span>
                        </button>
                      )}
                    </div>
                    <input
                      ref={planInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx,image/*"
                      multiple
                      onChange={handlePlanUpload}
                      className="hidden"
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <p className="text-sm text-destructive">{error}</p>
                  )}

                  {/* Next Button */}
                  <Button
                    type="button"
                    onClick={goToStep2}
                    className="w-full btn-primary py-3 rounded-xl"
                  >
                    Weiter zu Kontaktdaten
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}

              {/* Step 2: Contact Details */}
              {currentStep === 2 && (
                <div className="space-y-5">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="quick-name">Ihr Name *</Label>
                    <Input
                      id="quick-name"
                      type="text"
                      placeholder="Max Mustermann"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="input-focus"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="quick-phone">Telefonnummer *</Label>
                    <Input
                      id="quick-phone"
                      type="tel"
                      placeholder="+49 123 456789"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="input-focus"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="quick-email">E-Mail (optional)</Label>
                    <Input
                      id="quick-email"
                      type="email"
                      placeholder="ihre@email.de"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-focus"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Progress Bar */}
                  {isSubmitting && <ProgressBar state={progressState} />}

                  {/* Error - prominent, always shows the exact reason + fallback contact */}
                  {error && (
                    <div
                      id="quick-submit-error"
                      role="alert"
                      aria-live="assertive"
                      className="rounded-xl border-2 border-destructive/40 bg-destructive/5 p-4 space-y-3 animate-in fade-in slide-in-from-bottom-2"
                    >
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <p className="font-semibold text-destructive text-sm">
                            Anfrage konnte nicht gesendet werden
                          </p>
                          <p className="text-sm text-destructive/90 break-words">{error}</p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 pt-1">
                        <a
                          href={`tel:${businessInfo.phone}`}
                          className="inline-flex items-center justify-center gap-2 flex-1 rounded-lg border-2 border-destructive/40 px-4 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          Anrufen: {businessInfo.phone}
                        </a>
                        <a
                          href={`https://wa.me/${businessInfo.whatsapp.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 flex-1 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#20bd5a] transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={goToStep1}
                      className="flex-1 py-3 rounded-xl"
                      disabled={isSubmitting}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Zurück
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 btn-primary py-3 rounded-xl"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Wird verarbeitet...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Anfrage senden
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
