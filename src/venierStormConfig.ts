import { zColor } from "@remotion/zod-types";
import { z } from "zod";

export const VenierStormAdSchema = z.object({
  varianteId: z.string(),
  hook: z.object({
    etiquetaAlerta: z.string(),
    linea1: z.string(),
    linea2: z.string(),
    impactoGotera: z.string(),
    bajadaImpacto: z.string(),
  }),
  producto: z.object({
    marcaProducto: z.string(),
    nombreProducto: z.string(),
    presentacion: z.string(),
    badges: z.array(z.string()).min(1).max(4),
    fraseClima: z.string(),
  }),
  beneficios: z
    .array(
      z.object({
        titulo: z.string(),
        detalle: z.string(),
      })
    )
    .min(1)
    .max(3),
  precio: z.object({
    mostrar: z.boolean(),
    etiqueta: z.string(),
    valor: z.string(),
    aclaracion: z.string(),
  }),
  cta: z.object({
    titular: z.string(),
    boton: z.string(),
    whatsapp: z.string(),
    direccion: z.string(),
    horario: z.string(),
    instagram: z.string(),
  }),
  efectos: z.object({
    intensidadLluvia: z.number().min(0).max(1),
    relampagosActivos: z.boolean(),
    musicaActiva: z.boolean(),
    volumenMusica: z.number().min(0).max(1),
  }),
  marca: z.object({
    naranja: zColor(),
    negro: zColor(),
    azulMarino: zColor(),
    fondoClaro: zColor(),
    coralOferta: zColor(),
  }),
  mostrarZonaSegura: z.boolean(),
});

export type VenierStormAdProps = z.infer<typeof VenierStormAdSchema>;
