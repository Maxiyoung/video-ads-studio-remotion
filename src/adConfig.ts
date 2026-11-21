import { zColor } from "@remotion/zod-types";
import { z } from "zod";

export const PintaPlopAdSchema = z.object({
  varianteId: z.string(),
  hook: z.object({
    etiquetaSuperior: z.string(),
    linea1: z.string(),
    linea2: z.string(),
    palabraDestacada: z.string(),
    subtitulo: z.string(),
  }),
  catalogo: z.object({
    titulo: z.string(),
    categorias: z.array(z.string()).min(1).max(4),
    marcas: z.string(),
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
  medios: z.object({
    clipFondoOpcional: z.string().optional(),
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

export type PintaPlopAdProps = z.infer<typeof PintaPlopAdSchema>;
