"use client";

import { useState, useEffect } from "react";

// ============================================
// TIPOS
// ============================================

export type DeviceType = "mobile" | "tablet" | "desktop";

export type DeviceDetectionResult = {
  /** Ancho < 768px */
  isMobile: boolean;
  /** 768px <= Ancho < 1024px */
  isTablet: boolean;
  /** Ancho >= 1024px */
  isDesktop: boolean;
  /** Dispositivo con soporte táctil */
  isTouchDevice: boolean;
  /** Tipo de dispositivo actual */
  deviceType: DeviceType;
  /** Ancho actual de la ventana */
  windowWidth: number;
  /** Alto actual de la ventana */
  windowHeight: number;
  /** Orientación del dispositivo */
  orientation: "portrait" | "landscape";
  /** Si el hook ya se hidrató (para evitar mismatch SSR) */
  isHydrated: boolean;
};

// ============================================
// BREAKPOINTS (consistentes con Tailwind)
// ============================================

const BREAKPOINTS = {
  mobile: 0,
  tablet: 768,   // md
  desktop: 1024, // lg
} as const;

// ============================================
// HELPERS
// ============================================

/**
 * Detecta si el dispositivo tiene soporte táctil
 */
function detectTouchDevice(): boolean {
  if (typeof window === "undefined") return false;

  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-expect-error - msMaxTouchPoints es legacy pero útil
    navigator.msMaxTouchPoints > 0
  );
}

/**
 * Determina el tipo de dispositivo según el ancho
 */
function getDeviceType(width: number): DeviceType {
  if (width < BREAKPOINTS.tablet) return "mobile";
  if (width < BREAKPOINTS.desktop) return "tablet";
  return "desktop";
}

/**
 * Determina la orientación
 */
function getOrientation(width: number, height: number): "portrait" | "landscape" {
  return height > width ? "portrait" : "landscape";
}

// ============================================
// HOOK PRINCIPAL
// ============================================

/**
 * Hook para detectar tipo de dispositivo y características
 *
 * @returns Objeto con flags de dispositivo y dimensiones
 *
 * @example
 * const { isMobile, isDesktop, isTouchDevice } = useDeviceDetection();
 *
 * // Condicional de renderizado
 * {isMobile ? <MobileMenu /> : <DesktopMenu />}
 *
 * // Ajustar animaciones
 * const animationDuration = isMobile ? 0.2 : 0.5;
 *
 * @example
 * // Evitar mismatch de hidratación SSR
 * const { isMobile, isHydrated } = useDeviceDetection();
 *
 * if (!isHydrated) return <LoadingSkeleton />;
 * return isMobile ? <Mobile /> : <Desktop />;
 */
export function useDeviceDetection(): DeviceDetectionResult {
  // Estado inicial seguro para SSR (asume desktop)
  const [state, setState] = useState<DeviceDetectionResult>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTouchDevice: false,
    deviceType: "desktop",
    windowWidth: 1024,
    windowHeight: 768,
    orientation: "landscape",
    isHydrated: false,
  });

  useEffect(() => {
    // Función para actualizar el estado
    function updateDeviceInfo() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const deviceType = getDeviceType(width);

      setState({
        isMobile: deviceType === "mobile",
        isTablet: deviceType === "tablet",
        isDesktop: deviceType === "desktop",
        isTouchDevice: detectTouchDevice(),
        deviceType,
        windowWidth: width,
        windowHeight: height,
        orientation: getOrientation(width, height),
        isHydrated: true,
      });
    }

    // Actualizar inmediatamente
    updateDeviceInfo();

    // Listener para resize con debounce
    let timeoutId: NodeJS.Timeout;
    function handleResize() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDeviceInfo, 100);
    }

    window.addEventListener("resize", handleResize);

    // Listener para cambio de orientación (mobile)
    window.addEventListener("orientationchange", updateDeviceInfo);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", updateDeviceInfo);
      clearTimeout(timeoutId);
    };
  }, []);

  return state;
}

// ============================================
// HOOKS ESPECÍFICOS (más livianos)
// ============================================

/**
 * Hook simplificado que solo detecta mobile
 * Más performante si solo necesitás saber si es mobile
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < BREAKPOINTS.tablet);

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

/**
 * Hook que solo detecta touch
 */
export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(detectTouchDevice());
  }, []);

  return isTouch;
}

// ============================================
// EXPORT DEFAULT
// ============================================

export default useDeviceDetection;
